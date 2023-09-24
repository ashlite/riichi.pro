<script lang="ts">
  let currentStep = 1
</script>

<div class="w-4/5 mx-auto mt-8">
  <div class="w-full mx-auto">
    <ul class="steps">
      <li class={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Register as a player</li>
      <li class={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Register Club</li>
      <li class={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Summary</li>
    </ul>
  </div>

</div>

{#if currentStep == 1}
  
{/if}