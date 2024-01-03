// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {  iMemberRoles } from "interface/user";
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      firebaseId?: str
    }
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
