// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { iUserLocal, iMemberRoles } from "interface/user";
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      user?: iUserLocal
      status?: 'register' | 'login'
    }
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
