"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function buyPlayer(playerId, bid, teamId) {
    return __awaiter(this, void 0, void 0, function* () {
        const teamPriceLeft = yield prisma.teams.findUnique({
            where: {
                id: teamId,
            },
            select: {
                priceLeft: true,
            },
        });
        const playerInTeam = yield prisma.player.findUnique({
            where: { id: playerId },
            select: { teamId: true }
        });
        if (teamPriceLeft && !(playerInTeam === null || playerInTeam === void 0 ? void 0 : playerInTeam.teamId)) {
            if (teamPriceLeft.priceLeft < bid) {
                console.log("Ur team does not have enough money ot buy");
                return;
            }
            else {
                const priceLeft = teamPriceLeft.priceLeft - bid;
                const pName = yield prisma.player.update({
                    where: {
                        id: playerId,
                    },
                    data: {
                        teamId: teamId,
                        sPrice: bid
                    },
                    select: {
                        name: true
                    }
                });
                const team = yield prisma.teams.update({
                    where: {
                        id: teamId,
                    },
                    data: {
                        priceLeft: priceLeft,
                        playersName: {
                            push: pName.name
                        }
                    }
                });
                console.log(team);
            }
        }
        else {
            console.log("Team is not having the enough money or player already in a team");
        }
    });
}
buyPlayer('1e8dda03-d35a-4c21-ac27-2cf6f1f8b0ab', 28000, 6)
    .catch((e) => {
    console.log(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
