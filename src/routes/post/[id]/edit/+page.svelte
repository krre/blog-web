<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import PostEditor from '$lib/components/PostEditor.svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';

	let { data, form }: PageProps = $props();

	$effect(() => {
		if (form?.success) {
			goto(`/post/${data.post.id}${data.post.published_at ? '' : '?draft=1'}`);
		}
	});
</script>

<Page title={i18n.t('edit.title')}>
	<PostEditor
		action="?/edit{data.post.published_at ? '' : '&draft=1'}"
		title={data.post.title}
		post={data.post.post}
	/>
</Page>
