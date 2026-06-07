<script>
	import Menu from './Menu.svelte';
	import { fade, fly } from 'svelte/transition';

	let { isOpen = $bindable(false) } = $props();
	const width = 250;

	function close() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div
		role="button"
		tabindex="0"
		class="overlay"
		transition:fade={{ duration: 200 }}
		onclick={close}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				close();
			}
		}}
	></div>

	<aside style:width="{width}px" transition:fly={{ x: -width, duration: 300 }}>
		<Menu vertical={true} onclick={() => (isOpen = false)} />
	</aside>
{/if}

<style>
	aside {
		position: fixed;
		left: 0;
		padding-left: 1rem;
		overflow-y: auto;
		height: 100%;
		background-color: white;
		z-index: 1000;
	}

	.overlay {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
		z-index: 999;
	}
</style>
