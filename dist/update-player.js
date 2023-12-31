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
// async function addPlayerTeam(playerId: string,sold:number,teamId:number) {
//     const players = await prisma.player.update({
//         where:{
//             id:playerId,
//         },
//         data:{
//             sPrice:sold,
//             teamId:teamId
//         }
//     })
//     console.log(players)
// }
function addPlayerToTeam(teamId, player) {
    return __awaiter(this, void 0, void 0, function* () {
        const team = yield prisma.teams.update({
            where: {
                id: teamId,
            },
            data: {
                playersName: {
                    push: player
                }
            }
        });
        console.log(team);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // await addPlayerTeam('ab1c3ccc-6d59-4f31-9d44-1e90470b8b20', 28000, 6)
        yield addPlayerToTeam(6, "Sachin");
    });
}
main()
    .catch((e) => {
    console.log(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
