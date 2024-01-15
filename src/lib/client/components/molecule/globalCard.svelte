<script lang="ts">
  export let img: string | null = null
  export let title: string | null = null
  export let titleColor = 'primary'
</script>

<div class="card w-full bg-base-100 shadow-xl">
  {#if img}
    <figure><img src={img} alt="Card" /></figure>   
  {/if}
  <div class="card-body">
    {#if title}
      <h2 class={`card-title font-bold text-${titleColor}`}>{title}</h2>
    {/if}
    <slot />
  </div>
</div>