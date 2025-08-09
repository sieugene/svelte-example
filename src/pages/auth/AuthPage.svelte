<script lang="ts">
	import type { AUTH_FORM_TYPE } from 'features/auth/client/use-cases/auth-form.case';
	import { AuthForm } from 'features/auth/ui/AuthForm';
	import { writable } from 'svelte/store';

	const activeTab = writable<AUTH_FORM_TYPE>('login');
</script>

<div class="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-md">
	<h2 class="mb-6 text-center text-2xl font-bold text-gray-800">
		{$activeTab === 'login' ? 'Welcome back!' : 'Create your account'}
	</h2>

	<div class="mb-6 flex border-b border-gray-200">
		<button
			class="flex-1 px-4 py-2 text-center font-semibold transition-colors duration-200"
			class:bg-blue-500={$activeTab === 'login'}
			class:text-white={$activeTab === 'login'}
			class:text-gray-600={$activeTab !== 'login'}
			class:hover:bg-blue-100={$activeTab !== 'login'}
			on:click={() => activeTab.set('login')}
		>
			Login
		</button>
		<button
			class="flex-1 px-4 py-2 text-center font-semibold transition-colors duration-200"
			class:bg-blue-500={$activeTab === 'register'}
			class:text-white={$activeTab === 'register'}
			class:text-gray-600={$activeTab !== 'register'}
			class:hover:bg-blue-100={$activeTab !== 'register'}
			on:click={() => activeTab.set('register')}
		>
			Register
		</button>
	</div>

	{#if $activeTab === 'login'}
		<AuthForm authType="login" />
	{:else}
		<AuthForm authType="register" />
	{/if}
</div>
