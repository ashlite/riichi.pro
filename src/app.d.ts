// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { iUserLocal } from "interface/user";
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      user?: iUserLocal
    }
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
