<script lang="ts">
  import shortcut from '$lib/service/shortcut'
  import Icon from '@iconify/svelte'

  export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md'
  export let color = 'neutral'
  export let icon: string | null = null
  export let iconSize = 30
  export let type: 'button' | 'reset' | 'submit' = 'button'
  export let text = ''
  export let state: 'loading' | 'disabled' | '' = ''
  export let kbd: string | null = null
  export let key: string | null = null
  export let full = false
  export let grow = false
  export let outline = false
  export let square = false
  export let block = false
  export let href: string | null = null
  export let textAlign = 'center'
  export let action: string | null = null
  export let join = false

  let globalClass = `btn gap-2 btn-${size} btn-${color} ${full ? 'w-full':''} ${grow ? 'grow':''} ${outline ? 'btn-outline':''} ${square ? 'btn-square':''} ${block ? 'btn-block':''} text-${textAlign} ${join ? 'join-item' : ''}`

  const shortcutSetting = { alt:true, shift:true, code:key }

</script>

{#if state == 'loading'}

  <button class={`${globalClass} btn-disabled loading`}>Processing</button>

{:else if state == 'disabled'}

  <button class={`${globalClass} btn-disabled`}>{text}</button>

{:else}
  {#if key == undefined }
    {#if href != undefined}
      <a href={href} data-sveltekit-preload-data="tap" class={globalClass} type={type}>
        {#if icon}
          <Icon 
          icon={icon} 
          width={iconSize} 
          height={iconSize} />
        {/if}
        {text}
      </a>
    {:else if action}
      <form method="POST" action={action}>
        <button class={globalClass} on:click type="submit">
          {#if icon}
            <Icon 
            icon={icon} 
            width={iconSize} 
            height={iconSize} />
          {/if}
          {text}
        </button>  
      </form>
    {:else}
      <button class={globalClass} on:click type={type}>
        {#if icon}
          <Icon 
          icon={icon} 
          width={iconSize} 
          height={iconSize} />
        {/if}
        {text}
      </button>
    {/if}

  {:else}
    {#if href != undefined}
      <a href={href}
        data-sveltekit-preload-data="tap"
        class={globalClass}
        type={type}
        use:shortcut={shortcutSetting}
      >
        {#if icon}
          <Icon 
          icon={icon} 
          width={iconSize} 
          height={iconSize} />
        {/if}
        {text}
        <kbd class="kbd kbd-xs text-base-content">{kbd}</kbd>
      </a>
    {:else if action}
      <form method="POST" action={action}>
        <button class={globalClass} on:click type="submit" use:shortcut={shortcutSetting}>
          {#if icon}
            <Icon 
            icon={icon} 
            width={iconSize} 
            height={iconSize} />
          {/if}
          {text}
          <kbd class="kbd kbd-xs text-base-content">{kbd}</kbd>
        </button>  
      </form>
    {:else}
      <button 
        class={globalClass}
        on:click 
        type={type}
        use:shortcut={shortcutSetting}
      >
        {#if icon}
          <Icon 
          icon={icon} 
          width={iconSize} 
          height={iconSize} />
        {/if}
        {text}
        <kbd class="kbd kbd-xs text-base-content">{kbd}</kbd>
      </button>
    {/if}
  {/if}
{/if}