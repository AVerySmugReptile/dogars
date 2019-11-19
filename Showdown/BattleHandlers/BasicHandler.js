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
class BasicHandler {
    attached(bm, detach) {
        return __awaiter(this, void 0, void 0, function* () {
            this.roomname = bm.room.room;
            this.account = bm.account;
            this.detach = detach;
        });
    }
    win(w) {
        return __awaiter(this, void 0, void 0, function* () {
            this.detach && this.detach();
        });
    }
}
exports.default = BasicHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1Nob3dkb3duL0JhdHRsZUhhbmRsZXJzL0Jhc2ljSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsTUFBcUIsWUFBWTtJQUt2QixRQUFRLENBQUMsRUFBaUIsRUFBRSxNQUFrQjs7WUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssR0FBRyxDQUFDLENBQXNCOztZQUM1QixJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxDQUFDO0tBQUE7Q0FDSjtBQWRELCtCQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmF0dGxlTW9uaXRvciwgQmF0dGxlSGFuZGxlciB9IGZyb20gXCIuLi9CYXR0bGVNb25pdG9yXCI7XG5pbXBvcnQgeyBCYXR0bGVFdmVudHMgfSBmcm9tIFwiLi4vUFNNZXNzYWdlXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi4vUGxheWVyXCI7XG5pbXBvcnQgeyBSb29tSUQgfSBmcm9tIFwiLi4vUFNSb29tXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2ljSGFuZGxlciBpbXBsZW1lbnRzIEJhdHRsZUhhbmRsZXIge1xuICAgIHByb3RlY3RlZCBhY2NvdW50ITogUGxheWVyO1xuICAgIHByb3RlY3RlZCByb29tbmFtZSE6IFJvb21JRDtcbiAgICBwcml2YXRlIGRldGFjaD86ICgpID0+IHZvaWQ7XG5cbiAgICBhc3luYyBhdHRhY2hlZChibTogQmF0dGxlTW9uaXRvciwgZGV0YWNoOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMucm9vbW5hbWUgPSBibS5yb29tLnJvb207XG4gICAgICAgIHRoaXMuYWNjb3VudCA9IGJtLmFjY291bnQ7XG4gICAgICAgIHRoaXMuZGV0YWNoID0gZGV0YWNoO1xuICAgIH1cblxuICAgIGFzeW5jIHdpbih3OiBCYXR0bGVFdmVudHNbJ3dpbiddKSB7XG4gICAgICAgIHRoaXMuZGV0YWNoICYmIHRoaXMuZGV0YWNoKCk7XG4gICAgfVxufVxuIl19