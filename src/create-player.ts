import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function main()
{
    const players = await prisma.player.create({
        data:{
            age:25,
            name:"Babu",
            price:25000,
            role:"Batsman",   
        }
    })
}
main()
.catch((e)=>{
    console.log(e)
})
.finally(async()=>{
    await prisma.$disconnect()
})