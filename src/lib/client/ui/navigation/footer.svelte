<script lang="ts">
  // import globalModal from "store/modal";
  //skeleton
  import type {PopupSettings} from '@skeletonlabs/skeleton'
  import {popup} from '@skeletonlabs/skeleton'
  //icon
  import Icon from '@iconify/svelte'
  
  export let appVersion: string
  const today = new Date()

  const developerPop: PopupSettings = {
    event: 'click',
    target: 'popData',
    placement: 'top'
  }

</script>

<footer class="flex flex-col p-4 items-center bottom-0 bg-primary text-primary-content">
  <div class="text-center">v{appVersion} - Copyright {today.getFullYear()} by janshi.pro</div>
  <div class="card p-4 variant-filled-primary" data-popup="popData">
    <h1 class="text-xl">David Santoso</h1>
    <h2 class="">Fullstack Developer</h2>
    <div class="flex flex-col md:flex-row w-full md:w-3/5 gap-2">
      <a href="mailto:david91santoso@gmail.com" class="btn variant-filled-secondary">
        <span class="text-xl mr-2">
          <Icon icon="mingcute:mail-line" />
        </span>
        EMAIL ME
      </a>
    </div>
    <div class="arrow variant-filled-primary" />
  </div>
  <button class="font-bold underline hover:cursor-pointer" use:popup={developerPop}>Developers</button>
</footer>