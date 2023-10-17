<script lang='ts'>
  import FormLogin from 'template/modal/formLogin.svelte';
  import FormPlayerEditor from 'template/modal/formPlayerEditor.svelte';
  import WebCredit from 'template/modal/webCredit.svelte';
  import ClubEditor from 'template/modal/clubEditor.svelte';
  import QuitConfirmation from 'template/modal/quitConfirmation.svelte';
  import Tnc from 'template/modal/tnc.svelte';
  import KickConfirmation from 'template/modal/kickConfirmation.svelte';

  import globalModal from 'store/modal'
  import shortcut from '$lib/service/shortcut'
</script>

<input type="checkbox" id="global-modal" class="modal-toggle" checked={$globalModal ? true : false}/>
<dialog class="modal z-[99]" id="global-modal">
  <div class={`modal-box max-w-full ${$globalModal?.size} border-2 border-primary`}>
    <div id="modal-header" class="flex justify-between border-bottom border-b-2 border-accent mb-4">
      {#if $globalModal?.title}
        <h3 class="font-bold text-4xl">{$globalModal?.title}</h3>
      {/if}
      <button class="btn btn-sm btn-error" use:shortcut={{ code:'Escape' }} on:click={() => globalModal.close()}>X</button>
    </div>
    
    <div id="modal-body">
      {#if $globalModal?.template == 'loginForm'}
        <FormLogin />
      {:else if $globalModal?.template == 'playerEditor'}
        <FormPlayerEditor />
      {:else if $globalModal?.template == 'credit'}
        <WebCredit />
      {:else if $globalModal?.template == 'clubEditor'}
        <ClubEditor />
      {:else if $globalModal?.template == 'quitClubConfirmation'}
        <QuitConfirmation clubName={$globalModal.data.club} memberId={$globalModal.data.memberId} slug={$globalModal.data.slug} />
      {:else if $globalModal?.template == 'tnc'}
        <Tnc />
      {:else if $globalModal?.template == 'kickClubConfirmation'}
        <KickConfirmation memberId={$globalModal.data.memberId} name={$globalModal.data.name} slug={$globalModal.data.slug}/>
      {/if} 
    </div>
  </div>
</dialog>