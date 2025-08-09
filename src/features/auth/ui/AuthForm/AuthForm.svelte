<script lang="ts">
	import {
		username,
		password,
		error,
		loading,
		submit,
		type AUTH_FORM_TYPE
	} from 'features/auth/client/use-cases/auth-form.case';
	export let authType: AUTH_FORM_TYPE;
</script>

<form
	on:submit|preventDefault={() => submit(authType)}
	class="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-md"
>
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
		<p
			class="mb-4 flex items-center gap-2 rounded-md border border-red-300 bg-red-100 px-4 py-2 text-red-600"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 flex-shrink-0"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
				/>
			</svg>
			{$error}
		</p>
	{/if}

	<button
		disabled={$loading}
		type="submit"
		class="cursor-pointer relative flex w-full items-center justify-center rounded-md bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
	>
		{#if $loading}
			<svg
				class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
			</svg>
			Loading...
		{:else}
			{authType === 'login' ? 'Login' : 'Register'}
		{/if}
	</button>
</form>
