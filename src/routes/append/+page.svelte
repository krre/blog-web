<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Form from '$lib/components/Form.svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	// import type { PageProps } from './$types';

	// let { data }: PageProps = $props();
	let post = $state('');
</script>

<Page title={i18n.t('append.title')}>
	<Form width={60} action="?/append" buttonText={i18n.t('editor.sendButton')}>
		<label for="title">{i18n.t('editor.title')}:</label>
		<input type="text" id="title" name="title" />
		<label for="post">{i18n.t('editor.post')}:</label>
		<textarea id="post" name="post" rows="40">{post}</textarea>
	</Form>
</Page>
