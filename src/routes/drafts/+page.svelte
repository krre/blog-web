<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import type { PageProps } from './$types';
	import { i18n } from '$lib/i18n.svelte';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	let current = $state(1);

	$effect(() => {
		goto(current > 1 ? `/drafts/?page=${current}` : '/drafts');
	});
</script>

<PostList title={i18n.t('nav.drafts')} posts={data.posts} bind:current isPublished={false} />
