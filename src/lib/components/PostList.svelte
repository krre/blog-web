<script lang="ts">
	import * as consts from '$lib/consts';
	import Page from '$lib/components/Page.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { formatDateTime } from '$lib/utils';
	import { type Post } from '$lib/types';
	import { goto } from '$app/navigation';

	interface Props {
		title?: string;
		posts: Post[];
	}

	let { title, posts }: Props = $props();
	let current = $state(1);
	let count = $state(11);

	$effect(() => {
		goto(current > 1 ? `/?page=${current}` : '/');
	});
</script>

<Page {title}>
	<div class="rows">
		{#each posts as post}
			<div>
				<div class="date">
					{formatDateTime(post.posted_at)}
				</div>
				<h2>
					<a href="/post/{post.id}">{post.title}</a>
				</h2>
			</div>
		{/each}
	</div>
	<Pagination {count} limit={consts.Main.PageLimit} bind:current />
</Page>

<style>
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
