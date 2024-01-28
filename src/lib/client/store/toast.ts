import { writable, derived } from 'svelte/store'
import type { Readable, Writable } from 'svelte/store'
import type { fetchResponse } from 'service/api'
import type { iGlobalResponse } from 'interface/utils'

interface iToast {
  message: string,
  type: string,
  duration: number
}

function createToast(){
  const _toast = writable<iToast[]>([])

  function send (message: string, type: string, duration = 3000){
    _toast.update(state => {
      return [...state, {message, type, duration}]
    })
  }

  const toast = derived<Writable<iToast[]>, iToast[]>(_toast, ($_toast, set) => {
    set($_toast)
    if ($_toast.length > 0){
      const timer = setTimeout(()=> {
        _toast.update(state => {
          state.shift()
          return state
        })
      }, $_toast[0].duration)
      return () => {
        clearTimeout(timer)
      }
    }
  })

  const {subscribe} = toast

  return {
    subscribe,
    send,
    info: (msg: string, duration?: number) => send(msg, 'info', duration),
    error: (msg: string, duration?: number) => send(msg, 'error', duration),
    warning: (msg: string, duration?: number) => send(msg, 'warning', duration),
    success: (msg: string, duration?: number) => send(msg, 'success', duration),
    fetchError: (obj: fetchResponse) => send(`${obj.status}. ${obj.status_text}`, 'error', 10000),
    responseError: (obj: iGlobalResponse) => send(`${obj.header.error}`, 'error', 10000)
  }
}

const toastAlert = createToast()
export default toastAlert;