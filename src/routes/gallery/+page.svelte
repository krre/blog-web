<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import * as consts from '$lib/consts';
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();
	let fileInput: HTMLInputElement;

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
		console.log({ filename });
	}

	function deleteImage(filename: string) {
		console.log({ filename });
	}
</script>

<Page title={i18n.t('nav.gallery')}>
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
</Page>

<style>
	.toolbar {
		display: flex;
		gap: 0.75rem;
		margin-bottom: 1rem;
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
