import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function main() {
    const teams = await prisma.teams.findMany()
    console.log(teams)
}
main()
    .catch((e) => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })