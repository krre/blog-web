<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import type { PageProps } from './$types';
	import { i18n } from '$lib/i18n.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { formatDateTime } from '$lib/utils';

	let { data }: PageProps = $props();
</script>

<Page title={data.post.title}>
	<Rectangle>
		<h2>{data.post.title}</h2>
		<div class="container">
			<div class="date">
				{formatDateTime(data.post.published_at ?? data.post.created_at)}
			</div>
			<article class="post">
				{data.post.post}
			</article>
			{#if data.admin}
				<div class="button-row">
					{#if data.post.published_at}
						<form method="POST" action="?/hide" use:enhance>
							<button>{i18n.t('post.hideButton')}</button>
						</form>
					{:else}
						<form method="POST" action="?/publish" use:enhance>
							<button>{i18n.t('post.publishButton')}</button>
						</form>
					{/if}

					<button onclick={() => goto(`/post/${page.params.id}/edit`)}
						>{i18n.t('post.editButton')}</button
					>
					<form
						method="POST"
						action="?/delete"
						use:enhance={({ cancel }) => {
							const confirmed = confirm(i18n.t('post.deleteDialog'));
							if (!confirmed) cancel();
						}}
					>
						<button>{i18n.t('post.deleteButton')}</button>
					</form>
				</div>
			{/if}
		</div>
	</Rectangle>
</Page>

<style>
	h2 {
		margin-block-start: 0;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.date {
		opacity: 0.6;
	}

	.post {
		white-space: pre-wrap;
		overflow-wrap: break-word;
		word-wrap: break-word;
	}

	.button-row {
		display: flex;
		gap: 0.5rem;
	}
</style>
