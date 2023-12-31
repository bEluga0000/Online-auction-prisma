import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function main() {
    await prisma.player.deleteMany()
    await prisma.teams.deleteMany()
}
main()
    .catch((e) => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })