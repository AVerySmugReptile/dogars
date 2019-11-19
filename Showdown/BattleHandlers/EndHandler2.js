"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasicHandler_1 = require("./BasicHandler");
const utils_1 = require("../../Website/utils");
const PSMessage_1 = require("../PSMessage");
const shoedrip_1 = require("../../Shoedrip/shoedrip");
const DogarsClient_1 = require("../../DogarsClient");
const dogars_chan_1 = require("../../dogars-chan");
class EndHandler extends BasicHandler_1.default {
    attached(bm, detach) {
        const _super = Object.create(null, {
            attached: { get: () => super.attached }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.attached.call(this, bm, detach);
            this.bm = bm;
        });
    }
    constructor(ia) {
        super();
        this.ia = ia;
    }
    win(w) {
        const _super = Object.create(null, {
            win: { get: () => super.win }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.win.call(this, w);
            if (this.ia.battleData.dist == 0)
                for (let i = 0; i < 45; ++i) {
                    let data = yield this.account.request(new PSMessage_1.PSUserDetails(this.ia.guessedChamp.showdown_name));
                    if (data.rooms === false) // offline
                        break;
                    let rooms = Object.keys(data.rooms)
                        .filter(n => n.includes('☆')) // do not follow rooms/spectating
                        .map(n => n.substr(1)) // remove the star
                        .filter(n => n > this.roomname); // newest rooms
                    if (rooms.length >= 1) {
                        this.ia.guessedChamp.current_battle = `https://play.pokemonshowdown.com/${rooms[0]}`;
                        DogarsClient_1.DogarsClient.setbattle(this.ia.guessedChamp.current_battle);
                        this.account.message(this.roomname, this.ia.guessedChamp.current_battle);
                        dogars_chan_1.monitor(this.ia.guessedChamp, this.account);
                        yield utils_1.snooze(1000);
                        break;
                    }
                    yield utils_1.snooze(1000);
                }
            else {
                console.log(`Didn't follow champ because`, this.ia.battleData, shoedrip_1.champ);
            }
            this.account.tryLeave(this.roomname);
        });
    }
}
exports.default = EndHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5kSGFuZGxlcjIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvU2hvd2Rvd24vQmF0dGxlSGFuZGxlcnMvRW5kSGFuZGxlcjIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlEQUEwQztBQUUxQywrQ0FBNkM7QUFDN0MsNENBQXdFO0FBRXhFLHNEQUErRDtBQUUvRCxxREFBa0Q7QUFDbEQsbURBQTRDO0FBRTVDLE1BQXFCLFVBQVcsU0FBUSxzQkFBWTtJQUcxQyxRQUFRLENBQUMsRUFBaUIsRUFBRSxNQUFrQjs7Ozs7WUFDaEQsT0FBTSxRQUFRLFlBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRTtZQUMzQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNqQixDQUFDO0tBQUE7SUFFRCxZQUFZLEVBQWtCO1FBQzFCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVLLEdBQUcsQ0FBQyxDQUFzQjs7Ozs7WUFDNUIsT0FBTSxHQUFHLFlBQUMsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQztnQkFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtvQkFDekIsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLHlCQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtvQkFDNUYsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRSxVQUFVO3dCQUNoQyxNQUFNO29CQUNWLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzt5QkFDOUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGlDQUFpQzt5QkFDOUQsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjt5QkFDeEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGVBQWU7b0JBQ3BELElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7d0JBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxvQ0FBb0MsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFlLENBQUM7d0JBQ2xHLDJCQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUN6RSxxQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDNUMsTUFBTSxjQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25CLE1BQU07cUJBQ1Q7b0JBQ0QsTUFBTSxjQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3RCO2lCQUNBO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsZ0JBQUssQ0FBQyxDQUFDO2FBQ3pFO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FBQTtDQUNKO0FBdkNELDZCQXVDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNpY0hhbmRsZXIgZnJvbSBcIi4vQmFzaWNIYW5kbGVyXCI7XG5pbXBvcnQgeyBCYXR0bGVNb25pdG9yIH0gZnJvbSBcIi4uL0JhdHRsZU1vbml0b3JcIjtcbmltcG9ydCB7IHNub296ZSB9IGZyb20gXCIuLi8uLi9XZWJzaXRlL3V0aWxzXCI7XG5pbXBvcnQgeyBQU1VzZXJEZXRhaWxzLCBVc2VyRGV0YWlscywgQmF0dGxlRXZlbnRzIH0gZnJvbSBcIi4uL1BTTWVzc2FnZVwiO1xuaW1wb3J0IEluZm9BZ2dyZWdhdG9yIGZyb20gXCIuL0luZm9BZ2dyZWdhdG9yXCI7XG5pbXBvcnQgeyBtb25pdG9yUGxheWVyLCBjaGFtcCB9IGZyb20gXCIuLi8uLi9TaG9lZHJpcC9zaG9lZHJpcFwiO1xuaW1wb3J0IHsgQmF0dGxlVVJMIH0gZnJvbSBcIi4uLy4uL0JhY2tlbmQvQ3JpbmdlQ29tcGlsYXRpb25cIjtcbmltcG9ydCB7IERvZ2Fyc0NsaWVudCB9IGZyb20gXCIuLi8uLi9Eb2dhcnNDbGllbnRcIjtcbmltcG9ydCB7IG1vbml0b3IgfSBmcm9tIFwiLi4vLi4vZG9nYXJzLWNoYW5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5kSGFuZGxlciBleHRlbmRzIEJhc2ljSGFuZGxlciB7XG4gICAgYm0hOiBCYXR0bGVNb25pdG9yO1xuICAgIGlhOiBJbmZvQWdncmVnYXRvcjtcbiAgICBhc3luYyBhdHRhY2hlZChibTogQmF0dGxlTW9uaXRvciwgZGV0YWNoOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHN1cGVyLmF0dGFjaGVkKGJtLCBkZXRhY2gpO1xuICAgICAgICB0aGlzLmJtID0gYm07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoaWE6IEluZm9BZ2dyZWdhdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaWEgPSBpYTtcbiAgICB9XG5cbiAgICBhc3luYyB3aW4odzogQmF0dGxlRXZlbnRzWyd3aW4nXSkge1xuICAgICAgICBzdXBlci53aW4odyk7XG4gICAgICAgIGlmICh0aGlzLmlhLmJhdHRsZURhdGEuZGlzdCA9PSAwKVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0NTsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCB0aGlzLmFjY291bnQucmVxdWVzdChuZXcgUFNVc2VyRGV0YWlscyh0aGlzLmlhLmd1ZXNzZWRDaGFtcC5zaG93ZG93bl9uYW1lKSlcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5yb29tcyA9PT0gZmFsc2UpIC8vIG9mZmxpbmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgbGV0IHJvb21zID0gT2JqZWN0LmtleXMoZGF0YS5yb29tcylcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihuID0+IG4uaW5jbHVkZXMoJ+KYhicpKSAvLyBkbyBub3QgZm9sbG93IHJvb21zL3NwZWN0YXRpbmdcbiAgICAgICAgICAgICAgICAgICAgLm1hcChuID0+IG4uc3Vic3RyKDEpKSAvLyByZW1vdmUgdGhlIHN0YXJcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihuID0+IG4gPiB0aGlzLnJvb21uYW1lKTsgLy8gbmV3ZXN0IHJvb21zXG4gICAgICAgICAgICAgICAgaWYgKHJvb21zLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWEuZ3Vlc3NlZENoYW1wLmN1cnJlbnRfYmF0dGxlID0gYGh0dHBzOi8vcGxheS5wb2tlbW9uc2hvd2Rvd24uY29tLyR7cm9vbXNbMF19YCBhcyBCYXR0bGVVUkw7XG4gICAgICAgICAgICAgICAgICAgIERvZ2Fyc0NsaWVudC5zZXRiYXR0bGUodGhpcy5pYS5ndWVzc2VkQ2hhbXAuY3VycmVudF9iYXR0bGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY291bnQubWVzc2FnZSh0aGlzLnJvb21uYW1lLCB0aGlzLmlhLmd1ZXNzZWRDaGFtcC5jdXJyZW50X2JhdHRsZSk7XG4gICAgICAgICAgICAgICAgICAgIG1vbml0b3IodGhpcy5pYS5ndWVzc2VkQ2hhbXAsIHRoaXMuYWNjb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHNub296ZSgxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGF3YWl0IHNub296ZSgxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZvbGxvdyBjaGFtcCBiZWNhdXNlYCwgdGhpcy5pYS5iYXR0bGVEYXRhLCBjaGFtcCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY2NvdW50LnRyeUxlYXZlKHRoaXMucm9vbW5hbWUpO1xuICAgIH1cbn0iXX0=