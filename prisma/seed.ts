import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
export const prisma = new PrismaClient();

const roles = ['EDRU', 'ROLIG FYLL', 'BRISEN', 'FULL', 'KANAKAS', 'HENTAI DRITA'];

async function seed() {
	for (const role of roles) {
		await prisma.roles.create({
			data: {
				name: role
			}
		});
	}
	await prisma.user.create({
		data: {
            username: "thomasBruker",
            passwordHash: await bcrypt.hash("hallo", 10),
            userAuthToken: crypto.randomUUID(),
            role: { connect: { name: 'HENTAI DRITA' } },
			age: 23, 
			quote: 'Fylla har skylda'
          },
	});
}

seed()
