<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Form from '$lib/components/Form.svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	$effect(() => {
		if (form?.id) {
			goto(`/post/${form.id}`);
		}
	});
</script>

<Page title={i18n.t('append.title')}>
	<Form width={60} action="?/append" buttonText={i18n.t('editor.sendButton')}>
		<label for="title">{i18n.t('editor.title')}:</label>
		<input type="text" id="title" name="title" required />
		<label for="status">{i18n.t('editor.status.title')}:</label>
		<select class="state-selector" id="status" name="status">
			<option value="published">{i18n.t('editor.status.published')}</option>
			<option value="hided">{i18n.t('editor.status.hided')}</option>
		</select>
		<label for="post">{i18n.t('editor.post')}:</label>
		<textarea id="post" name="post" rows="40"></textarea>
	</Form>
</Page>

<style>
	.state-selector {
		justify-self: start;
	}
</style>
