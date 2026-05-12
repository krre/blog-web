<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<Navigation />
{@render children()}
