import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function removePlayerInTeam(playerId:string)
{
    const player = await prisma.player.findUnique({
        where:{
            id:playerId
        },
        select:{
            teamId:true,
            sPrice:true
        }
    })as {teamId:number,sPrice:number}
    if(player.teamId)
    {
        await prisma.player.update({
            where: {
                id: playerId
            },
            data: {
                teamId: null,
                sPrice: null
            }
        })
        await prisma.teams.update({
            where: { id: player.teamId },
            data: {
                priceLeft: {
                    increment: player.sPrice
                }
            }
        }) 
    }
    else
    {
        console.log("Player not in any time as of now")
    }
    
}
removePlayerInTeam("1e8dda03-d35a-4c21-ac27-2cf6f1f8b0ab")