<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
</script>

<span class="hided">[{i18n.t('post.status.hided')}]</span>

<style>
	.hided {
		color: var(--secondary-color-600);
	}
</style>
