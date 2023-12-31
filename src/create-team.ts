import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function main(name:string) {
    const players = await prisma.teams.create({
        data:{
            name:name
        }
    })
}
main("Royal Challengers Banglore")
    .catch((e) => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })