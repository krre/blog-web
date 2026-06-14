<script lang="ts">
	import Form from '$lib/components/Form.svelte';
	import { i18n } from '$lib/i18n.svelte.js';

	interface Props {
		action: string;
		title: string;
		post: string;
	}

	let { action, title, post }: Props = $props();
</script>

<Form {action} buttonText={i18n.t('editor.sendButton')}>
	<label for="title">{i18n.t('editor.title')}:</label>
	<input type="text" id="title" name="title" value={title} required />
	<label for="post">{i18n.t('editor.post')}:</label>
	<textarea id="post" name="post" rows="40" spellcheck="true" value={post}></textarea>
</Form>
