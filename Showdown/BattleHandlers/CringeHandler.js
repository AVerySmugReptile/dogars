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
const DogarsClient_1 = require("../../DogarsClient");
class CringeHandler extends BasicHandler_1.default {
    constructor() {
        super(...arguments);
        this.ready = false;
        this.filter = {};
    }
    attached(bm, detach) {
        const _super = Object.create(null, {
            attached: { get: () => super.attached }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.attached.call(this, bm, detach);
            yield DogarsClient_1.DogarsClient.prepareCringe(bm.url);
            this.ready = true;
        });
    }
    c(m) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ready)
                return;
            if (m[1].includes('dogars' || 'smug'))
                return;
            let norm = m[2].toLowerCase();
            if (!(/\*sn(a|i)ps?\*/i).test(norm))
                return;
            let usertests = this.filter[m[1]] || 0;
            if (usertests >= 3)
                return;
            this.filter[m[1]] = usertests + 1;
            yield DogarsClient_1.DogarsClient.snap();
            this.account.message(this.roomname, "Yep. This one's going in my cringe compilation.");
        });
    }
    win() {
        return __awaiter(this, void 0, void 0, function* () {
            yield DogarsClient_1.DogarsClient.closeCringe();
        });
    }
}
exports.default = CringeHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JpbmdlSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TaG93ZG93bi9CYXR0bGVIYW5kbGVycy9DcmluZ2VIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxpREFBMEM7QUFFMUMscURBQWtEO0FBRWxELE1BQXFCLGFBQWMsU0FBUSxzQkFBWTtJQUF2RDs7UUFDWSxVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLFdBQU0sR0FBNEIsRUFBRSxDQUFDO0lBMkJqRCxDQUFDO0lBekJTLFFBQVEsQ0FBQyxFQUFpQixFQUFFLE1BQWtCOzs7OztZQUNoRCxPQUFNLFFBQVEsWUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFO1lBQzNCLE1BQU0sMkJBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7S0FBQTtJQUVLLENBQUMsQ0FBQyxDQUFvQjs7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNYLE9BQU87WUFDWCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQztnQkFDakMsT0FBTztZQUNYLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQy9CLE9BQU87WUFDWCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxJQUFJLFNBQVMsSUFBSSxDQUFDO2dCQUNkLE9BQU87WUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbEMsTUFBTSwyQkFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsaURBQWlELENBQUMsQ0FBQztRQUMzRixDQUFDO0tBQUE7SUFFSyxHQUFHOztZQUNMLE1BQU0sMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxDQUFDO0tBQUE7Q0FDSjtBQTdCRCxnQ0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXR0bGVNb25pdG9yIH0gZnJvbSBcIi4uL0JhdHRsZU1vbml0b3JcIjtcbmltcG9ydCB7IENyaW5nZUNvbXBpbGF0aW9uIH0gZnJvbSBcIi4uLy4uL0JhY2tlbmQvQ3JpbmdlQ29tcGlsYXRpb25cIjtcbmltcG9ydCBCYXNpY0hhbmRsZXIgZnJvbSBcIi4vQmFzaWNIYW5kbGVyXCI7XG5pbXBvcnQgeyBCYXR0bGVFdmVudHMgfSBmcm9tIFwiLi4vUFNNZXNzYWdlXCI7XG5pbXBvcnQgeyBEb2dhcnNDbGllbnQgfSBmcm9tIFwiLi4vLi4vRG9nYXJzQ2xpZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyaW5nZUhhbmRsZXIgZXh0ZW5kcyBCYXNpY0hhbmRsZXIge1xuICAgIHByaXZhdGUgcmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGZpbHRlcjogeyBbazogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcblxuICAgIGFzeW5jIGF0dGFjaGVkKGJtOiBCYXR0bGVNb25pdG9yLCBkZXRhY2g6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgc3VwZXIuYXR0YWNoZWQoYm0sIGRldGFjaCk7XG4gICAgICAgIGF3YWl0IERvZ2Fyc0NsaWVudC5wcmVwYXJlQ3JpbmdlKGJtLnVybCk7XG4gICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgIH1cblxuICAgIGFzeW5jIGMobTogQmF0dGxlRXZlbnRzWydjJ10pIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlYWR5KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAobVsxXS5pbmNsdWRlcygnZG9nYXJzJyB8fCAnc211ZycpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgbm9ybSA9IG1bMl0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKCEoL1xcKnNuKGF8aSlwcz9cXCovaSkudGVzdChub3JtKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IHVzZXJ0ZXN0cyA9IHRoaXMuZmlsdGVyW21bMV1dIHx8IDA7XG4gICAgICAgIGlmICh1c2VydGVzdHMgPj0gMylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5maWx0ZXJbbVsxXV0gPSB1c2VydGVzdHMgKyAxO1xuICAgICAgICBhd2FpdCBEb2dhcnNDbGllbnQuc25hcCgpO1xuICAgICAgICB0aGlzLmFjY291bnQubWVzc2FnZSh0aGlzLnJvb21uYW1lLCBcIlllcC4gVGhpcyBvbmUncyBnb2luZyBpbiBteSBjcmluZ2UgY29tcGlsYXRpb24uXCIpO1xuICAgIH1cblxuICAgIGFzeW5jIHdpbigpIHtcbiAgICAgICAgYXdhaXQgRG9nYXJzQ2xpZW50LmNsb3NlQ3JpbmdlKCk7XG4gICAgfVxufVxuIl19