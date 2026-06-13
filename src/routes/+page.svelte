<script lang="ts">
	import { goto } from '$app/navigation';
	import PostList from '$lib/components/PostList.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let current = $state(1);

	$effect(() => {
		goto(current > 1 ? `/?page=${current}` : '/');
	});
</script>

<PostList posts={data.posts} bind:current isPublished={true} />
