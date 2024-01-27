<script lang="ts">
  export let src: string | undefined
  export let alt: string | undefined = 'Image/Gambar'
  export let maxH: number | 'full' = 60
  export let objectContain: Boolean = false
  export let scaleDown: boolean = false
  export let objectCover: boolean = false
  export let errorSrc: string = 'https://placehold.co/400x400?text=No+Img'

  let classBuilder: string = ''
  classBuilder = classBuilder.concat(`max-h-${maxH} `)
  objectContain && (classBuilder = classBuilder.concat(`object-contain `))
  scaleDown && (classBuilder = classBuilder.concat(`object-scale-down `))
  objectCover && (classBuilder = classBuilder.concat(`object-cover `))

  function handleError(ev:Event) {
    (ev.target! as HTMLImageElement).src = errorSrc
  }

</script>

<img src={src} alt={alt} class={classBuilder} on:error={handleError} />