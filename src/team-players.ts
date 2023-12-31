import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function teamsWithPlayers(teamId:number){
    const team = await prisma.teams.findUnique({
        where:{
            id:teamId
        },
        include:{
            players:{
                select:{
                    name:true,
                    role:true
                }
            }
        }
    })
    console.log(team)
}
teamsWithPlayers(6)