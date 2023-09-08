<script>
  const tableData = [{
    title: "Novice",
    index: 1,
    first: 20,
    second: 10,
    third: 5,
    fourth: 0,
    baseRP: 0,
    promotion:100,
    demotion:false,
    ppRequired: 0,
  }, {
    title: "Adept 1",
    index: 2,
    first: 40,
    second: 20,
    third: 0,
    fourth: -10,
    baseRP: 100,
    promotion:200,
    demotion:false,
    ppRequired: 0,
  }, {
    title: "Adept 2",
    index: 3,
    first: 40,
    second: 20,
    third: -5,
    fourth: -20,
    baseRP: 200,
    promotion:400,
    demotion:true,
    ppRequired: 0,
  }, {
    title: "Adept 3",
    index: 4,
    first: 40,
    second: 20,
    third: -10,
    fourth: -30,
    baseRP: 400,
    promotion: 800,
    demotion: true,
    ppRequired: 0,
  }, {
    title: "Expert 1",
    index: 5,
    first: 90,
    second: 30,
    third: -20,
    fourth: -40,
    baseRP: 1000,
    promotion: 2000,
    demotion: true,
    ppRequired: 100,
  }, {
    title: "Expert 2",
    index: 6,
    first: 90,
    second: 30,
    third: -20,
    fourth: -50,
    baseRP: 2000,
    promotion: 4000,
    demotion: true,
    ppRequired: 200,
  }, {
    title: "Expert 3",
    index: 7,
    first: 90,
    second: 30,
    third: -20,
    fourth: -60,
    baseRP: 3000,
    promotion: 6000,
    demotion: true,
    ppRequired: 300,
  }, {
    title: "Expert 4",
    index: 8,
    first: 90,
    second: 30,
    third: -30,
    fourth: -70,
    baseRP: 4000,
    promotion: 8000,
    demotion: true,
    ppRequired: 400,
  }, {
    title: "Expert 5",
    index: 9,
    first: 90,
    second: 30,
    third: -30,
    fourth: -80,
    baseRP: 4000,
    promotion: 8000,
    demotion: true,
    ppRequired: 500,
  }, {
    title: "Master",
    index: 10,
    first: 90,
    second: 30,
    third: -30,
    fourth: -90,
    baseRP: 5000,
    promotion: 0,
    demotion: true,
    ppRequired: 1000,
  }]
</script>

<div class="mt-4 mx-6">
  <h1 class="text-4xl font-bold my-4">Rank Table</h1>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Title</th>
          <th>Skill Index</th>
          <th>Bonus 1</th>
          <th>Bonus 2</th>
          <th>Bonus 3</th>
          <th>Bonus 4</th>
          <th>Base RP</th>
          <th>RP to promotion</th>
          <th>Demotion</th>
          <th>PP Required</th>
        </tr>
      </thead>
      <tbody>
        {#each tableData as data}
          <tr>
            <td>{data.title}</td>
            <td>{data.index}</td>
            <td>{data.first}</td>
            <td>{data.second}</td>
            <td>{data.third}</td>
            <td>{data.fourth}</td>
            <td>{data.baseRP}</td>
            <td>{data.promotion}</td>
            <td><input type="checkbox" checked={data.demotion} class="checkbox" /></td>
            <td>{data.ppRequired}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>