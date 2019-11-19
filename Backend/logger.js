"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let level = 0;
var logger;
(function (logger) {
    function getLevel() {
        return level;
    }
    logger.getLevel = getLevel;
    function setLevel(x) {
        level = x;
    }
    logger.setLevel = setLevel;
    function log(...args) {
        let al = args.shift();
        if (al >= level)
            console.log(new Error().stack.split('\n')[2].substr(7), ...args);
    }
    logger.log = log;
})(logger = exports.logger || (exports.logger = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0JhY2tlbmQvbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBRWQsSUFBYyxNQUFNLENBY25CO0FBZEQsV0FBYyxNQUFNO0lBQ2hCLFNBQWdCLFFBQVE7UUFDMUIsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRmtCLGVBQVEsV0FFMUIsQ0FBQTtJQUVELFNBQWdCLFFBQVEsQ0FBQyxDQUFTO1FBQ2pDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRmUsZUFBUSxXQUV2QixDQUFBO0lBRUQsU0FBZ0IsR0FBRyxDQUFDLEdBQUcsSUFBVztRQUMzQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsSUFBSSxFQUFFLElBQUksS0FBSztZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxLQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFKZSxVQUFHLE1BSWxCLENBQUE7QUFDRixDQUFDLEVBZGEsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBY25CIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGxldmVsID0gMDtcblxuZXhwb3J0IG1vZHVsZSBsb2dnZXIge1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRMZXZlbCgpIHtcblx0XHRyZXR1cm4gbGV2ZWw7XG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gc2V0TGV2ZWwoeDogbnVtYmVyKSB7XG5cdFx0bGV2ZWwgPSB4O1xuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBsZXQgYWwgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0aWYgKGFsID49IGxldmVsKVxuXHRcdFx0Y29uc29sZS5sb2cobmV3IEVycm9yKCkuc3RhY2shLnNwbGl0KCdcXG4nKVsyXS5zdWJzdHIoNyksIC4uLmFyZ3MpO1xuXHR9XG59XG4iXX0=