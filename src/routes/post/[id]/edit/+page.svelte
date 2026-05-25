<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Form from '$lib/components/Form.svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';

	let { data, form }: PageProps = $props();

	$effect(() => {
		if (form?.success) {
			goto(`/post/${data.post.id}`);
		}
	});
</script>

<Page title={i18n.t('edit.title')}>
	<Form width={60} action="?/edit" buttonText={i18n.t('editor.sendButton')}>
		<label for="title">{i18n.t('editor.title')}:</label>
		<input type="text" id="title" name="title" value={data.post.title} required />
		<label for="status">{i18n.t('editor.status.title')}:</label>
		<select
			class="state-selector"
			id="status"
			name="status"
			value={data.post.is_published ? 'published' : 'hided'}
		>
			<option value="published">{i18n.t('editor.status.published')}</option>
			<option value="hided">{i18n.t('editor.status.hided')}</option>
		</select>
		<label for="post">{i18n.t('editor.post')}:</label>
		<textarea id="post" name="post" rows="40" value={data.post.post}></textarea>
	</Form>
</Page>

<style>
	.state-selector {
		justify-self: start;
	}
</style>
