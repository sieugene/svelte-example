<script lang="ts">
	import { UserPage } from '@pages/user';

	const { data } = $props();
</script>

<UserPage user={data.auth.user} />
