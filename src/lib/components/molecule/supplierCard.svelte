<script lang="ts">
  export let data: any = {}
</script>

<div class="card w-full glass shadow-xl">
  <div class="card-body">
    <h2 class="card-title text-2xl">
      Supplier
    </h2>
    <div class="grid grid-cols-2">
      <div>
        <span class="font-bold text-info">Company: </span>{data.supplier_name ? data.supplier_name : '~'}
      </div>
      <div>
        <span class="font-bold text-info">CP Name: </span>{data.cp_name ? data.cp_name : '~'}
      </div>
      <div>
        <span class="font-bold text-info">Country: </span>{data.country ? data.country : '~'}
      </div>
      <div>
        <span class="font-bold text-info">CP Email: </span>{data.cp_email ? data.cp_email : '~'}
      </div>
      <div>
        <span class="font-bold text-info">Email: </span>{data.email ? data.email : '~'}
      </div>
      <div>
        <span class="font-bold text-info">CP Mobile: </span>{data.cp_mobile ? data.cp_mobile : '~'}
      </div>
      <div>
        <span class="font-bold text-info">Phone: </span>{data.phone ? data.phone : '~'}
      </div>
      <div>
        <span class="font-bold text-info">NOTES: </span>{data.notes ? data.notes : '~'}
      </div>
    </div>
  </div>
</div>