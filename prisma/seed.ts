import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
export const prisma = new PrismaClient();

const roles = ['ADMIN', 'USER'];

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
            passwordHash: await bcrypt.hash("t12345678", 10),
            userAuthToken: crypto.randomUUID(),
            role: { connect: { name: 'ADMIN' } },
          },
	});
}

seed()
