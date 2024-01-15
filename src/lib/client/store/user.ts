import { getContext, setContext } from "svelte";
import type { iUserLocal } from "interface/user";
import { writable, type Writable } from "svelte/store";

export function setLoginUser(user: iUserLocal) {
  const userStore = writable(user)
  return setContext('userLocal', userStore)
}

export function getLoginUser() {
  return getContext<Writable<iUserLocal>>('userLocal')
}