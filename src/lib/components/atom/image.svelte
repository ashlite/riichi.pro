<script lang="ts">
  import { validUrl } from "$lib/service/tools"

  export let src: string | undefined
  export let alt: string | undefined = 'Image/Gambar'
  export let maxH: number = 60
  export let objectContain: Boolean = false

  let classBuilder: string = ''
  classBuilder.concat(`max-h-${maxH} `)
  objectContain && classBuilder.concat(`object-contain `)

  function handleError(ev:Event) {
    (ev.target! as HTMLImageElement).src = "https://dummyimage.com/1000x1000/edb200/ffffff&text=NO+IMG"
  }

</script>

<img src={src} alt={alt} class={classBuilder} on:error={handleError} />