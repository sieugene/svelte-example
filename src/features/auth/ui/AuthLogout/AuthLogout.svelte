<script lang="ts">
	import { error, loading, logout } from 'features/auth/client/use-cases/auth-logout.case';
</script>

<div class="mt-6">
	{#if $error}
		<p class="mb-2 text-sm font-medium text-red-600">Error: {$error}</p>
	{/if}
	<button
		on:click={logout}
		disabled={$loading}
		class="cursor-pointer w-full rounded bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
	>
		{#if $loading}
			Logging out...
		{:else}
			Logout
		{/if}
	</button>
</div>
