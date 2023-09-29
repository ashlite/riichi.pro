<script lang="ts">
  import { validUrl } from "$lib/service/tools"

  export let src: string | undefined
  export let alt: string | undefined = 'Image/Gambar'
  export let maxH: number = 60
  export let objectContain: Boolean = false
  export let scaleDown: boolean = false

  let classBuilder: string = ''
  classBuilder = classBuilder.concat(`max-h-${maxH} `)
  objectContain && (classBuilder = classBuilder.concat(`object-contain `))
  scaleDown && (classBuilder = classBuilder.concat(`object-scale-down `))

  function handleError(ev:Event) {
    (ev.target! as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Img'
  }

</script>

<img src={src} alt={alt} class={classBuilder} on:error={handleError} />