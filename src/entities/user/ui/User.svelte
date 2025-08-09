<script lang="ts">
	import type { Auth } from 'features/auth/types';
	import { AuthLogout } from 'features/auth/ui/AuthLogout';
	export let user: Auth['user'];
</script>

<div class="mx-auto max-w-md space-y-4 rounded-lg bg-white p-4 shadow-md">
	<div class="text-lg font-semibold text-gray-800">{user.username}</div>
	<div class="text-gray-600">Age: {user.age}</div>
	<div class="text-gray-600">ID: {user.id}</div>

	<AuthLogout />
</div>
