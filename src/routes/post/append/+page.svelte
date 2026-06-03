<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import PostEditor from '$lib/components/PostEditor.svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	$effect(() => {
		if (form?.id) {
			goto(`/post/${form.id}`);
		}
	});
</script>

<Page title={i18n.t('append.title')}>
	<Rectangle>
		<PostEditor action="?/append" title="" post="" />
	</Rectangle>
</Page>
