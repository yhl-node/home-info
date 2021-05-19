"use strict";
/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-07-31 20:29:33
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:15:37
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const moment_1 = __importDefault(require("moment"));
class User {
    constructor(uid, config) {
        this.uid = uid;
        this.apiUrl = `${config.infoUrl}`;
        this.postData = {
            UserID: this.uid,
            MType: 'U',
            time: moment_1.default().unix()
        };
    }
    async getUserMeter() {
        const postData = Object.assign(this.postData, {
            action: 'getuserMeter'
        });
        const result = await axios_1.default.post(this.apiUrl, querystring_1.default.stringify(postData));
        return result.data.Meters || null;
    }
    async getUserInfo() {
        const postData = Object.assign(this.postData, {
            action: 'getuser'
        });
        const result = await axios_1.default.post(this.apiUrl, querystring_1.default.stringify(postData));
        return result.data.WxUser || null;
    }
}
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7Ozs7O0FBRUgsa0RBQXlCO0FBQ3pCLDhEQUFxQztBQUNyQyxvREFBMkI7QUFFM0IsTUFBTSxJQUFJO0lBS1IsWUFBYSxHQUFXLEVBQUUsTUFBVztRQUNuQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRztZQUNoQixLQUFLLEVBQUUsR0FBRztZQUNWLElBQUksRUFBRSxnQkFBTSxFQUFFLENBQUMsSUFBSSxFQUFFO1NBQ3RCLENBQUE7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVk7UUFDaEIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzVDLE1BQU0sRUFBRSxjQUFjO1NBQ3ZCLENBQUMsQ0FBQTtRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHFCQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDN0UsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUE7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXO1FBQ2YsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzVDLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLENBQUMsQ0FBQTtRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHFCQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDN0UsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUE7SUFDbkMsQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBBdXRob3I6IHlobCwgeWhsQDEwMjRody5vcmdcbiAqIEBEYXRlOiAyMDE4LTA3LTMxIDIwOjI5OjMzXG4gKiBATGFzdCBNb2RpZmllZCBieTogeWhsXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDIxLTA1LTE0IDE2OjE1OjM3XG4gKi9cblxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5cbmNsYXNzIFVzZXIge1xuICB1aWQ6IG51bWJlclxuICBhcGlVcmw6IHN0cmluZ1xuICBwb3N0RGF0YTogeyBVc2VySUQ6IG51bWJlciwgTVR5cGU6IHN0cmluZywgdGltZTogbnVtYmVyIH1cblxuICBjb25zdHJ1Y3RvciAodWlkOiBudW1iZXIsIGNvbmZpZzogYW55KSB7XG4gICAgdGhpcy51aWQgPSB1aWRcbiAgICB0aGlzLmFwaVVybCA9IGAke2NvbmZpZy5pbmZvVXJsfWBcbiAgICB0aGlzLnBvc3REYXRhID0ge1xuICAgICAgVXNlcklEOiB0aGlzLnVpZCxcbiAgICAgIE1UeXBlOiAnVScsXG4gICAgICB0aW1lOiBtb21lbnQoKS51bml4KClcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRVc2VyTWV0ZXIgKCkge1xuICAgIGNvbnN0IHBvc3REYXRhID0gT2JqZWN0LmFzc2lnbih0aGlzLnBvc3REYXRhLCB7XG4gICAgICBhY3Rpb246ICdnZXR1c2VyTWV0ZXInXG4gICAgfSlcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBheGlvcy5wb3N0KHRoaXMuYXBpVXJsLCBxdWVyeXN0cmluZy5zdHJpbmdpZnkocG9zdERhdGEpKVxuICAgIHJldHVybiByZXN1bHQuZGF0YS5NZXRlcnMgfHwgbnVsbFxuICB9XG5cbiAgYXN5bmMgZ2V0VXNlckluZm8gKCkge1xuICAgIGNvbnN0IHBvc3REYXRhID0gT2JqZWN0LmFzc2lnbih0aGlzLnBvc3REYXRhLCB7XG4gICAgICBhY3Rpb246ICdnZXR1c2VyJ1xuICAgIH0pXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3MucG9zdCh0aGlzLmFwaVVybCwgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHBvc3REYXRhKSlcbiAgICByZXR1cm4gcmVzdWx0LmRhdGEuV3hVc2VyIHx8IG51bGxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVc2VyXG4iXX0=