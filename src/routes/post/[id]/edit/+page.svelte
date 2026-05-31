<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import PostEditor from '$lib/components/PostEditor.svelte';
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
	<Rectangle>
		<PostEditor
			action="?/edit"
			title={data.post.title}
			post={data.post.post}
			isPublished={data.post.is_published}
		/>
	</Rectangle>
</Page>
