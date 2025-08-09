<script lang="ts">
	import { User } from 'entities/user/ui';
	import type { Auth } from 'features/auth/types';

	// Props
	export let user: Auth['user'];
</script>

<div>
	<h2>User page</h2>
	<User {user} />
</div>
