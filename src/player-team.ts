import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function playerWithTeam(playerId:string)
{
    const player = await prisma.player.findUnique({
        where:{
            id:playerId
        },
        include:{
            team:{
                select:{

                    name:true
                }
            }
        }
    })
    console.log(player)
}
playerWithTeam('1e8dda03-d35a-4c21-ac27-2cf6f1f8b0ab')