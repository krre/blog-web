<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { page } from '$app/state';

	const isAdmin = page.data.admin ? true : false;

	interface MenuItem {
		href: string;
		label: string;
		visible: boolean;
	}

	const menuItems: MenuItem[] = $derived([
		{ href: '/', label: i18n.t('nav.blog'), visible: true },
		{ href: '/append', label: i18n.t('nav.append'), visible: isAdmin },
		{ href: '/profile', label: i18n.t('nav.profile'), visible: isAdmin },
		{ href: '/about', label: i18n.t('nav.about'), visible: true },
		{ href: '/logout', label: i18n.t('nav.logout'), visible: isAdmin }
	]);
</script>

<nav>
	{#each menuItems as item}
		{#if item.visible}
			<a href={item.href}>
				{item.label}
			</a>
		{/if}
	{/each}
</nav>

<style>
	a {
		padding: 0.3em;
	}

	nav {
		display: flex;
	}
</style>
