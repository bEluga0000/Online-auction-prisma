import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function buyPlayer(playerId: string, bid: number,teamId: number) {
    const teamPriceLeft = await prisma.teams.findUnique({
        where: {
            id: teamId,
        },
        select: {
            priceLeft: true,
        },
    }) as { priceLeft: number } | null
    const playerInTeam = await prisma.player.findUnique({
        where:{id:playerId},
        select:{teamId:true}
    })as {teamId:number}|null
    if (teamPriceLeft && !playerInTeam?.teamId) {
        if (teamPriceLeft.priceLeft < bid) {
            console.log("Ur team does not have enough money ot buy")
            return;
        }
        else {
            const priceLeft: number = teamPriceLeft.priceLeft - bid
            const pName = await prisma.player.update({
                where: {
                    id: playerId,
                },
                data: {
                    teamId:teamId,
                    sPrice:bid
                },
                select:{
                    name:true
                }
            })as {name:string}
            const team = await prisma.teams.update({
                where: {
                    id: teamId,
                },
                data: {
                    priceLeft: priceLeft,
                    playersName:{
                        push:pName.name
                    }
                }
            })
            console.log(team)
        }
    }
    else
    {
        console.log("Team is not having the enough money or player already in a team")
    }
}
buyPlayer('1e8dda03-d35a-4c21-ac27-2cf6f1f8b0ab',28000,6)
    .catch((e) => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })