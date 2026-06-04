<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import { formatDateTime } from '$lib/utils';
	import { type Post } from '$lib/types';

	interface Props {
		title?: string;
		posts: Post[];
	}

	let { title, posts }: Props = $props();
</script>

<Page {title}>
	<Rectangle>
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
	</Rectangle>
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
