<script lang="ts">
  export let value: any
  export let text: String | Number
  export let disabled = false
  export let selected = false
</script>

if 
<option value={value} disabled={disabled} selected={selected} class="text-base-content">{text}</option>