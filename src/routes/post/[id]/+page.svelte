<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import type { PageProps } from './$types';
	import { i18n } from '$lib/i18n.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { formatDateTime } from '$lib/utils';
	import { marked } from 'marked';

	let { data }: PageProps = $props();
</script>

<Page title={data.post.title}>
	<h1>{data.post.title}</h1>
	<div class="container">
		<div class="date">
			{#if data.admin}
				<div class="form-grid">
					<div>{i18n.t('post.date.created')}:</div>
					<div>
						{formatDateTime(data.post.created_at)}
					</div>
					<div>{i18n.t('post.date.updated')}:</div>
					<div>
						{formatDateTime(data.post.updated_at)}
					</div>
					<div>{i18n.t('post.date.published')}:</div>
					<div>
						{data.post.published_at ? formatDateTime(data.post.published_at) : ''}
					</div>
				</div>
			{:else}
				{formatDateTime(data.post.published_at ?? data.post.created_at)}
			{/if}
		</div>
		<article class="post">
			{#if data.post.post}
				{@html marked.parse(data.post.post)}
			{:else}
				<p></p>
			{/if}
		</article>
		{#if data.admin}
			<div class="button-row">
				{#if data.post.published_at}
					<form method="POST" action="?/hide" use:enhance>
						<button>{i18n.t('post.button.hide')}</button>
					</form>
				{:else}
					<form method="POST" action="?/publish" use:enhance>
						<button>{i18n.t('post.button.publish')}</button>
					</form>
				{/if}

				<button
					onclick={() =>
						goto(`/post/${page.params.id}/edit${data.post.published_at ? '' : '?draft=1'}`)}
					>{i18n.t('post.button.edit')}</button
				>
				<form
					method="POST"
					action="?/delete"
					use:enhance={({ cancel }) => {
						const confirmed = confirm(i18n.t('post.deleteDialog'));
						if (!confirmed) cancel();
					}}
				>
					<button>{i18n.t('post.button.delete')}</button>
				</form>
			</div>
		{/if}
	</div>
</Page>

<style>
	h1 {
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
		overflow-wrap: break-word;
		word-wrap: break-word;
	}

	.button-row {
		display: flex;
		gap: 0.5rem;
	}
</style>
