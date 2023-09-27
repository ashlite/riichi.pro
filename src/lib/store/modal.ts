import { writable } from "svelte/store"

export interface iModal {
  title: string
  template: 'loginForm' | 'playerEditor' | 'tnc' | 'credit'
  action?: string
  data?: any
  // size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  size: string
}

function createModal(){
  const {set, subscribe} = writable<iModal | undefined>()
  return{
    subscribe,
    close:() => set(undefined),
    open: (data: iModal) => set(data),
    loginForm:() => set({title: 'Login/Register', template: 'loginForm', size:'w-4/12'}),
    playerEditor:() => set({title: 'Be a player', template: 'playerEditor', size:'w-7/12'}),
    tnc:() => set({title: 'Term and Condition', template: 'tnc', size:'w-8/12'}),
    webCredit:() => set({title: 'Credits', template: 'credit', size:'w-5/12'}),
  }
}

const globalModal = createModal()
export default globalModal;