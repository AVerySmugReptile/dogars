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
class DigitsChecker extends BasicHandler_1.default {
    attached(bm, detach) {
        const _super = Object.create(null, {
            attached: { get: () => super.attached }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.attached.call(this, bm, detach);
            let str = this.roomname;
            let l = str.length - 1;
            let d = str[l];
            while (str[l] == d)
                --l;
            let n = str.length - l - 1;
            if (n >= 2) {
                let mess = [
                    'checked',
                    'nice trips',
                    'nice quads!',
                    'holy quints!'
                ][n - 2];
                if (!mess)
                    mess = 'DIGITS CHECKED';
                this.account.message(this.roomname, mess);
            }
        });
    }
}
exports.default = DigitsChecker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlnaXRzQ2hlY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TaG93ZG93bi9CYXR0bGVIYW5kbGVycy9EaWdpdHNDaGVja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxpREFBMEM7QUFFMUMsTUFBcUIsYUFBYyxTQUFRLHNCQUFZO0lBQzdDLFFBQVEsQ0FBQyxFQUFpQixFQUFFLE1BQWtCOzs7OztZQUNoRCxPQUFNLFFBQVEsWUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFO1lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakIsRUFBRSxDQUFDLENBQUM7WUFDTCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNYLElBQUksSUFBSSxHQUFHO29CQUNWLFNBQVM7b0JBQ1QsWUFBWTtvQkFDWixhQUFhO29CQUNiLGNBQWM7aUJBQ2QsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLElBQUk7b0JBQ1IsSUFBSSxHQUFHLGdCQUFnQixDQUFDO2dCQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzFDO1FBQ0MsQ0FBQztLQUFBO0NBQ0o7QUFyQkQsZ0NBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmF0dGxlTW9uaXRvciB9IGZyb20gXCIuLi9CYXR0bGVNb25pdG9yXCI7XG5pbXBvcnQgQmFzaWNIYW5kbGVyIGZyb20gXCIuL0Jhc2ljSGFuZGxlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWdpdHNDaGVja2VyIGV4dGVuZHMgQmFzaWNIYW5kbGVyIHtcbiAgICBhc3luYyBhdHRhY2hlZChibTogQmF0dGxlTW9uaXRvciwgZGV0YWNoOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHN1cGVyLmF0dGFjaGVkKGJtLCBkZXRhY2gpOyAgICAgICAgXG5cdFx0bGV0IHN0ciA9IHRoaXMucm9vbW5hbWU7XG5cdFx0bGV0IGwgPSBzdHIubGVuZ3RoIC0gMTtcblx0XHRsZXQgZCA9IHN0cltsXTtcblx0XHR3aGlsZSAoc3RyW2xdID09IGQpXG5cdFx0XHQtLWw7XG5cdFx0bGV0IG4gPSBzdHIubGVuZ3RoIC0gbCAtIDE7XHRcdFxuXHRcdGlmIChuID49IDIpIHtcblx0XHRcdGxldCBtZXNzID0gW1xuXHRcdFx0XHQnY2hlY2tlZCcsXG5cdFx0XHRcdCduaWNlIHRyaXBzJyxcblx0XHRcdFx0J25pY2UgcXVhZHMhJyxcblx0XHRcdFx0J2hvbHkgcXVpbnRzISdcblx0XHRcdF1bbiAtIDJdO1xuXHRcdFx0aWYgKCFtZXNzKVxuXHRcdFx0XHRtZXNzID0gJ0RJR0lUUyBDSEVDS0VEJztcblx0XHRcdHRoaXMuYWNjb3VudC5tZXNzYWdlKHRoaXMucm9vbW5hbWUsIG1lc3MpO1xuXHRcdH1cbiAgICB9XG59XG4iXX0=