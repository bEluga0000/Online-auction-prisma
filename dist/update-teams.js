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
const prisma = new client_1.PrismaClient({ log: ['info', 'query'], });
const newPlayers = ["hello", "jenni"];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        function updatePlayer() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield prisma.player.update({
                    where: { id: 1 },
                    data: {
                        team: { connect: { id: 1 } },
                    },
                });
            });
        }
        function teams() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield prisma.teams.findFirst({ where: { id: 1 } });
            });
        }
        const palyergoo = yield updatePlayer();
        const teamgoo = yield teams();
        console.log(palyergoo, "/n", teamgoo);
    });
}
main();
