// See https://kit.svelte.dev/docs/types#app

import type { User } from "$lib/type/Types";
import type { PrismaClient } from "@prisma/client";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User
		}
		// interface PageData {}
		// interface Platform {}
	}
	var prisma: PrismaClient
}

export {};
