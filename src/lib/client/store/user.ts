import { getContext, setContext } from "svelte";
import type { iUserLocal } from "interface/user";
import { writable, type Writable } from "svelte/store";

export function setLoginUser() {
  const userStore = writable()
  return setContext('userLocal', userStore)
}

export function getLoginUser() {
  return getContext<Writable<iUserLocal>>('userLocal')
}