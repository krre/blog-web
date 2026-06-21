<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import * as consts from '$lib/consts';
	import type { PageProps } from './$types';
	import { goto, invalidateAll } from '$app/navigation';
	import Pagination from '$lib/components/Pagination.svelte';

	let { data }: PageProps = $props();
	let current: number = $state(1);
	let fileInput: HTMLInputElement;

	$effect(() => {
		goto(current > 1 ? `/gallery/?page=${current}` : '/gallery');
	});

	function openFileDialog() {
		fileInput.click();
	}

	async function handleFiles(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files) return;

		const formData = new FormData();

		for (const file of input.files) {
			formData.append('images', file);
		}

		input.value = '';

		await fetch('/api/upload', {
			method: 'POST',
			body: formData
		});

		await goto('/gallery', {
			invalidateAll: true
		});
	}

	function copyLink(filename: string) {
		navigator.clipboard.writeText(`/${consts.Gallery.UploadsDirName}/${filename}`);
	}

	async function deleteImage(filename: string) {
		const confirmed = confirm(i18n.t('post.deleteDialog'));
		if (!confirmed) return;

		const formData = new FormData();
		formData.append('filename', filename);

		await fetch('/api/upload', {
			method: 'DELETE',
			body: formData
		});

		invalidateAll();
	}
</script>

<Page title={i18n.t('nav.gallery')}>
	<div class="container">
		<div class="toolbar">
			<button onclick={openFileDialog}>{i18n.t('gallery.button.append')}</button>
			<input
				bind:this={fileInput}
				type="file"
				accept="image/*"
				multiple
				onchange={handleFiles}
				hidden
			/>
		</div>
		<div class="gallery">
			{#each data.files as file}
				<div>
					<img src="/{consts.Gallery.UploadsDirName}/{file}" alt={file} />
					<div>
						<button onclick={() => copyLink(file)}>{i18n.t('gallery.button.link')}</button>
						<button onclick={() => deleteImage(file)}>{i18n.t('gallery.button.delete')}</button>
					</div>
				</div>
			{/each}
		</div>
		<Pagination count={data.total} limit={consts.Gallery.PageLimit} bind:current />
	</div>
</Page>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.toolbar {
		display: flex;
		gap: 0.75rem;
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.gallery img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}
</style>
