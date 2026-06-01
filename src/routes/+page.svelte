<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import HidedPostMark from '$lib/components/HidedPostMark.svelte';
	import { formatDateTime } from '$lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Page>
	<Rectangle>
		<div class="rows">
			{#each data.posts as post}
				<div>
					<div class="date">
						{formatDateTime(post.created_at)}
						{#if data.admin && !post.is_published}
							<HidedPostMark />
						{/if}
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
</style>
