<script lang="ts">
import LogoShopee from '$lib/assets/shopee.svg'
import LogoTokopedia from '$lib/assets/tokopedia.svg'
import LogoTiktok from '$lib/assets/tiktok.svg'
import Image from 'atom/image.svelte'
import globalModal from 'store/modal'
import type { iEditChannel } from 'interface/catalogue'

export let channelData: iEditChannel

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="w-16 h-16 hover:scale-110 hover:cursor-pointer active:scale-100" on:click={() => globalModal.channelEditor(channelData)}>
  {#if channelData.provider == 'tokopedia'}
    <Image src={LogoTokopedia} alt="Logo Tokopedia" />
  {:else if channelData.provider == 'shopee'}
    <Image src={LogoShopee} alt="Logo Shopee" />
  {:else if channelData.provider == 'tiktok'}
    <Image src={LogoTiktok} alt="Logo Tiktok" />
  {/if}
</div>