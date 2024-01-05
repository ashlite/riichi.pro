<script lang="ts">
  import type { iUserLocal } from "interface/user";

  export let user: iUserLocal | null
  export let size: string = 'w-12'
</script>

<div class="avatar">
  <div class={`${size} shadow rounded-full border-2 border-secondary`}>
    <img src={user?.avatarUrl ?? `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName}`} alt="avatar" />
  </div>
</div>

