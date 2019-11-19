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
const specials = {
    'Butterfree': 'Butterfree Basher',
    'Charizard': 'Charizard Chipper',
    'Centiskorch': 'Centiskorch Stoker',
    'Volcarona': 'Volcarona Vitiater',
    'Moltres': 'Moltres Mutiler',
    'Darmanitan-Zen-Galar': 'Zen Monkey Mutilator',
    'Talonflame': 'Talonflame Trimmer',
    'Frosmoth': 'Frosmoth Fragmentor'
};
const pebbles = [
    'Aggressive Aggregate', 'Astucious Asphalt',
    'Buried Boulders',
    'Concealed Cobblestone', 'Covert Corundum',
    'Deceiving Deposit', 'Disguised Debris',
    'Elusive Elements',
    'Furtive Flint',
    'Guileful Granite',
    'Hidden Hornfels',
    'Insidious Iridium', 'Inconceivable Iron',
    'Keen Kryptonite',
    'Latent Lead', 'Lurking Limestone',
    'Merciless Minerals', 'Metaphorical Moth Balls',
    'Ninja Nuggets',
    'Obscure Ore',
    'Pernicious Pebbles',
    'Rusing Radium', 'Reclusive Rocks',
    'Sacrilegious Shards', 'Shrouded Sediment', 'Smogon Stones',
    'Terrorizing Tectinics', 'Tricky Terrain',
    'Veiled Variolite',
    'Zetetic Zircon'
];
//activates when "nice skill" happens 3 times in a row
let skillmessage = '👌😭 ahahah he did ìt again h0ly shit the💃AbIaZoLUTE💃MadMaN💃 IT JUST KEeps geeting FuNniER EVERy 🍆fucking🍑⏳TIme⌛ he flinches it haHAzhAHa 👌😭 📞 OPErATOR give mE The p👮Lice thEre’s a💃 MADmaN💃maKIN 🐸skill🐸 in oUr MIDsT and I CAN’T bREATHe 👌😨';
let mpebbles = [];
let shuffle = (arr) => {
    let currentIndex = arr.length, temporaryValue, randomIndex;
    while (currentIndex != 0) {
        randomIndex = ~~(Math.random() * currentIndex--);
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    return arr;
};
let greedmoves = ['Swords Dance', 'Dragon Dance',
    'Agility', 'Acupressure', 'Calm Mind', 'Iron Defense',
    'Shift Gear', 'Work Up', 'Bulk Up', 'Rock Polish',
    'Nasty Plot', 'Quiver Dance'];
class Announcer extends BasicHandler_1.default {
    constructor(ia) {
        super();
        this.warned = false;
        this.nummons = { p1: 0, p2: 0 };
        this.turnFlags = { currentTurn: 0 };
        this.battleFlags = {
            consecutiveSkill: 0,
            lastSkillTurn: 0,
        };
        this.ia = ia;
    }
    teamsize(ts) {
        return __awaiter(this, void 0, void 0, function* () {
            let s = +ts[2];
            if (s < 6) {
                this.account.message(this.roomname, `psh,., i only need ${s},,.kid... nothin personel,,..,`);
            }
            this.nummons[ts[1]] = s;
        });
    }
    inactive(i) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.warned)
                return;
            if (i[1].includes(this.ia.guessedChamp.showdown_name))
                return;
            if (i[1].includes('left'))
                return;
            this.warned = true;
            this.account.message(this.roomname, `wtf turn that off`);
        });
    }
    cant(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (c[2] == 'flinch' || c[2] == 'par') {
                if (c[2] == 'flinch' && this.turnFlags['fotarget'] && this.turnFlags['fotarget'] == c[1])
                    return;
                if (this.turnFlags['currentTurn'] == this.battleFlags.lastSkillTurn + 1) {
                    this.battleFlags.consecutiveSkill++;
                }
                else {
                    this.battleFlags.consecutiveSkill = 0;
                }
                this.battleFlags['lastSkillTurn'] = this.turnFlags['currentTurn'];
                this.account.message(this.roomname, this.battleFlags.consecutiveSkill < 3 ? `nice skill` : skillmessage);
            }
        });
    }
    move(m) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = m[1];
            let move = m[2];
            let target = m[3];
            if (greedmoves.includes(move)) {
                this.battleFlags['greeder'] = user;
                return;
            }
            if (user == this.battleFlags['greeder']) {
                delete this.battleFlags['greeder'];
            }
            if (m[3].includes('hoge') && m[4] && m[4] == '[miss]') {
                this.account.message(this.roomname, `HOGE! HOGE! H O G E!`);
            }
            else if (m[2] == 'Scald') {
                this.turnFlags['scalder'] = m[1];
            }
            else if (m[2] == 'Fake Out') {
                this.account.message(this.roomname, `FREE`);
                this.turnFlags['fotarget'] = m[3];
            }
            else if (m[2] == 'Baneful Bunker') {
                this.account.message(this.roomname, `Bane?`);
            }
            else if (m[2] == 'Lunar Dance' || m[2] == 'Memento') {
                this.account.message(this.roomname, `she was an hero to us all`);
            }
            else if ((m[2] == 'U-turn') || (m[2] == 'Volt Switch')) {
                if (Math.random() < 0.75)
                    this.account.message(this.roomname, `muh`);
                else if (Math.random() > 0.75 && Math.random() < .90)
                    this.account.message(this.roomname, `muh
		mentum`);
                else
                    this.account.message(this.roomname, 'Gotta have that MOMENTUM');
            }
            else if (m[2] == 'Stealth Rock') {
                if (mpebbles.length == 0)
                    mpebbles = shuffle(pebbles.slice());
                let p = mpebbles.splice(mpebbles.length - 1, 1)[0];
                let oppot = m[3].substr(0, 2);
                let c_or_v;
                if (!this.ia.battlers[oppot])
                    return;
                if ((c_or_v = this.ia.battlers[oppot].team.find(mon => Object.keys(specials).includes(mon.species))))
                    p = specials[c_or_v.species];
                let mon = m[1].substr(5);
                if (Math.random() < 0.125)
                    this.account.message(this.roomname, `あいての ${mon}の **「${p}」**!`);
                else if (Math.random() > .85)
                    this.account.message(this.roomname, `${mon} got rocks up, gg`);
                else
                    this.account.message(this.roomname, `The opposing ${mon} used **${p}**!`);
            }
        });
    }
    "-status"(s) {
        return __awaiter(this, void 0, void 0, function* () {
            if (s[2] == 'brn' && this.turnFlags['scalder'] && this.turnFlags['scalder'] != s[1]) {
                if (s[3] !== undefined && s[3].includes('[from] item'))
                    return;
                this.account.message(this.roomname, `le hot water of skill claims another`);
            }
            if (s[2] == 'frz') {
                this.account.message(this.roomname, `Am I glad he's frozen in there and that we're out here, and that he's the sheriff, 
			and that we're frozen out here, and that we're in there, and I just remembered, we're out here. 
			What I wanna know is, where's the caveman?`);
            }
        });
    }
    "switch"(s) {
        return __awaiter(this, void 0, void 0, function* () {
            delete this.battleFlags['greeder'];
        });
    }
    turn(t) {
        return __awaiter(this, void 0, void 0, function* () {
            this.turnFlags = { currentTurn: +t[1] };
        });
    }
    "-crit"(c) {
        return __awaiter(this, void 0, void 0, function* () {
            this.turnFlags['critted'] = c[1];
        });
    }
    "faint"(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.battleFlags['greeder'] == c[1])
                this.account.message(this.roomname, 'nice greed, nerd');
            if (this.turnFlags['critted'] == c[1]) {
                this.account.message(this.roomname, 'crit mattered');
            }
            let pl = c[1].substr(0, 2);
            this.nummons[pl]--;
        });
    }
    '-message'() {
        return __awaiter(this, void 0, void 0, function* () {
            this.turnFlags['ff'] = true;
        });
    }
    win(w) {
        const _super = Object.create(null, {
            win: { get: () => super.win }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.win.call(this, w);
            if (this.turnFlags['ff']) {
                this.account.message(this.roomname, 'bullied');
                return;
            }
            if (Math.random() < 0.41)
                return;
            let diff = this.nummons.p1 - this.nummons.p2;
            diff = diff < 0 ? -diff : diff;
            let mes = [
                'wtf',
                'that was close',
                'bg',
                'bg',
                'bg',
                'no 6-0 bg',
                '6-0 bg hacker'
            ];
            if (w[1].includes(this.ia.guessedChamp.showdown_name))
                this.account.message(this.roomname, 'ez win gg ' + this.ia.guessedChamp.showdown_name);
            else
                this.account.message(this.roomname, mes[diff]);
        });
    }
}
exports.default = Announcer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3VuY2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1Nob3dkb3duL0JhdHRsZUhhbmRsZXJzL0Fubm91bmNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQTBDO0FBSzFDLE1BQU0sUUFBUSxHQUFHO0lBQ2hCLFlBQVksRUFBRSxtQkFBbUI7SUFDOUIsV0FBVyxFQUFFLG1CQUFtQjtJQUNuQyxhQUFhLEVBQUUsb0JBQW9CO0lBQ2hDLFdBQVcsRUFBRSxvQkFBb0I7SUFDakMsU0FBUyxFQUFFLGlCQUFpQjtJQUMvQixzQkFBc0IsRUFBRSxzQkFBc0I7SUFDM0MsWUFBWSxFQUFFLG9CQUFvQjtJQUNyQyxVQUFVLEVBQUUscUJBQXFCO0NBQ2pDLENBQUE7QUFFRCxNQUFNLE9BQU8sR0FBRztJQUNaLHNCQUFzQixFQUFFLG1CQUFtQjtJQUMzQyxpQkFBaUI7SUFDakIsdUJBQXVCLEVBQUUsaUJBQWlCO0lBQzFDLG1CQUFtQixFQUFFLGtCQUFrQjtJQUN2QyxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsbUJBQW1CLEVBQUUsb0JBQW9CO0lBQ3pDLGlCQUFpQjtJQUNqQixhQUFhLEVBQUUsbUJBQW1CO0lBQ2xDLG9CQUFvQixFQUFFLHlCQUF5QjtJQUMvQyxlQUFlO0lBQ2YsYUFBYTtJQUNiLG9CQUFvQjtJQUNwQixlQUFlLEVBQUUsaUJBQWlCO0lBQ2xDLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLGVBQWU7SUFDM0QsdUJBQXVCLEVBQUUsZ0JBQWdCO0lBQ3pDLGtCQUFrQjtJQUNsQixnQkFBZ0I7Q0FDbkIsQ0FBQztBQUVGLHNEQUFzRDtBQUN0RCxJQUFJLFlBQVksR0FBRywrUEFBK1AsQ0FBQTtBQUVsUixJQUFJLFFBQVEsR0FBYSxFQUFFLENBQUM7QUFFNUIsSUFBSSxPQUFPLEdBQUcsQ0FBSSxHQUFhLEVBQUUsRUFBRTtJQUMvQixJQUFJ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Q0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDL0MsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSTtnQkFDcEIsT0FBTztZQUNYLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzdDLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQy9CLElBQUksR0FBRyxHQUFHO2dCQUNOLEtBQUs7Z0JBQ0wsZ0JBQWdCO2dCQUNoQixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixXQUFXO2dCQUNYLGVBQWU7YUFDbEIsQ0FBQztZQUNGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztnQkFFdkYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDO0tBQUE7Q0FDSjtBQTVLRCw0QkE0S0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzaWNIYW5kbGVyIGZyb20gXCIuL0Jhc2ljSGFuZGxlclwiO1xuaW1wb3J0IHsgQmF0dGxlRXZlbnRzLCBQb2tlbW9uSWRlbnQgfSBmcm9tIFwiLi4vUFNNZXNzYWdlXCI7XG5pbXBvcnQgSW5mb0FnZ3JlZ2F0b3IgZnJvbSBcIi4vSW5mb0FnZ3JlZ2F0b3JcIjtcbmltcG9ydCB7IE1lbWVTdGF0cyB9IGZyb20gXCIuLi9CYXR0bGVEYXRhXCI7XG5cbmNvbnN0IHNwZWNpYWxzID0geyAvL2lmIHNlZW4gb24gb3RoZXIgdGVhbSwgd2lsbCBhY3RpdmF0ZSB1cG9uIHJveFxuXHQnQnV0dGVyZnJlZSc6ICdCdXR0ZXJmcmVlIEJhc2hlcicsXG4gICAgJ0NoYXJpemFyZCc6ICdDaGFyaXphcmQgQ2hpcHBlcicsXG5cdCdDZW50aXNrb3JjaCc6ICdDZW50aXNrb3JjaCBTdG9rZXInLFxuICAgICdWb2xjYXJvbmEnOiAnVm9sY2Fyb25hIFZpdGlhdGVyJyxcbiAgICAnTW9sdHJlcyc6ICdNb2x0cmVzIE11dGlsZXInLFxuXHQnRGFybWFuaXRhbi1aZW4tR2FsYXInOiAnWmVuIE1vbmtleSBNdXRpbGF0b3InLFxuICAgICdUYWxvbmZsYW1lJzogJ1RhbG9uZmxhbWUgVHJpbW1lcicsXG5cdCdGcm9zbW90aCc6ICdGcm9zbW90aCBGcmFnbWVudG9yJ1xufVxuXG5jb25zdCBwZWJibGVzID0gW1xuICAgICdBZ2dyZXNzaXZlIEFnZ3JlZ2F0ZScsICdBc3R1Y2lvdXMgQXNwaGFsdCcsXG4gICAgJ0J1cmllZCBCb3VsZGVycycsXG4gICAgJ0NvbmNlYWxlZCBDb2JibGVzdG9uZScsICdDb3ZlcnQgQ29ydW5kdW0nLFxuICAgICdEZWNlaXZpbmcgRGVwb3NpdCcsICdEaXNndWlzZWQgRGVicmlzJyxcbiAgICAnRWx1c2l2ZSBFbGVtZW50cycsXG4gICAgJ0Z1cnRpdmUgRmxpbnQnLFxuICAgICdHdWlsZWZ1bCBHcmFuaXRlJyxcbiAgICAnSGlkZGVuIEhvcm5mZWxzJyxcbiAgICAnSW5zaWRpb3VzIElyaWRpdW0nLCAnSW5jb25jZWl2YWJsZSBJcm9uJyxcbiAgICAnS2VlbiBLcnlwdG9uaXRlJyxcbiAgICAnTGF0ZW50IExlYWQnLCAnTHVya2luZyBMaW1lc3RvbmUnLFxuICAgICdNZXJjaWxlc3MgTWluZXJhbHMnLCAnTWV0YXBob3JpY2FsIE1vdGggQmFsbHMnLFxuICAgICdOaW5qYSBOdWdnZXRzJyxcbiAgICAnT2JzY3VyZSBPcmUnLFxuICAgICdQZXJuaWNpb3VzIFBlYmJsZXMnLFxuICAgICdSdXNpbmcgUmFkaXVtJywgJ1JlY2x1c2l2ZSBSb2NrcycsXG4gICAgJ1NhY3JpbGVnaW91cyBTaGFyZHMnLCAnU2hyb3VkZWQgU2VkaW1lbnQnLCAnU21vZ29uIFN0b25lcycsXG4gICAgJ1RlcnJvcml6aW5nIFRlY3RpbmljcycsICdUcmlja3kgVGVycmFpbicsXG4gICAgJ1ZlaWxlZCBWYXJpb2xpdGUnLFxuICAgICdaZXRldGljIFppcmNvbidcbl07XG5cbi8vYWN0aXZhdGVzIHdoZW4gXCJuaWNlIHNraWxsXCIgaGFwcGVucyAzIHRpbWVzIGluIGEgcm93XG5sZXQgc2tpbGxtZXNzYWdlID0gJ/CfkYzwn5itIGFoYWhhaCBoZSBkaWQgw6x0IGFnYWluIGgwbHkgc2hpdCB0aGXwn5KDQWJJYVpvTFVURfCfkoNNYWRNYU7wn5KDIElUIEpVU1QgS0VlcHMgZ2VldGluZyBGdU5uaUVSIEVWRVJ5IPCfjYZmdWNraW5n8J+NkeKPs1RJbWXijJsgaGUgZmxpbmNoZXMgaXQgaGFIQXpoQUhhIPCfkYzwn5itIPCfk54gT1BFckFUT1IgZ2l2ZSBtRSBUaGUgcPCfka5MaWNlIHRoRXJl4oCZcyBh8J+SgyBNQURtYU7wn5KDbWFLSU4g8J+QuHNraWxs8J+QuCBpbiBvVXIgTUlEc1QgYW5kIEkgQ0FO4oCZVCBiUkVBVEhlIPCfkYzwn5ioJ1xuXG5sZXQgbXBlYmJsZXM6IHN0cmluZ1tdID0gW107XG5cbmxldCBzaHVmZmxlID0gPFQ+KGFycjogQXJyYXk8VD4pID0+IHtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gYXJyLmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuICAgIHdoaWxlIChjdXJyZW50SW5kZXggIT0gMCkge1xuICAgICAgICByYW5kb21JbmRleCA9IH5+KE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgtLSk7XG4gICAgICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyW2N1cnJlbnRJbmRleF07XG4gICAgICAgIGFycltjdXJyZW50SW5kZXhdID0gYXJyW3JhbmRvbUluZGV4XTtcbiAgICAgICAgYXJyW3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xufVxuXG5sZXQgZ3JlZWRtb3ZlcyA9IFsnU3dvcmRzIERhbmNlJywgJ0RyYWdvbiBEYW5jZScsXG4gICAgJ0FnaWxpdHknLCAnQWN1cHJlc3N1cmUnLCAnQ2FsbSBNaW5kJywgJ0lyb24gRGVmZW5zZScsXG4gICAgJ1NoaWZ0IEdlYXInLCAnV29yayBVcCcsICdCdWxrIFVwJywgJ1JvY2sgUG9saXNoJyxcbiAgICAnTmFzdHkgUGxvdCcsICdRdWl2ZXIgRGFuY2UnXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbm5vdW5jZXIgZXh0ZW5kcyBCYXNpY0hhbmRsZXIge1xuICAgIHByaXZhdGUgd2FybmVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaWE6IEluZm9BZ2dyZWdhdG9yO1xuXG4gICAgY29uc3RydWN0b3IoaWE6IEluZm9BZ2dyZWdhdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaWEgPSBpYTtcbiAgICB9XG5cbiAgICBudW1tb25zOiB7IHAxOiBudW1iZXIsIHAyOiBudW1iZXIgfSA9IHsgcDE6IDAsIHAyOiAwIH07XG4gICAgYXN5bmMgdGVhbXNpemUodHM6IEJhdHRsZUV2ZW50c1sndGVhbXNpemUnXSkge1xuICAgICAgICBsZXQgczogbnVtYmVyID0gK3RzWzJdO1xuICAgICAgICBpZiAocyA8IDYpIHtcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudC5tZXNzYWdlKHRoaXMucm9vbW5hbWUsIGBwc2gsLiwgaSBvbmx5IG5lZWQgJHtzfSwsLmtpZC4uLiBub3RoaW4gcGVyc29uZWwsLC4uLGApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtbW9uc1t0c1sxXSBhcyAncDEnIHwgJ3AyJ10gPSBzO1xuICAgIH1cblxuICAgIGFzeW5jIGluYWN0aXZlKGk6IEJhdHRsZUV2ZW50c1snaW5hY3RpdmUnXSkge1xuICAgICAgICBpZiAodGhpcy53YXJuZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChpWzFdLmluY2x1ZGVzKHRoaXMuaWEuZ3Vlc3NlZENoYW1wLnNob3dkb3duX25hbWUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoaVsxXS5pbmNsdWRlcygnbGVmdCcpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLndhcm5lZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYWNjb3VudC5tZXNzYWdlKHRoaXMucm9vbW5hbWUsIGB3dGYgdHVybiB0aGF0IG9mZmApO1xuICAgIH1cblxuICAgIGFzeW5jIGNhbnQoYzogQmF0dGxlRXZlbnRzWydjYW50J10pIHtcbiAgICAgICAgaWYgKGNbMl0gPT0gJ2ZsaW5jaCcgfHwgY1syXSA9PSAncGFyJykge1xuICAgICAgICAgICAgaWYgKGNbMl0gPT0gJ2ZsaW5jaCcgJiYgdGhpcy50dXJuRmxhZ3NbJ2ZvdGFyZ2V0J10gJiYgdGhpcy50dXJuRmxhZ3NbJ2ZvdGFyZ2V0J10gPT0gY1sxXSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAodGhpcy50dXJuRmxhZ3NbJ2N1cnJlbnRUdXJuJ10gPT0gdGhpcy5iYXR0bGVGbGFncy5sYXN0U2tpbGxUdXJuICsgMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlRmxhZ3MuY29uc2VjdXRpdmVTa2lsbCsrO1xuICAgICAgICAgICAgfVxuXHRcdFx0ZWxzZSB7dGhpcy5iYXR0bGVGbGFncy5jb25zZWN1dGl2ZVNraWxsID0gMDt9XG4gICAgICAgICAgICB0aGlzLmJhdHRsZUZsYWdzWydsYXN0U2tpbGxUdXJuJ10gPSB0aGlzLnR1cm5GbGFnc1snY3VycmVudFR1cm4nXTtcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudC5tZXNzYWdlKHRoaXMucm9vbW5hbWUsIHRoaXMuYmF0dGxlRmxhZ3MuY29uc2VjdXRpdmVTa2lsbCA8IDMgPyBgbmljZSBza2lsbGAgOiBza2lsbG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbW92ZShtOiBCYXR0bGVFdmVudHNbJ21vdmUnXSkgeyAvL3VzZXIgMSBtb3ZlIDIgdGFyZ2V0IDNcbiAgICAgICAgbGV0IHVzZXIgPSBtWzFdO1xuICAgICAgICBsZXQgbW92ZSA9IG1bMl07XG4gICAgICAgIGxldCB0YXJnZXQgPSBtWzNdO1xuXG4gICAgICAgIGlmIChncmVlZG1vdmVzLmluY2x1ZGVzKG1vdmUpKSB7XG4gICAgICAgICAgICB0aGlzLmJhdHRsZUZsYWdzWydncmVlZGVyJ10gPSB1c2VyO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VyID09IHRoaXMuYmF0dGxlRmxhZ3NbJ2dyZWVkZXInXSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYmF0dGxlRmxhZ3NbJ2dyZWVkZXInXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobVszXS5pbmNsdWRlcygnaG9nZScpICYmIG1bNF0gJiYgbVs0XSA9PSAnW21pc3NdJykge1xuICAgICAgICAgICAgdGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgYEhPR0UhIEhPR0UhIEggTyBHIEUhYCk7XG4gICAgICAgIH0gZWxzZSBpZiAobVsyXSA9PSAnU2NhbGQnKSB7XG4gICAgICAgICAgICB0aGlzLnR1cm5GbGFnc1snc2NhbGRlciddID0gbVsxXTtcbiAgICAgICAgfSBlbHNlIGlmIChtWzJdID09ICdGYWtlIE91dCcpIHtcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudC5tZXNzYWdlKHRoaXMucm9vbW5hbWUsIGBGUkVFYCk7XG4gICAgICAgICAgICB0aGlzLnR1cm5GbGFnc1snZm90YXJnZXQnXSA9IG1bM107XG4gICAgICAgIH0gZWxzZSBpZiAobVsyXSA9PSAnQmFuZWZ1bCBCdW5rZXInKSB7XG4gICAgICAgICAgICB0aGlzLmFjY291bnQubWVzc2FnZSh0aGlzLnJvb21uYW1lLCBgQmFuZT9gKTtcbiAgICAgICAgfWVsc2UgaWYgKG1bMl0gPT0gJ0x1bmFyIERhbmNlJyB8fCBtWzJdID09ICdNZW1lbnRvJykge1xuICAgICAgICAgICAgdGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgYHNoZSB3YXMgYW4gaGVybyB0byB1cyBhbGxgKTtcbiAgICAgICAgfVx0XHRlbHNlIGlmICgobVsyXSA9PSAnVS10dXJuJykgfHwgKG1bMl0gPT0gJ1ZvbHQgU3dpdGNoJykpIHtcblx0XHRcdGlmIChNYXRoLnJhbmRvbSgpIDwgMC43NSlcblx0XHRcdFx0dGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgYG11aGApO1xuXHRcdFx0ZWxzZSBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNzUgJiYgTWF0aC5yYW5kb20oKSA8IC45MClcdFxuICAgICAgICAgICAgdGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgYG11aFxuXHRcdG1lbnR1bWApO1xuXHRcdFx0ZWxzZVxuXHRcdFx0dGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgJ0dvdHRhIGhhdmUgdGhhdCBNT01FTlRVTScpO1xuICAgICAgICB9IGVsc2UgaWYgKG1bMl0gPT0gJ1N0ZWFsdGggUm9jaycpIHtcbiAgICAgICAgICAgIGlmIChtcGViYmxlcy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgICAgICBtcGViYmxlcyA9IHNodWZmbGUocGViYmxlcy5zbGljZSgpKTtcbiAgICAgICAgICAgIGxldCBwID0gbXBlYmJsZXMuc3BsaWNlKG1wZWJibGVzLmxlbmd0aCAtIDEsIDEpWzBdO1xuICAgICAgICAgICAgbGV0IG9wcG90ID0gbVszXS5zdWJzdHIoMCwgMikgYXMgJ3AxJyB8ICdwMic7XG4gICAgICAgICAgICBsZXQgY19vcl92OiBNZW1lU3RhdHMgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaWEuYmF0dGxlcnNbb3Bwb3RdKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmICgoY19vcl92ID0gdGhpcy5pYS5iYXR0bGVyc1tvcHBvdF0udGVhbS5maW5kKG1vbiA9PiBPYmplY3Qua2V5cyhzcGVjaWFscykuaW5jbHVkZXMobW9uLnNwZWNpZXMpKSkpXG4gICAgICAgICAgICAgICAgcCA9IHNwZWNpYWxzW2Nfb3Jfdi5zcGVjaWVzIGFzIGtleW9mIHR5cGVvZiBzcGVjaWFsc107XG4gICAgICAgICAgICBsZXQgbW9uID0gbVsxXS5zdWJzdHIoNSk7XG4gICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMTI1KVxuICAgICAgICAgICAgICAgIHRoaXMuYWNjb3VudC5tZXNzYWdlKHRoaXMucm9vbW5hbWUsIGDjgYLjgYTjgabjga4gJHttb25944GuICoq44CMJHtwfeOAjSoqIWApO1xuXHRcdFx0ZWxzZSBpZiAoTWF0aC5yYW5kb20oKSA+IC44NSlcblx0XHRcdFx0dGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgYCR7bW9ufSBnb3Qgcm9ja3MgdXAsIGdnYCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgYFRoZSBvcHBvc2luZyAke21vbn0gdXNlZCAqKiR7cH0qKiFgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIFwiLXN0YXR1c1wiKHM6IEJhdHRsZUV2ZW50c1snLXN0YXR1cyddKSB7XG4gICAgICAgIGlmIChzWzJdID09ICdicm4nICYmIHRoaXMudHVybkZsYWdzWydzY2FsZGVyJ10gJiYgdGhpcy50dXJuRmxhZ3NbJ3NjYWxkZXInXSAhPSBzWzFdKSB7XG4gICAgICAgICAgICBpZiAoc1szXSAhPT0gdW5kZWZpbmVkICYmIHNbM10hLmluY2x1ZGVzKCdbZnJvbV0gaXRlbScpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudC5tZXNzYWdlKHRoaXMucm9vbW5hbWUsIGBsZSBob3Qgd2F0ZXIgb2Ygc2tpbGwgY2xhaW1zIGFub3RoZXJgKTtcbiAgICAgICAgfVxuXHRcdGlmIChzWzJdID09ICdmcnonKXtcblx0XHRcdHRoaXMuYWNjb3VudC5tZXNzYWdlKHRoaXMucm9vbW5hbWUsYEFtIEkgZ2xhZCBoZSdzIGZyb3plbiBpbiB0aGVyZSBhbmQgdGhhdCB3ZSdyZSBvdXQgaGVyZSwgYW5kIHRoYXQgaGUncyB0aGUgc2hlcmlmZiwgXG5cdFx0XHRhbmQgdGhhdCB3ZSdyZSBmcm96ZW4gb3V0IGhlcmUsIGFuZCB0aGF0IHdlJ3JlIGluIHRoZXJlLCBhbmQgSSBqdXN0IHJlbWVtYmVyZWQsIHdlJ3JlIG91dCBoZXJlLiBcblx0XHRcdFdoYXQgSSB3YW5uYSBrbm93IGlzLCB3aGVyZSdzIHRoZSBjYXZlbWFuP2ApO1xuXHRcdH1cbiAgICB9XG5cbiAgICBhc3luYyBcInN3aXRjaFwiKHM6IEJhdHRsZUV2ZW50c1snc3dpdGNoJ10pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuYmF0dGxlRmxhZ3NbJ2dyZWVkZXInXTtcbiAgICB9XG5cbiAgICB0dXJuRmxhZ3M6IHtcbiAgICAgICAgc2NhbGRlcj86IFBva2Vtb25JZGVudDtcbiAgICAgICAgZm90YXJnZXQ/OiBQb2tlbW9uSWRlbnQ7XG4gICAgICAgIGN1cnJlbnRUdXJuOiBudW1iZXI7XG4gICAgICAgIGZmPzogYm9vbGVhbjtcbiAgICAgICAgY3JpdHRlZD86IFBva2Vtb25JZGVudDtcbiAgICB9ID0geyBjdXJyZW50VHVybjogMCB9O1xuICAgIGJhdHRsZUZsYWdzOiB7XG4gICAgICAgIGNvbnNlY3V0aXZlU2tpbGw6IG51bWJlcjtcbiAgICAgICAgbGFzdFNraWxsVHVybjogbnVtYmVyO1xuICAgICAgICBncmVlZGVyPzogUG9rZW1vbklkZW50O1xuICAgIH0gPSB7XG4gICAgICAgICAgICBjb25zZWN1dGl2ZVNraWxsOiAwLFxuICAgICAgICAgICAgbGFzdFNraWxsVHVybjogMCxcbiAgICAgICAgfTtcblxuICAgIGFzeW5jIHR1cm4odDogQmF0dGxlRXZlbnRzWyd0dXJuJ10pIHtcbiAgICAgICAgdGhpcy50dXJuRmxhZ3MgPSB7IGN1cnJlbnRUdXJuOiArdFsxXSB9O1xuICAgIH1cblxuICAgIGFzeW5jIFwiLWNyaXRcIihjOiBCYXR0bGVFdmVudHNbJy1jcml0J10pIHtcbiAgICAgICAgdGhpcy50dXJuRmxhZ3NbJ2NyaXR0ZWQnXSA9IGNbMV07XG4gICAgfVxuXG4gICAgYXN5bmMgXCJmYWludFwiKGM6IEJhdHRsZUV2ZW50c1snZmFpbnQnXSkge1xuICAgICAgICBpZiAodGhpcy5iYXR0bGVGbGFnc1snZ3JlZWRlciddID09IGNbMV0pXG4gICAgICAgICAgICB0aGlzLmFjY291bnQubWVzc2FnZSh0aGlzLnJvb21uYW1lLCAnbmljZSBncmVlZCwgbmVyZCcpO1xuICAgICAgICBpZiAodGhpcy50dXJuRmxhZ3NbJ2NyaXR0ZWQnXSA9PSBjWzFdKSB7XG4gICAgICAgICAgICB0aGlzLmFjY291bnQubWVzc2FnZSh0aGlzLnJvb21uYW1lLCAnY3JpdCBtYXR0ZXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwbCA9IGNbMV0uc3Vic3RyKDAsIDIpIGFzICdwMScgfCAncDInO1xuICAgICAgICB0aGlzLm51bW1vbnNbcGxdLS07XG4gICAgfVxuXG4gICAgYXN5bmMgJy1tZXNzYWdlJygpIHtcbiAgICAgICAgdGhpcy50dXJuRmxhZ3NbJ2ZmJ10gPSB0cnVlO1xuICAgIH1cblxuICAgIGFzeW5jIHdpbih3OiBCYXR0bGVFdmVudHNbJ3dpbiddKSB7XG4gICAgICAgIHN1cGVyLndpbih3KTtcbiAgICAgICAgaWYgKHRoaXMudHVybkZsYWdzWydmZiddKSB7XG4gICAgICAgICAgICB0aGlzLmFjY291bnQubWVzc2FnZSh0aGlzLnJvb21uYW1lLCAnYnVsbGllZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC40MSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IGRpZmYgPSB0aGlzLm51bW1vbnMucDEgLSB0aGlzLm51bW1vbnMucDI7XG4gICAgICAgIGRpZmYgPSBkaWZmIDwgMCA/IC1kaWZmIDogZGlmZjtcbiAgICAgICAgbGV0IG1lcyA9IFtcbiAgICAgICAgICAgICd3dGYnLFxuICAgICAgICAgICAgJ3RoYXQgd2FzIGNsb3NlJyxcbiAgICAgICAgICAgICdiZycsXG4gICAgICAgICAgICAnYmcnLFxuICAgICAgICAgICAgJ2JnJyxcbiAgICAgICAgICAgICdubyA2LTAgYmcnLFxuICAgICAgICAgICAgJzYtMCBiZyBoYWNrZXInXG4gICAgICAgIF07XG4gICAgICAgIGlmICh3WzFdLmluY2x1ZGVzKHRoaXMuaWEuZ3Vlc3NlZENoYW1wLnNob3dkb3duX25hbWUpKVxuICAgICAgICAgICAgdGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgJ2V6IHdpbiBnZyAnICsgdGhpcy5pYS5ndWVzc2VkQ2hhbXAuc2hvd2Rvd25fbmFtZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudC5tZXNzYWdlKHRoaXMucm9vbW5hbWUsIG1lc1tkaWZmXSk7XG4gICAgfVxufVxuIl19