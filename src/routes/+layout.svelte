<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { GLOBAL_LAYER_SETTINGS } from 'shared/types';
	import type { LayoutProps } from './$types';

	let { children, data } = $props() as LayoutProps & { data: GLOBAL_LAYER_SETTINGS };
	console.log('src/routes/+layout.svelte', data);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="container mx-auto">
	{@render children?.()}
</div>
