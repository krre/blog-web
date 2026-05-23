<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	import { formatDateTime } from '$lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Page title={i18n.t('main.title')}>
	{#each data.posts as post}
		<p><a href="/post/{post.id}">{formatDateTime(post.created_at)} {post.title}</a></p>
	{/each}
</Page>
