<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import type { PageProps } from './$types';
	import { i18n } from '$lib/i18n.svelte';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();
</script>

<Page title={data.post.title}>
	<h2>{data.post.title}</h2>
	{data.post.post}
	<form method="POST" action="?/delete" use:enhance>
		<button>{i18n.t('post.deleteButton')}</button>
	</form>
</Page>
