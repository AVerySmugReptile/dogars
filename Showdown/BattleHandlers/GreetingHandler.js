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
const fs = require("fs");
const settings_1 = require("../../Backend/settings");
const fsp = fs.promises;
let banlist = [
    'ctrl',
    'close',
    'alt',
    'f4',
    'f5',
    'forfeit',
    'kill',
    'pedo',
    'hentai',
    'dogars'
];
let freeforms = [
    'hotpockets',
    'doritos',
    'mtndew',
    'anime',
    'kiddiddler',
    'furfag',
    'npc',
    'fatty',
    'powertrip',
    'garbage',
    'trash'
];
class GreetingHandler extends BasicHandler_1.default {
    constructor() {
        super(...arguments);
        this.hi = [];
        this.bantered = false;
        this.bantering = false;
    }
    banter() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.bantered || this.bantering)
                return;
            this.bantering = true;
            //this.account.message(this.roomname, `>he does it for free!`);
            this.account.message(this.roomname, `"we pay to be mods" - DaWoblefet 2019`);
            let pastab = yield fsp.readFile(settings_1.settings.ressources + '/pasta.txt');
            let pasta = pastab.toString().split('\n');
            try {
                try {
                    for (let line of pasta) {
                        if (line != '') // empty lines are used for timings
                            this.account.message(this.roomname, line);
                        yield utils_1.snooze(1000);
                    }
                    this.bantered = true;
                }
                catch (e) {
                    throw e;
                }
            }
            catch (e) {
                console.log('Proxy shitted itself, trying another');
                this.bantering = false;
                this.bantered = false;
                this.banter();
            }
        });
    }
    /*
    > X joins
    > "Hi X!"
    */
    j(mes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hi.includes(mes[1]) &&
                (mes[1].toLowerCase().substr(1) == 'roxle'
                    //||  mes[1].toLowerCase().substr(1) == 'thelordofsmug'
                    || mes[1].toLowerCase().substr(1) == 'boo!xle')) {
                this.account.message(this.roomname, `Hi ${mes[1]} ❤️!`);
                this.hi.push(mes[1]);
            }
            /*if (!this.hi.includes(mes[1]) &&
                ( mes[1].toLowerCase().substr(1) == 'thelordofsmug')) {
                this.account.message(this.roomname, `Greetings, father.`);
                this.hi.push(mes[1]);}*/
            if ('%@'.includes(mes[1][0])) {
                this.banter();
            }
        });
    }
    c(m) {
        return __awaiter(this, void 0, void 0, function* () {
            let norm = m[2].toLowerCase();
            if (banlist.find(w => m[1].includes(w)))
                return;
            //.toLowerCase() ensures it doesn't read JUST lc-only names 
            if (!norm.includes(`Hi $(Galariandogars).toLowerCase()`) &&
                !norm.includes(`hi $(Galariandogars).toLowerCase()`))
                return;
            if (this.hi.includes(m[1]))
                return;
            this.hi.push(m[1]);
            this.account.message(this.roomname, `Hi ${m[1]}!`);
        });
    }
}
exports.default = GreetingHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JlZXRpbmdIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1Nob3dkb3duL0JhdHRsZUhhbmRsZXJzL0dyZWV0aW5nSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQTBDO0FBRTFDLCtDQUE2QztBQUM3Qyx5QkFBMEI7QUFDMUIscURBQWtEO0FBQ2xELE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7QUFFeEIsSUFBSSxPQUFPLEdBQUc7SUFDYixNQUFNO0lBQ04sT0FBTztJQUNQLEtBQUs7SUFDTCxJQUFJO0lBQ0osSUFBSTtJQUNKLFNBQVM7SUFDVCxNQUFNO0lBQ04sTUFBTTtJQUNOLFFBQVE7SUFDUixRQUFRO0NBQ1IsQ0FBQztBQUVGLElBQUksU0FBUyxHQUFHO0lBQ2YsWUFBWTtJQUNaLFNBQVM7SUFDVCxRQUFRO0lBQ1IsT0FBTztJQUNQLFlBQVk7SUFDWixRQUFRO0lBQ1IsS0FBSztJQUNMLE9BQU87SUFDUCxXQUFXO0lBQ1gsU0FBUztJQUNULE9BQU87Q0FDUCxDQUFDO0FBRUYsTUFBcUIsZUFBZ0IsU0FBUSxzQkFBWTtJQUF6RDs7UUFDUyxPQUFFLEdBQWUsRUFBRSxDQUFDO1FBRTVCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQWdFbkIsQ0FBQztJQS9ETSxNQUFNOztZQUNYLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUztnQkFDbEMsT0FBTztZQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLCtEQUErRDtZQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLHVDQUF1QyxDQUFDLENBQUM7WUFDN0UsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLG1CQUFRLENBQUMsVUFBVSxH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YXNpY0hhbmRsZXIgZnJvbSBcIi4vQmFzaWNIYW5kbGVyXCI7XG5pbXBvcnQgeyBCYXR0bGVFdmVudHMsIFVzZXJuYW1lIH0gZnJvbSBcIi4uL1BTTWVzc2FnZVwiO1xuaW1wb3J0IHsgc25vb3plIH0gZnJvbSBcIi4uLy4uL1dlYnNpdGUvdXRpbHNcIjtcbmltcG9ydCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9CYWNrZW5kL3NldHRpbmdzXCI7XG5jb25zdCBmc3AgPSBmcy5wcm9taXNlcztcblxubGV0IGJhbmxpc3QgPSBbXG5cdCdjdHJsJyxcblx0J2Nsb3NlJyxcblx0J2FsdCcsXG5cdCdmNCcsXG5cdCdmNScsXG5cdCdmb3JmZWl0Jyxcblx0J2tpbGwnLFxuXHQncGVkbycsXG5cdCdoZW50YWknLFxuXHQnZG9nYXJzJ1xuXTtcblxubGV0IGZyZWVmb3JtcyA9IFtcblx0J2hvdHBvY2tldHMnLFxuXHQnZG9yaXRvcycsXG5cdCdtdG5kZXcnLFxuXHQnYW5pbWUnLFxuXHQna2lkZGlkZGxlcicsXG5cdCdmdXJmYWcnLFxuXHQnbnBjJyxcblx0J2ZhdHR5Jyxcblx0J3Bvd2VydHJpcCcsXG5cdCdnYXJiYWdlJyxcblx0J3RyYXNoJ1xuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JlZXRpbmdIYW5kbGVyIGV4dGVuZHMgQmFzaWNIYW5kbGVyIHtcblx0cHJpdmF0ZSBoaTogVXNlcm5hbWVbXSA9IFtdO1xuXG5cdGJhbnRlcmVkID0gZmFsc2U7XG5cdGJhbnRlcmluZyA9IGZhbHNlO1xuXHRhc3luYyBiYW50ZXIoKSB7XG5cdFx0aWYgKHRoaXMuYmFudGVyZWQgfHwgdGhpcy5iYW50ZXJpbmcpXG5cdFx0XHRyZXR1cm47XG5cdFx0dGhpcy5iYW50ZXJpbmcgPSB0cnVlO1xuXHRcdC8vdGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgYD5oZSBkb2VzIGl0IGZvciBmcmVlIWApO1xuXHRcdHRoaXMuYWNjb3VudC5tZXNzYWdlKHRoaXMucm9vbW5hbWUsIGBcIndlIHBheSB0byBiZSBtb2RzXCIgLSBEYVdvYmxlZmV0IDIwMTlgKTtcblx0XHRsZXQgcGFzdGFiID0gYXdhaXQgZnNwLnJlYWRGaWxlKHNldHRpbmdzLnJlc3NvdXJjZXMgKyAnL3Bhc3RhLnR4dCcpO1xuXHRcdGxldCBwYXN0YSA9IHBhc3RhYi50b1N0cmluZygpLnNwbGl0KCdcXG4nKTtcblx0XHR0cnkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Zm9yIChsZXQgbGluZSBvZiBwYXN0YSkge1xuXHRcdFx0XHRcdGlmIChsaW5lICE9ICcnKSAvLyBlbXB0eSBsaW5lcyBhcmUgdXNlZCBmb3IgdGltaW5nc1xuXHRcdFx0XHRcdFx0dGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgbGluZSk7XG5cdFx0XHRcdFx0YXdhaXQgc25vb3plKDEwMDApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuYmFudGVyZWQgPSB0cnVlO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdQcm94eSBzaGl0dGVkIGl0c2VsZiwgdHJ5aW5nIGFub3RoZXInKTtcblx0XHRcdHRoaXMuYmFudGVyaW5nID0gZmFsc2U7XG5cdFx0XHR0aGlzLmJhbnRlcmVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmJhbnRlcigpO1xuXHRcdH1cblx0fVxuXHQvKlxuXHQ+IFggam9pbnNcblx0PiBcIkhpIFghXCJcblx0Ki9cblx0YXN5bmMgaihtZXM6IEJhdHRsZUV2ZW50c1snaiddKSB7XG5cdFx0aWYgKCF0aGlzLmhpLmluY2x1ZGVzKG1lc1sxXSkgJiYgXG5cdFx0XHQoIG1lc1sxXS50b0xvd2VyQ2FzZSgpLnN1YnN0cigxKSA9PSAncm94bGUnIFxuXHRcdFx0Ly98fCAgbWVzWzFdLnRvTG93ZXJDYXNlKCkuc3Vic3RyKDEpID09ICd0aGVsb3Jkb2ZzbXVnJ1xuXHRcdFx0fHwgIG1lc1sxXS50b0xvd2VyQ2FzZSgpLnN1YnN0cigxKSA9PSAnYm9vIXhsZScpKSB7XG5cdFx0XHR0aGlzLmFjY291bnQubWVzc2FnZSh0aGlzLnJvb21uYW1lLCBgSGkgJHttZXNbMV19IOKdpO+4jyFgKTtcblx0XHRcdHRoaXMuaGkucHVzaChtZXNbMV0pO1xuXHRcdH1cblx0XHQvKmlmICghdGhpcy5oaS5pbmNsdWRlcyhtZXNbMV0pICYmIFxuXHRcdFx0KCBtZXNbMV0udG9Mb3dlckNhc2UoKS5zdWJzdHIoMSkgPT0gJ3RoZWxvcmRvZnNtdWcnKSkge1xuXHRcdFx0dGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgYEdyZWV0aW5ncywgZmF0aGVyLmApO1xuXHRcdFx0dGhpcy5oaS5wdXNoKG1lc1sxXSk7fSovXG5cdFx0XG5cdFx0XG5cdFx0XG5cdFx0aWYgKCclQCcuaW5jbHVkZXMobWVzWzFdWzBdKSkge1xuXHRcdFx0dGhpcy5iYW50ZXIoKTtcblx0XHR9XG5cdH1cblxuXHRhc3luYyBjKG06IEJhdHRsZUV2ZW50c1snYyddKSB7XG5cdFx0bGV0IG5vcm0gPSBtWzJdLnRvTG93ZXJDYXNlKCk7XG5cdFx0aWYgKGJhbmxpc3QuZmluZCh3ID0+IG1bMV0uaW5jbHVkZXModykpKVxuXHRcdFx0cmV0dXJuO1xuXHRcdC8vLnRvTG93ZXJDYXNlKCkgZW5zdXJlcyBpdCBkb2Vzbid0IHJlYWQgSlVTVCBsYy1vbmx5IG5hbWVzIFxuXHRcdGlmICghbm9ybS5pbmNsdWRlcyhgSGkgJChHYWxhcmlhbmRvZ2FycykudG9Mb3dlckNhc2UoKWApICYmIFxuXHRcdFx0IW5vcm0uaW5jbHVkZXMoYGhpICQoR2FsYXJpYW5kb2dhcnMpLnRvTG93ZXJDYXNlKClgKSlcblx0XHRcdHJldHVybjtcblx0XHRpZiAodGhpcy5oaS5pbmNsdWRlcyhtWzFdKSlcblx0XHRcdHJldHVybjtcblx0XHR0aGlzLmhpLnB1c2gobVsxXSk7XG5cdFx0dGhpcy5hY2NvdW50Lm1lc3NhZ2UodGhpcy5yb29tbmFtZSwgYEhpICR7bVsxXX0hYCk7XG5cdH1cbn1cbiJdfQ==