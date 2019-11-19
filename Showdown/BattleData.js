"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemeStats {
    constructor() {
        this.name = '';
        this.species = '';
        this.kills = 0;
        this.dead = false;
    }
}
exports.MemeStats = MemeStats;
class BattleData {
    constructor(champ) {
        this.dist = Infinity;
        this.roomid = '';
        this.finished = false;
        this.memes = [];
        this.champ = champ;
    }
}
exports.BattleData = BattleData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmF0dGxlRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TaG93ZG93bi9CYXR0bGVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsTUFBYSxTQUFTO0lBQXRCO1FBQ0MsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsU0FBSSxHQUFZLEtBQUssQ0FBQztJQUN2QixDQUFDO0NBQUE7QUFMRCw4QkFLQztBQUlELE1BQWEsVUFBVTtJQVN0QixZQUFZLEtBQVk7UUFQeEIsU0FBSSxHQUFXLFFBQVEsQ0FBQztRQUN4QixXQUFNLEdBQVcsRUFBWSxDQUFDO1FBQzlCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHMUIsVUFBSyxHQUFnQixFQUFFLENBQUE7UUFHdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDcEIsQ0FBQztDQUNEO0FBWkQsZ0NBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFtcCB9IGZyb20gJy4uL1Nob2VkcmlwL0NoYW1wJztcbmltcG9ydCB7IFJvb21JRCB9IGZyb20gJy4vUFNSb29tJztcblxuZXhwb3J0IGNsYXNzIE1lbWVTdGF0cyB7XG5cdG5hbWU6IHN0cmluZyA9ICcnO1xuXHRzcGVjaWVzOiBzdHJpbmcgPSAnJztcblx0a2lsbHM6IG51bWJlciA9IDA7XG5cdGRlYWQ6IGJvb2xlYW4gPSBmYWxzZTtcbn1cblxuZXhwb3J0IHR5cGUgcGxheWVyQWxpYXMgPSAncDEnIHwgJ3AyJztcblxuZXhwb3J0IGNsYXNzIEJhdHRsZURhdGEge1xuXHRjaGFtcDogQ2hhbXA7XG5cdGRpc3Q6IG51bWJlciA9IEluZmluaXR5O1xuXHRyb29taWQ6IFJvb21JRCA9ICcnIGFzIFJvb21JRDtcblx0ZmluaXNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0Y2hhbXBfYWxpYXM/OiBwbGF5ZXJBbGlhcztcblx0YWN0aXZlX21lbWU/OiBzdHJpbmc7XG5cdG1lbWVzOiBNZW1lU3RhdHNbXSA9IFtdXG5cblx0Y29uc3RydWN0b3IoY2hhbXA6IENoYW1wKSB7XG5cdFx0dGhpcy5jaGFtcCA9IGNoYW1wO1xuXHR9XG59XG4iXX0=