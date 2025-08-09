<script lang="ts">
	import type { GLOBAL_LAYER_SETTINGS } from 'shared/types';
	import type { LayoutProps } from '../$types';

	let { children, data } = $props() as LayoutProps & { data: GLOBAL_LAYER_SETTINGS };
	console.log('src/routes/user/+layout.svelte', data);
	let error: string = $state("");
	if (!data.msg) {
		error = "I'm depended part of global layer, and global layer was changed!";
	}
</script>

{@render children?.()}
{#if error.length}
	<div>Error: {error}</div>
{/if}
