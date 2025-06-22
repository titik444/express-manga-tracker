import { Role } from "@prisma/client";
import prisma from "../../src/utils/client.js";
import { encrypt } from "../../src/utils/bcript.js";

export async function seedUser() {
  console.log("Seeding Users...");

  const users = [
    {
      name: "admin",
      email: "admin@test.com",
      password: await encrypt("test1234"),
      role: Role.ADMIN,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log("Users Seeded!");
}
