<script lang="ts">
	import * as consts from '$lib/consts';
	import Page from '$lib/components/Page.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { formatDateTime } from '$lib/utils';
	import { type Posts } from '$lib/types';

	interface Props {
		title?: string;
		posts: Posts;
		current: number;
		isPublished: boolean;
	}

	let { title, posts, current = $bindable(1), isPublished }: Props = $props();
</script>

<Page {title}>
	<div class="container">
		<div class="rows">
			{#each posts.posts as post}
				<div>
					<div class="date">
						{formatDateTime(post.posted_at)}
					</div>
					<h2>
						<a href="/post/{post.id}{isPublished ? '' : '?draft=1'}">{post.title}</a>
					</h2>
				</div>
			{/each}
		</div>
		<Pagination count={posts.count} limit={consts.Post.PageLimit} bind:current />
	</div>
</Page>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.rows {
		display: grid;
		gap: 0.875rem;
	}

	.date {
		font-size: 0.875rem;
	}

	h2 {
		margin-block-start: 0.25rem;
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
