<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { page } from '$app/state';

	interface Props {
		vertical?: boolean;
		onclick?: () => void;
	}

	let { vertical = false, onclick }: Props = $props();
	const isAdmin = page.data.admin ? true : false;

	interface MenuItem {
		href: string;
		label: string;
		visible: boolean;
	}

	const menuItems: MenuItem[] = $derived([
		{ href: '/', label: i18n.t('nav.blog'), visible: true },
		{ href: '/post/append', label: i18n.t('nav.append'), visible: isAdmin },
		{ href: '/drafts', label: i18n.t('nav.drafts'), visible: isAdmin },
		{ href: '/gallery', label: i18n.t('nav.gallery'), visible: isAdmin },
		{ href: '/profile', label: i18n.t('nav.profile'), visible: isAdmin },
		{ href: '/about', label: i18n.t('nav.about'), visible: true },
		{ href: '/api/logout', label: i18n.t('nav.logout'), visible: isAdmin }
	]);
</script>

<nav class:vertical>
	<ul>
		{#each menuItems as item}
			{#if item.visible}
				<li>
					<a
						href={item.href}
						class:active={item.href === '/'
							? page.url.pathname === '/'
							: page.url.pathname.startsWith(item.href)}
						{onclick}
					>
						{item.label}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

<style>
	nav {
		display: flex;
		justify-content: center;
	}

	nav ul {
		display: flex;
		font-size: 1rem;
		list-style: none;
		gap: 0.875rem;
		padding: 0;
	}

	nav.vertical {
		justify-content: flex-start;
	}

	nav.vertical ul {
		flex-direction: column;
		width: 100%;
		gap: 1.25rem;
	}

	nav a {
		text-decoration: none;
		color: var(--secondary-color-900);

		position: relative;
		padding-bottom: 5px;
		transition: color 0.3s ease;
	}

	nav a:hover {
		color: var(--accent-color-500);
	}

	nav a.active::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 2px;
		background-color: var(--accent-color-500);
	}
</style>
