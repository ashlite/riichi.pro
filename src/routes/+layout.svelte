<script>
  import "../app.css";
</script>

<div class="navbar bg-primary">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl text-primary-content" href="/">IRROS</a>
  </div>
  <div class="flex-none text-primary-content">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/simulasi">Simulasi Score</a></li>
      <li><a href="/doc">Documentation</a></li>
    </ul>
  </div>
</div>
<slot />