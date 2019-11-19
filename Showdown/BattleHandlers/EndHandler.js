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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5kSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TaG93ZG93bi9CYXR0bGVIYW5kbGVycy9FbmRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpREFBMEM7QUFFMUMsK0NBQTZDO0FBQzdDLDRDQUF3RTtBQUV4RSxzREFBK0Q7QUFFL0QscURBQWtEO0FBQ2xELG1EQUE0QztBQUU1QyxNQUFxQixVQUFXLFNBQVEsc0JBQVk7SUFHMUMsUUFBUSxDQUFDLEVBQWlCLEVBQUUsTUFBa0I7Ozs7O1lBQ2hELE9BQU0sUUFBUSxZQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztLQUFBO0lBRUQsWUFBWSxFQUFrQjtRQUMxQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFSyxHQUFHLENBQUMsQ0FBc0I7Ozs7O1lBQzVCLE9BQU0sR0FBRyxZQUFDLENBQUMsRUFBRTtZQUNiLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUM7Z0JBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7b0JBQ3pCLElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSx5QkFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7b0JBQzVGLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUUsVUFBVTt3QkFDaEMsTUFBTTtvQkFDVixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7eUJBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxpQ0FBaUM7eUJBQzlELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0I7eUJBQ3hDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxlQUFlO29CQUNwRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO3dCQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsb0NBQW9DLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBZSxDQUFDO3dCQUNsRywyQkFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDekUscUJBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzVDLE1BQU0sY0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNuQixNQUFNO3FCQUNUO29CQUNELE1BQU0sY0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN0QjtpQkFDQTtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLGdCQUFLLENBQUMsQ0FBQzthQUN6RTtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QyxDQUFDO0tBQUE7Q0FDSjtBQXZDRCw2QkF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzaWNIYW5kbGVyIGZyb20gXCIuL0Jhc2ljSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBCYXR0bGVNb25pdG9yIH0gZnJvbSBcIi4uL0JhdHRsZU1vbml0b3JcIjtcclxuaW1wb3J0IHsgc25vb3plIH0gZnJvbSBcIi4uLy4uL1dlYnNpdGUvdXRpbHNcIjtcclxuaW1wb3J0IHsgUFNVc2VyRGV0YWlscywgVXNlckRldGFpbHMsIEJhdHRsZUV2ZW50cyB9IGZyb20gXCIuLi9QU01lc3NhZ2VcIjtcclxuaW1wb3J0IEluZm9BZ2dyZWdhdG9yIGZyb20gXCIuL0luZm9BZ2dyZWdhdG9yXCI7XHJcbmltcG9ydCB7IG1vbml0b3JQbGF5ZXIsIGNoYW1wIH0gZnJvbSBcIi4uLy4uL1Nob2VkcmlwL3Nob2VkcmlwXCI7XHJcbmltcG9ydCB7IEJhdHRsZVVSTCB9IGZyb20gXCIuLi8uLi9CYWNrZW5kL0NyaW5nZUNvbXBpbGF0aW9uXCI7XHJcbmltcG9ydCB7IERvZ2Fyc0NsaWVudCB9IGZyb20gXCIuLi8uLi9Eb2dhcnNDbGllbnRcIjtcclxuaW1wb3J0IHsgbW9uaXRvciB9IGZyb20gXCIuLi8uLi9kb2dhcnMtY2hhblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5kSGFuZGxlciBleHRlbmRzIEJhc2ljSGFuZGxlciB7XHJcbiAgICBibSE6IEJhdHRsZU1vbml0b3I7XHJcbiAgICBpYTogSW5mb0FnZ3JlZ2F0b3I7XHJcbiAgICBhc3luYyBhdHRhY2hlZChibTogQmF0dGxlTW9uaXRvciwgZGV0YWNoOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgc3VwZXIuYXR0YWNoZWQoYm0sIGRldGFjaCk7XHJcbiAgICAgICAgdGhpcy5ibSA9IGJtO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlhOiBJbmZvQWdncmVnYXRvcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pYSA9IGlhO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHdpbih3OiBCYXR0bGVFdmVudHNbJ3dpbiddKSB7XHJcbiAgICAgICAgc3VwZXIud2luKHcpO1xyXG4gICAgICAgIGlmICh0aGlzLmlhLmJhdHRsZURhdGEuZGlzdCA9PSAwKVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ1OyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gYXdhaXQgdGhpcy5hY2NvdW50LnJlcXVlc3QobmV3IFBTVXNlckRldGFpbHModGhpcy5pYS5ndWVzc2VkQ2hhbXAuc2hvd2Rvd25fbmFtZSkpXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5yb29tcyA9PT0gZmFsc2UpIC8vIG9mZmxpbmVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGxldCByb29tcyA9IE9iamVjdC5rZXlzKGRhdGEucm9vbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihuID0+IG4uaW5jbHVkZXMoJ+KYhicpKSAvLyBkbyBub3QgZm9sbG93IHJvb21zL3NwZWN0YXRpbmdcclxuICAgICAgICAgICAgICAgICAgICAubWFwKG4gPT4gbi5zdWJzdHIoMSkpIC8vIHJlbW92ZSB0aGUgc3RhclxyXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIobiA9PiBuID4gdGhpcy5yb29tbmFtZSk7IC8vIG5ld2VzdCByb29tc1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvb21zLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pYS5ndWVzc2VkQ2hhbXAuY3VycmVudF9iYXR0bGUgPSBgaHR0cHM6Ly9wbGF5LnBva2Vtb25zaG93ZG93bi5jb20vJHtyb29tc1swXX1gIGFzIEJhdHRsZVVSTDtcclxuICAgICAgICAgICAgICAgICAgICBEb2dhcnNDbGllbnQuc2V0YmF0dGxlKHRoaXMuaWEuZ3Vlc3NlZENoYW1wLmN1cnJlbnRfYmF0dGxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY291bnQubWVzc2FnZSh0aGlzLnJvb21uYW1lLCB0aGlzLmlhLmd1ZXNzZWRDaGFtcC5jdXJyZW50X2JhdHRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uaXRvcih0aGlzLmlhLmd1ZXNzZWRDaGFtcCwgdGhpcy5hY2NvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzbm9vemUoMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBzbm9vemUoMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmb2xsb3cgY2hhbXAgYmVjYXVzZWAsIHRoaXMuaWEuYmF0dGxlRGF0YSwgY2hhbXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFjY291bnQudHJ5TGVhdmUodGhpcy5yb29tbmFtZSk7XHJcbiAgICB9XHJcbn0iXX0=