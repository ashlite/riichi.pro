<script>
  import {env} from '$env/dynamic/public'
  import Image from 'atom/image.svelte';

  const bgImage = env.PUBLIC_TEBI_CORE + 'hero-bg.jpg'
  const logoImage = env.PUBLIC_TEBI_CORE + 'logo.svg'
</script>

<div class="hero min-h-screen" style={`background-image: url(${bgImage});`}>
  <div class="hero-overlay bg-opacity-70"></div>
  <div class="hero-content text-center">
    <div class="max-w-md">
      <Image src={logoImage} alt="Logo hero" />
      <p class="py-6 text-gray-100">Ranking system, performance tracker, helper tools for clubs, tournament and offline play for <span class="font-bold text-primary">Riichi Mahjong</span></p>
    </div>
  </div>
</div>