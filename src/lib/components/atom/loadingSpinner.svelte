<script lang="ts">
  // export let size = 32
  export let size: 'sm' | 'md' | 'lg'  = 'md'
</script>

<div class={size == 'sm' ? `w-20 h-20` : size == 'md' ? 'w-32 h-32' : 'w-56 h-56'} >
  <div class="lds-ripple">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>

<style lang="postcss">
  .lds-ripple {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.2s;
}
.lds-ripple div:nth-child(3) {
  animation-delay: -0.4s;
}
.lds-ripple div:nth-child(4) {
  animation-delay: -0.6s;
}
@keyframes lds-ripple {
  0% {
    top: 50%;
    left: 50%;
    width: 0%;
    height: 0%;
    opacity: 0;
  }
  4.9% {
    top: 50%;
    left: 50%;
    width: 0%;
    height: 0%;
    opacity: 0;
  }
  5% {
    top: 50%;
    left: 50%;
    width: 0%;
    height: 0%;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>