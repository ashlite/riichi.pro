import { getContext, setContext } from "svelte";
import type { iUserLocal } from "interface/user";

export function setLoginUser(user: iUserLocal) {
  return setContext('userLocal', user)
}

export function getLoginUser(): iUserLocal {
  return getContext('userLocal')
}