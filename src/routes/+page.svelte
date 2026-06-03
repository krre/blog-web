<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PostList posts={data.posts} />
