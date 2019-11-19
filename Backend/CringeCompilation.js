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
const puppeteer = require("puppeteer");
const fs = require("fs");
const settings_1 = require("./settings");
const CringeProvider_1 = require("./CringeProvider");
let browser = null;
let getBrowser = () => __awaiter(this, void 0, void 0, function* () {
    if (browser)
        return browser;
    return browser = yield puppeteer.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
});
let page = null;
let getPage = () => __awaiter(this, void 0, void 0, function* () {
    if (page)
        return page;
    if (!browser)
        browser = yield getBrowser();
    return page = yield browser.newPage();
});
class CringeCompilation {
    constructor(battleLink) {
        this.inited = false;
        this.battleLink = battleLink;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.page = yield getPage();
            this.page.setViewport({ width: 831, height: 531 });
            yield this.page.goto(this.battleLink);
            let lll = {
                "dark": false,
                "bwgfx": false,
                "noanim": false,
                "nopastgens": true
            };
            lll = JSON.stringify(lll);
            yield this.page.evaluate(`localStorage.setItem("showdown_prefs", '${lll}');`);
            this.inited = true;
        });
    }
    snap() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.inited)
                yield this.init();
            let buff = yield this.page.screenshot({
                type: 'png'
            });
            let cringefolder = `${settings_1.settings.ressources}/public/cringec`;
            if (!fs.existsSync(cringefolder))
                fs.mkdirSync(cringefolder);
            let tmp = `${cringefolder}/tmp.png`;
            fs.writeFileSync(tmp, buff);
            let len = fs.readdirSync(cringefolder).length;
            let newfile = `${cringefolder}/${len}.png`;
            fs.renameSync(tmp, newfile);
            CringeProvider_1.Cringer.pushNewCringe(len);
        });
    }
    done() {
        return this.page.close({ runBeforeUnload: false });
    }
}
exports.CringeCompilation = CringeCompilation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JpbmdlQ29tcGlsYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQmFja2VuZC9DcmluZ2VDb21waWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQXVDO0FBQ3ZDLHlCQUEwQjtBQUMxQix5Q0FBc0M7QUFDdEMscURBQTJDO0FBTTNDLElBQUksT0FBTyxHQUE2QixJQUFJLENBQUM7QUFDN0MsSUFBSSxVQUFVLEdBQUcsR0FBUyxFQUFFO0lBQ3hCLElBQUksT0FBTztRQUNQLE9BQU8sT0FBTyxDQUFDO0lBQ25CLE9BQU8sT0FBTyxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0csQ0FBQyxDQUFBLENBQUE7QUFFRCxJQUFJLElBQUksR0FBMEIsSUFBSSxDQUFDO0FBQ3ZDLElBQUksT0FBTyxHQUFHLEdBQVMsRUFBRTtJQUNyQixJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQztJQUNoQixJQUFJLENBQUMsT0FBTztRQUNSLE9BQU8sR0FBRyxNQUFNLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLE9BQU8sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzFDLENBQUMsQ0FBQSxDQUFBO0FBRUQsTUFBYSxpQkFBaUI7SUFJMUIsWUFBWSxVQUFxQjtRQUZqQyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBR3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFSyxJQUFJOztZQUNOLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFFbkQsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEMsSUFBSSxHQUFHLEdBQVE7Z0JBQ1gsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQztZQUNGLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsMkNBQTJDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztLQUFBO0lBRUssSUFBSTs7WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07Z0JBQ1osTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEIsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSyxDQUFDLFVBQVUsQ0FBQztnQkFDbkMsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDLENBQUM7WUFDSCxJQUFJLFlBQVksR0FBRyxHQUFHLG1CQUFRLENBQUMsVUFBVSxpQkFBaUIsQ0FBQztZQUMzRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQzVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0IsSUFBSSxHQUFHLEdBQUcsR0FBRyxZQUFZLFVBQVUsQ0FBQztZQUNwQyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUM5QyxJQUFJLE9BQU8sR0FBRyxHQUFHLFlBQVksSUFBSSxHQUFHLE1BQU0sQ0FBQTtZQUMxQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM1Qix3QkFBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDO0tBQUE7SUFFRCxJQUFJO1FBQ0EsT0FBTyxJQUFJLENBQUMsSUFBSyxDQUFDLEtBQUssQ0FBQyxFQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDSjtBQTVDRCw4Q0E0Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwdXBwZXRlZXIgZnJvbSBcInB1cHBldGVlclwiO1xuaW1wb3J0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IENyaW5nZXIgfSBmcm9tIFwiLi9DcmluZ2VQcm92aWRlclwiO1xuaW1wb3J0IHsgQXMgfSBmcm9tIFwiLi4vU2hvd2Rvd24vUFNNZXNzYWdlXCI7XG5pbXBvcnQgeyBnZXRQYWNrZWRTZXR0aW5ncyB9IGZyb20gXCJodHRwMlwiO1xuXG5leHBvcnQgdHlwZSBCYXR0bGVVUkwgPSBzdHJpbmcgJiBBczwnQmF0dGxlVVJMJz47XG5cbmxldCBicm93c2VyOiBwdXBwZXRlZXIuQnJvd3NlciB8IG51bGwgPSBudWxsO1xubGV0IGdldEJyb3dzZXIgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJyb3dzZXIpXG4gICAgICAgIHJldHVybiBicm93c2VyO1xuICAgIHJldHVybiBicm93c2VyID0gYXdhaXQgcHVwcGV0ZWVyLmxhdW5jaCh7IGV4ZWN1dGFibGVQYXRoOiAnL3Vzci9iaW4vY2hyb21pdW0nLCBhcmdzOiBbJy0tbm8tc2FuZGJveCddIH0pO1xufVxuXG5sZXQgcGFnZTogcHVwcGV0ZWVyLlBhZ2UgfCBudWxsID0gbnVsbDtcbmxldCBnZXRQYWdlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChwYWdlKVxuICAgICAgICByZXR1cm4gcGFnZTtcbiAgICBpZiAoIWJyb3dzZXIpXG4gICAgICAgIGJyb3dzZXIgPSBhd2FpdCBnZXRCcm93c2VyKCk7XG4gICAgcmV0dXJuIHBhZ2UgPSBhd2FpdCBicm93c2VyLm5ld1BhZ2UoKTtcbn1cblxuZXhwb3J0IGNsYXNzIENyaW5nZUNvbXBpbGF0aW9uIHtcbiAgICBiYXR0bGVMaW5rOiBCYXR0bGVVUkw7XG4gICAgaW5pdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcGFnZT86IHB1cHBldGVlci5QYWdlO1xuICAgIGNvbnN0cnVjdG9yKGJhdHRsZUxpbms6IEJhdHRsZVVSTCkge1xuICAgICAgICB0aGlzLmJhdHRsZUxpbmsgPSBiYXR0bGVMaW5rO1xuICAgIH1cblxuICAgIGFzeW5jIGluaXQoKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IGF3YWl0IGdldFBhZ2UoKTtcbiAgICAgICAgdGhpcy5wYWdlLnNldFZpZXdwb3J0KHsgd2lkdGg6IDgzMSwgaGVpZ2h0OiA1MzEgfSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLmdvdG8odGhpcy5iYXR0bGVMaW5rKTtcbiAgICAgICAgbGV0IGxsbDogYW55ID0ge1xuICAgICAgICAgICAgXCJkYXJrXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJid2dmeFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwibm9hbmltXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJub3Bhc3RnZW5zXCI6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgbGxsID0gSlNPTi5zdHJpbmdpZnkobGxsKTtcbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLmV2YWx1YXRlKGBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNob3dkb3duX3ByZWZzXCIsICcke2xsbH0nKTtgKTtcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGFzeW5jIHNuYXAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0ZWQpXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmluaXQoKTtcbiAgICAgICAgbGV0IGJ1ZmYgPSBhd2FpdCB0aGlzLnBhZ2UhLnNjcmVlbnNob3Qoe1xuICAgICAgICAgICAgdHlwZTogJ3BuZydcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBjcmluZ2Vmb2xkZXIgPSBgJHtzZXR0aW5ncy5yZXNzb3VyY2VzfS9wdWJsaWMvY3JpbmdlY2A7XG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhjcmluZ2Vmb2xkZXIpKVxuICAgICAgICAgICAgZnMubWtkaXJTeW5jKGNyaW5nZWZvbGRlcik7XG4gICAgICAgIGxldCB0bXAgPSBgJHtjcmluZ2Vmb2xkZXJ9L3RtcC5wbmdgO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHRtcCwgYnVmZik7XG4gICAgICAgIGxldCBsZW4gPSBmcy5yZWFkZGlyU3luYyhjcmluZ2Vmb2xkZXIpLmxlbmd0aDtcbiAgICAgICAgbGV0IG5ld2ZpbGUgPSBgJHtjcmluZ2Vmb2xkZXJ9LyR7bGVufS5wbmdgXG4gICAgICAgIGZzLnJlbmFtZVN5bmModG1wLCBuZXdmaWxlKTtcbiAgICAgICAgQ3Jpbmdlci5wdXNoTmV3Q3JpbmdlKGxlbik7XG4gICAgfVxuXG4gICAgZG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZSEuY2xvc2Uoe3J1bkJlZm9yZVVubG9hZDogZmFsc2V9KTtcbiAgICB9XG59XG4iXX0=