<script lang="ts">
	import Form from '$lib/components/Form.svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	import * as consts from '$lib/consts';

	interface Props {
		action: string;
		title: string;
		post: string;
		isPublished: boolean;
	}

	let { action, title, post, isPublished }: Props = $props();
</script>

<Form {action} buttonText={i18n.t('editor.sendButton')}>
	<label for="title">{i18n.t('editor.title')}:</label>
	<input type="text" id="title" name="title" value={title} required />
	<label for="status">{i18n.t('post.status.title')}:</label>
	<select
		class="state-selector"
		id="status"
		name="status"
		value={isPublished ? consts.PostState.Published : consts.PostState.Hided}
	>
		<option value={consts.PostState.Published}>{i18n.t('post.status.published')}</option>
		<option value={consts.PostState.Hided}>{i18n.t('post.status.hided')}</option>
	</select>
	<label for="post">{i18n.t('editor.post')}:</label>
	<textarea id="post" name="post" rows="40" value={post}></textarea>
</Form>

<style>
	.state-selector {
		justify-self: start;
	}
</style>
