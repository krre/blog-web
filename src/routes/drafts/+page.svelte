<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import type { PageProps } from './$types';
	import { i18n } from '$lib/i18n.svelte';

	let { data }: PageProps = $props();
</script>

<PostList title={i18n.t('nav.drafts')} posts={data.posts} />
