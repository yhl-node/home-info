"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:41
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:40:19
 */
const config_1 = __importDefault(require("config"));
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = __importDefault(require("../lib/user"));
const helper_1 = __importDefault(require("./helper"));
const users_1 = __importDefault(require("../models/users"));
const UserDB = users_1.default(helper_1.default.db, sequelize_1.default);
async function updateUser(uid) {
    try {
        const user = new user_1.default(uid, config_1.default);
        const [userInfo, userDB] = await Promise.all([
            user.getUserInfo(),
            UserDB.findOne({ where: { user_id: uid }, attributes: ['user_id'] })
        ]);
        await helper_1.default.updateOrCreate(UserDB, userDB, userInfo, { user_id: uid });
    }
    catch (error) {
        console.error(`update user error: ${uid}`);
    }
}
async function start() {
    let allPromise = [];
    const DBUserId = await UserDB.max('user_id');
    let maxUid = Number(config_1.default.get('maxUid'));
    DBUserId >= maxUid && (maxUid = DBUserId + 10);
    const maxLen = Number(config_1.default.get('maxPromise'));
    for (let index = 1; index <= maxUid; index++) {
        if (allPromise.length >= maxLen || index === maxUid) {
            allPromise.push(updateUser(index));
            try {
                await Promise.all(allPromise);
            }
            catch (err) {
                console.error('update user error ! ! !');
            }
            allPromise = [];
        }
        else {
            allPromise.push(updateUser(index));
        }
    }
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qb2JzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7R0FLRztBQUNILG9EQUEyQjtBQUMzQiwwREFBaUM7QUFDakMsdURBQThCO0FBQzlCLHNEQUE2QjtBQUM3Qiw0REFBd0M7QUFFeEMsTUFBTSxNQUFNLEdBQUcsZUFBVSxDQUFDLGdCQUFNLENBQUMsRUFBRSxFQUFFLG1CQUFTLENBQUMsQ0FBQTtBQUUvQyxLQUFLLFVBQVUsVUFBVSxDQUFFLEdBQVc7SUFDcEMsSUFBSTtRQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLEdBQUcsRUFBRSxnQkFBTSxDQUFDLENBQUE7UUFDbEMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7U0FDckUsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxnQkFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0tBQ3hFO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLEVBQUUsQ0FBQyxDQUFBO0tBQzNDO0FBQ0gsQ0FBQztBQUVELEtBQUssVUFBVSxLQUFLO0lBQ2xCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQTtJQUNuQixNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDNUMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGdCQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDekMsUUFBUSxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFFOUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGdCQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7SUFDL0MsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM1QyxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksTUFBTSxJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7WUFDbkQsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNsQyxJQUFJO2dCQUNGLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTthQUM5QjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQTthQUN6QztZQUNELFVBQVUsR0FBRyxFQUFFLENBQUE7U0FDaEI7YUFBTTtZQUNMLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7U0FDbkM7S0FDRjtBQUNILENBQUM7QUFFRCxrQkFBZSxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQEF1dGhvcjogeWhsLCB5aGxAMTAyNGh3Lm9yZ1xuICogQERhdGU6IDIwMTgtMDgtMTEgMjM6MTA6NDFcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiB5aGxcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMjEtMDUtMTQgMTY6NDA6MTlcbiAqL1xuaW1wb3J0IGNvbmZpZyBmcm9tICdjb25maWcnXG5pbXBvcnQgU2VxdWVsaXplIGZyb20gJ3NlcXVlbGl6ZSdcbmltcG9ydCBVc2VyIGZyb20gJy4uL2xpYi91c2VyJ1xuaW1wb3J0IGhlbHBlciBmcm9tICcuL2hlbHBlcidcbmltcG9ydCBVc2Vyc01vZGVsIGZyb20gJy4uL21vZGVscy91c2VycydcblxuY29uc3QgVXNlckRCID0gVXNlcnNNb2RlbChoZWxwZXIuZGIsIFNlcXVlbGl6ZSlcblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlciAodWlkOiBudW1iZXIpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIodWlkLCBjb25maWcpXG4gICAgY29uc3QgW3VzZXJJbmZvLCB1c2VyREJdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdXNlci5nZXRVc2VySW5mbygpLFxuICAgICAgVXNlckRCLmZpbmRPbmUoeyB3aGVyZTogeyB1c2VyX2lkOiB1aWQgfSwgYXR0cmlidXRlczogWyd1c2VyX2lkJ10gfSlcbiAgICBdKVxuICAgIGF3YWl0IGhlbHBlci51cGRhdGVPckNyZWF0ZShVc2VyREIsIHVzZXJEQiwgdXNlckluZm8sIHsgdXNlcl9pZDogdWlkIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihgdXBkYXRlIHVzZXIgZXJyb3I6ICR7dWlkfWApXG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQgKCkge1xuICBsZXQgYWxsUHJvbWlzZSA9IFtdXG4gIGNvbnN0IERCVXNlcklkID0gYXdhaXQgVXNlckRCLm1heCgndXNlcl9pZCcpXG4gIGxldCBtYXhVaWQgPSBOdW1iZXIoY29uZmlnLmdldCgnbWF4VWlkJykpXG4gIERCVXNlcklkID49IG1heFVpZCAmJiAobWF4VWlkID0gREJVc2VySWQgKyAxMClcblxuICBjb25zdCBtYXhMZW4gPSBOdW1iZXIoY29uZmlnLmdldCgnbWF4UHJvbWlzZScpKVxuICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDw9IG1heFVpZDsgaW5kZXgrKykge1xuICAgIGlmIChhbGxQcm9taXNlLmxlbmd0aCA+PSBtYXhMZW4gfHwgaW5kZXggPT09IG1heFVpZCkge1xuICAgICAgYWxsUHJvbWlzZS5wdXNoKHVwZGF0ZVVzZXIoaW5kZXgpKVxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoYWxsUHJvbWlzZSlcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCd1cGRhdGUgdXNlciBlcnJvciAhICEgIScpXG4gICAgICB9XG4gICAgICBhbGxQcm9taXNlID0gW11cbiAgICB9IGVsc2Uge1xuICAgICAgYWxsUHJvbWlzZS5wdXNoKHVwZGF0ZVVzZXIoaW5kZXgpKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFydFxuIl19