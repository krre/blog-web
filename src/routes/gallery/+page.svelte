<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import type { PageProps } from './$types';

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
	}
</script>

<Page title={i18n.t('nav.gallery')}>
	<div class="toolbar">
		<button onclick={openFileDialog}>{i18n.t('gallery.button.append')}</button>
		<button>{i18n.t('gallery.button.delete')}</button>
		<input
			bind:this={fileInput}
			type="file"
			accept="image/*"
			multiple
			onchange={handleFiles}
			hidden
		/>
	</div>

	{#each data.images as image}{/each}
</Page>

<style>
	.toolbar {
		display: flex;
		gap: 0.75rem;
	}
</style>
