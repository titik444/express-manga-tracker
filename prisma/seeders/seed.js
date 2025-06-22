import { seedUser } from "./user.seeder.js";
import prisma from "../../src/utils/client.js";

async function main() {
  await seedUser();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
