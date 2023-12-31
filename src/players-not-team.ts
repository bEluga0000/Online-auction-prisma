import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function getPlayersNotInTeam()
{
    const palyers = await prisma.player.findMany({
        where:{
            teamId:null
        },
        select:{
            name:true,
            role:true,
            price:true
        }
    })
    console.log(palyers)
}
getPlayersNotInTeam()