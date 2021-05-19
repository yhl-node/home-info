"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-18 17:23:34
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:28:14
 */
const config_1 = __importDefault(require("config"));
const meter_1 = __importDefault(require("./jobs/meter"));
const user_1 = __importDefault(require("./jobs/user"));
const user_meter_1 = __importDefault(require("./jobs/user_meter"));
const charge_1 = __importDefault(require("./jobs/charge"));
meter_1.default();
console.log(config_1.default);
const interval = Number(config_1.default.get('interval.meter'));
setInterval(() => {
    console.log('updateMeter starting ................ ');
    meter_1.default();
    console.log('updateMeter ending ................ ');
}, interval * 60 * 1000);
setInterval(() => {
    console.log('updateUser starting ................ ');
    charge_1.default();
    console.log('updateUser ending ................ ');
}, interval * 60 * 1000);
setInterval(() => {
    console.log('updateUser starting ................ ');
    user_1.default();
    console.log('updateUser ending ................ ');
}, interval * 60 * 1000);
setInterval(() => {
    console.log('updateUserMeter starting ................ ');
    user_meter_1.default();
    console.log('updateUserMeter ending ................ ');
}, interval * 60 * 1000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7R0FLRztBQUNILG9EQUEyQjtBQUMzQix5REFBc0M7QUFDdEMsdURBQW9DO0FBQ3BDLG1FQUErQztBQUMvQywyREFBd0M7QUFFeEMsZUFBVyxFQUFFLENBQUE7QUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsQ0FBQTtBQUVuQixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO0FBQ3JELFdBQVcsQ0FBQyxHQUFHLEVBQUU7SUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUE7SUFDckQsZUFBVyxFQUFFLENBQUE7SUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUE7QUFDckQsQ0FBQyxFQUFFLFFBQVEsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFFeEIsV0FBVyxDQUFDLEdBQUcsRUFBRTtJQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtJQUNwRCxnQkFBWSxFQUFFLENBQUE7SUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUE7QUFDcEQsQ0FBQyxFQUFFLFFBQVEsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFFeEIsV0FBVyxDQUFDLEdBQUcsRUFBRTtJQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtJQUNwRCxjQUFVLEVBQUUsQ0FBQTtJQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQTtBQUNwRCxDQUFDLEVBQUUsUUFBUSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUV4QixXQUFXLENBQUMsR0FBRyxFQUFFO0lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO0lBQ3pELG9CQUFlLEVBQUUsQ0FBQTtJQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7QUFDekQsQ0FBQyxFQUFFLFFBQVEsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQEF1dGhvcjogeWhsLCB5aGxAMTAyNGh3Lm9yZ1xuICogQERhdGU6IDIwMTgtMDgtMTggMTc6MjM6MzRcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiB5aGxcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMjEtMDUtMTQgMTY6Mjg6MTRcbiAqL1xuaW1wb3J0IGNvbmZpZyBmcm9tICdjb25maWcnXG5pbXBvcnQgdXBkYXRlTWV0ZXIgZnJvbSAnLi9qb2JzL21ldGVyJ1xuaW1wb3J0IHVwZGF0ZVVzZXIgZnJvbSAnLi9qb2JzL3VzZXInXG5pbXBvcnQgdXBkYXRlVXNlck1ldGVyIGZyb20gJy4vam9icy91c2VyX21ldGVyJ1xuaW1wb3J0IHVwZGF0ZUNoYXJnZSBmcm9tICcuL2pvYnMvY2hhcmdlJ1xuXG51cGRhdGVNZXRlcigpXG5jb25zb2xlLmxvZyhjb25maWcpXG5cbmNvbnN0IGludGVydmFsID0gTnVtYmVyKGNvbmZpZy5nZXQoJ2ludGVydmFsLm1ldGVyJykpXG5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCd1cGRhdGVNZXRlciBzdGFydGluZyAuLi4uLi4uLi4uLi4uLi4uICcpXG4gIHVwZGF0ZU1ldGVyKClcbiAgY29uc29sZS5sb2coJ3VwZGF0ZU1ldGVyIGVuZGluZyAuLi4uLi4uLi4uLi4uLi4uICcpXG59LCBpbnRlcnZhbCAqIDYwICogMTAwMClcblxuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICBjb25zb2xlLmxvZygndXBkYXRlVXNlciBzdGFydGluZyAuLi4uLi4uLi4uLi4uLi4uICcpXG4gIHVwZGF0ZUNoYXJnZSgpXG4gIGNvbnNvbGUubG9nKCd1cGRhdGVVc2VyIGVuZGluZyAuLi4uLi4uLi4uLi4uLi4uICcpXG59LCBpbnRlcnZhbCAqIDYwICogMTAwMClcblxuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICBjb25zb2xlLmxvZygndXBkYXRlVXNlciBzdGFydGluZyAuLi4uLi4uLi4uLi4uLi4uICcpXG4gIHVwZGF0ZVVzZXIoKVxuICBjb25zb2xlLmxvZygndXBkYXRlVXNlciBlbmRpbmcgLi4uLi4uLi4uLi4uLi4uLiAnKVxufSwgaW50ZXJ2YWwgKiA2MCAqIDEwMDApXG5cbnNldEludGVydmFsKCgpID0+IHtcbiAgY29uc29sZS5sb2coJ3VwZGF0ZVVzZXJNZXRlciBzdGFydGluZyAuLi4uLi4uLi4uLi4uLi4uICcpXG4gIHVwZGF0ZVVzZXJNZXRlcigpXG4gIGNvbnNvbGUubG9nKCd1cGRhdGVVc2VyTWV0ZXIgZW5kaW5nIC4uLi4uLi4uLi4uLi4uLi4gJylcbn0sIGludGVydmFsICogNjAgKiAxMDAwKVxuIl19