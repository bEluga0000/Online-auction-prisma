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
function removePlayerInTeam(playerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const player = yield prisma.player.findUnique({
            where: {
                id: playerId
            },
            select: {
                teamId: true,
                sPrice: true
            }
        });
        if (player.teamId) {
            yield prisma.player.update({
                where: {
                    id: playerId
                },
                data: {
                    teamId: null,
                    sPrice: null
                }
            });
            yield prisma.teams.update({
                where: { id: player.teamId },
                data: {
                    priceLeft: {
                        increment: player.sPrice
                    }
                }
            });
        }
        else {
            console.log("Player not in any time as of now");
        }
    });
}
removePlayerInTeam("1e8dda03-d35a-4c21-ac27-2cf6f1f8b0ab");
