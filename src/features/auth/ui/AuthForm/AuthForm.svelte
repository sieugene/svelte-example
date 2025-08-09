<script lang="ts">
	import {
		username,
		password,
		error,
		loading,
		submit
	} from 'features/auth/client/model/loginFormStore';
</script>

<form on:submit|preventDefault={submit} class="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
	<input
		bind:value={$username}
		type="text"
		name="username"
		placeholder="Username"
		class="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
	/>
	<input
		bind:value={$password}
		type="password"
		name="password"
		placeholder="Password"
		class="mb-6 w-full rounded-md border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
	/>

	{#if $error}
		<p class="mb-4 flex items-center gap-2 text-red-600 bg-red-100 px-4 py-2 rounded-md border border-red-300">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
			</svg>
			{$error}
		</p>
	{/if}

	<button
		disabled={$loading}
		type="submit"
		class="relative flex justify-center items-center w-full rounded-md bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
	>
		{#if $loading}
			<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
			</svg>
			Loading...
		{:else}
			Login
		{/if}
	</button>
</form>
