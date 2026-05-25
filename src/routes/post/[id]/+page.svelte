<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import type { PageProps } from './$types';
	import { i18n } from '$lib/i18n.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data }: PageProps = $props();
</script>

<Page title={data.post.title}>
	<h2>{data.post.title}</h2>
	{data.post.post}
	<div>
		<button onclick={() => goto(`/post/${page.params.id}/edit`)}>{i18n.t('post.editButton')}</button
		>
		<form class="delete-form" method="POST" action="?/delete" use:enhance>
			<button>{i18n.t('post.deleteButton')}</button>
		</form>
	</div>
</Page>

<style>
	.delete-form {
		display: inline;
	}
</style>
