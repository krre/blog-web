<script lang="ts">
	interface Props {
		count: number;
		limit?: number;
		current: number;
	}

	let { count, limit = 10, current = $bindable(1) }: Props = $props();

	let pages: number[] = $state([]);
	let last = $derived(Math.ceil(count / limit));

	$effect(() => {
		const maxPageSelectors = 5;
		const newPages = Array(Math.min(last, maxPageSelectors));

		newPages[0] = 1;
		newPages[newPages.length - 1] = last;

		let start = 2;

		if (newPages.length == maxPageSelectors && current >= 4) {
			if (last - current <= 3 && current > last - 3) {
				start = last - 3;
			} else if (current >= 4) {
				start = current - 1;
			}
		}

		for (let i = 0; i < newPages.length - 2; i++) {
			newPages[i + 1] = start + i;
		}

		pages = newPages;
	});
</script>

{#if count > limit}
	<div class="pages">
		{#each pages as page}
			<button class:offset={current == page} onclick={() => (current = page)}>{page}</button>
		{/each}
	</div>
{/if}

<style>
	.pages {
		display: flex;
		justify-content: center;
	}

	button {
		width: 3rem;
		height: 3rem;
		background-color: white;
		border-top: var(--border-1px);
		border-bottom: var(--border-1px);
		border-left: var(--border-1px);
		border-right: none;
	}

	button:hover {
		background-color: var(--secondary-color-200);
	}

	button:last-child {
		border-right: var(--border-1px);
	}

	.offset {
		background-color: var(--secondary-color-100);
	}
</style>
