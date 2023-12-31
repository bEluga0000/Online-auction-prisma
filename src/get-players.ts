import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function main() {
    const players = await prisma.player.findMany()
    console.log(players)
}
main()
    .catch((e) => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })