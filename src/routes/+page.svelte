<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import { formatDateTime } from '$lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Page>
	<Rectangle>
		{#each data.posts as post}
			<p><a href="/post/{post.id}">{formatDateTime(post.created_at)} {post.title}</a></p>
		{/each}
	</Rectangle>
</Page>
