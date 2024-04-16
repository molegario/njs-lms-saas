const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  //1 - seed categories in DB
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Filming" },
      ],
    });
    console.log("Success seeding categories!");
  } catch (error) {
    if(error instanceof Error) {
      console.error(error.message)
    } else {
      console.error("Failed to seed categories in DB.")
    }
  } finally {
    await database.$disconnect();
  }
}

main();