"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-07-31 19:43:30
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:14:21
 */
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const moment_1 = __importDefault(require("moment"));
class Meter {
    constructor(mid, config) {
        this.mid = mid;
        this.apiUrl = `${config.infoUrl}`;
    }
    async getMeterInfo() {
        const postData = {
            action: 'getmeteractinfo',
            mid: this.mid,
            time: moment_1.default().unix()
        };
        const result = await axios_1.default.post(this.apiUrl, querystring_1.default.stringify(postData));
        return result.data.meterAct || null;
    }
    async getChargeInfo() {
        const postData = {
            action: 'getMeterCharge',
            mid: this.mid,
            time: moment_1.default().unix()
        };
        const result = await axios_1.default.post(this.apiUrl, querystring_1.default.stringify(postData));
        return result.data.Charges || null;
    }
}
exports.default = Meter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL21ldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7O0dBS0c7QUFDSCxrREFBeUI7QUFDekIsOERBQXFDO0FBQ3JDLG9EQUEyQjtBQUUzQixNQUFNLEtBQUs7SUFJVCxZQUFhLEdBQVcsRUFBRSxNQUFXO1FBQ25DLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNuQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVk7UUFDaEIsTUFBTSxRQUFRLEdBQUc7WUFDZixNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLElBQUksRUFBRSxnQkFBTSxFQUFFLENBQUMsSUFBSSxFQUFFO1NBQ3RCLENBQUE7UUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxxQkFBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBQzdFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFBO0lBQ3JDLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYTtRQUNqQixNQUFNLFFBQVEsR0FBRztZQUNmLE1BQU0sRUFBRSxnQkFBZ0I7WUFDeEIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsSUFBSSxFQUFFLGdCQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUU7U0FDdEIsQ0FBQTtRQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHFCQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDN0UsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUE7SUFDcEMsQ0FBQztDQUNGO0FBRUQsa0JBQWUsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBBdXRob3I6IHlobCwgeWhsQDEwMjRody5vcmdcbiAqIEBEYXRlOiAyMDE4LTA3LTMxIDE5OjQzOjMwXG4gKiBATGFzdCBNb2RpZmllZCBieTogeWhsXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDIxLTA1LTE0IDE2OjE0OjIxXG4gKi9cbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcbmltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuXG5jbGFzcyBNZXRlciB7XG4gIG1pZDogc3RyaW5nXG4gIGFwaVVybDogc3RyaW5nXG5cbiAgY29uc3RydWN0b3IgKG1pZDogc3RyaW5nLCBjb25maWc6IGFueSkge1xuICAgIHRoaXMubWlkID0gbWlkXG4gICAgdGhpcy5hcGlVcmwgPSBgJHtjb25maWcuaW5mb1VybH1gXG4gIH1cblxuICBhc3luYyBnZXRNZXRlckluZm8gKCkge1xuICAgIGNvbnN0IHBvc3REYXRhID0ge1xuICAgICAgYWN0aW9uOiAnZ2V0bWV0ZXJhY3RpbmZvJyxcbiAgICAgIG1pZDogdGhpcy5taWQsXG4gICAgICB0aW1lOiBtb21lbnQoKS51bml4KClcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3MucG9zdCh0aGlzLmFwaVVybCwgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHBvc3REYXRhKSlcbiAgICByZXR1cm4gcmVzdWx0LmRhdGEubWV0ZXJBY3QgfHwgbnVsbFxuICB9XG5cbiAgYXN5bmMgZ2V0Q2hhcmdlSW5mbyAoKSB7XG4gICAgY29uc3QgcG9zdERhdGEgPSB7XG4gICAgICBhY3Rpb246ICdnZXRNZXRlckNoYXJnZScsXG4gICAgICBtaWQ6IHRoaXMubWlkLFxuICAgICAgdGltZTogbW9tZW50KCkudW5peCgpXG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF4aW9zLnBvc3QodGhpcy5hcGlVcmwsIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShwb3N0RGF0YSkpXG4gICAgcmV0dXJuIHJlc3VsdC5kYXRhLkNoYXJnZXMgfHwgbnVsbFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1ldGVyXG4iXX0=