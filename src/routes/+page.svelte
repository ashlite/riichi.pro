<script>
  //skeleton
  import {filter} from '@skeletonlabs/skeleton'
  //svelte
  import {env} from '$env/dynamic/public'

  const bgImage = env.PUBLIC_TEBI_CORE + 'hero-bg.jpg'
  const logoImage = env.PUBLIC_TEBI_CORE + 'logo.svg'
</script>

<div class="h-screen relative overflow-hidden">
  <img src={bgImage} use:filter={'#Emerald'} class="absolute w-full h-full -z-10 object-cover" alt="main background"/>
  <!-- <div class="hero-overlay bg-opacity-70"></div> -->
  <div class="card w-4/5 md:w-3/5 p-4 variant-glass-surface absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <header>
      <img src={logoImage} alt="Logo hero" class="w-60 md:w-80 lg:w-92 mx-auto" />
    </header>
    <section class="text-white">
      <p class="py-6">Ranking system, performance tracker, helper tools for clubs, tournament and offline play for <span class="font-bold text-primary-400">Riichi Mahjong</span></p>
    </section>
  </div>
</div>