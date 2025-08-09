<script lang="ts">
	import type { Auth } from 'features/auth/types';

	// Props
	export let user: Auth['user'];
</script>

<div>
	<h2>User page!?</h2>
	{user.username}
</div>
