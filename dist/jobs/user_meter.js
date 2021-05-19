"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:47
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:12:32
 */
const config_1 = __importDefault(require("config"));
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = __importDefault(require("../lib/user"));
const helper_1 = __importDefault(require("./helper"));
const user_meters_1 = __importDefault(require("../models/user_meters"));
const MeterDB = user_meters_1.default(helper_1.default.db, sequelize_1.default);
async function updateUserMeter(uid) {
    try {
        const user = new user_1.default(uid, config_1.default);
        const userMeters = await user.getUserMeter();
        if (userMeters) {
            for (let index = 0; index < userMeters.length; index++) {
                const userMeter = userMeters[index];
                const meterDB = await MeterDB.findOne({ where: { mid: userMeter.mid }, attributes: ['mid'] });
                await helper_1.default.updateOrCreate(MeterDB, meterDB, userMeter, { user_id: uid });
            }
        }
    }
    catch (error) {
        console.error(`update user meter error: ${uid}`);
    }
}
async function start() {
    const len = Number(config_1.default.get('maxUid'));
    let allPromise = [];
    for (let index = 1; index <= len; index++) {
        const uid = index;
        const maxLen = Number(config_1.default.get('maxPromise'));
        if (allPromise.length >= maxLen || index === len) {
            allPromise.push(updateUserMeter(uid));
            try {
                await Promise.all(allPromise);
            }
            catch (err) {
                console.error('update user meter error ! ! !');
            }
            allPromise = [];
        }
        else {
            allPromise.push(updateUserMeter(uid));
        }
    }
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9tZXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qb2JzL3VzZXJfbWV0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7R0FLRztBQUNILG9EQUEyQjtBQUMzQiwwREFBaUM7QUFDakMsdURBQThCO0FBQzlCLHNEQUE2QjtBQUM3Qix3RUFBbUQ7QUFFbkQsTUFBTSxPQUFPLEdBQUcscUJBQWUsQ0FBQyxnQkFBTSxDQUFDLEVBQUUsRUFBRSxtQkFBUyxDQUFDLENBQUE7QUFDckQsS0FBSyxVQUFVLGVBQWUsQ0FBRSxHQUFXO0lBQ3pDLElBQUk7UUFDRixNQUFNLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxHQUFHLEVBQUUsZ0JBQU0sQ0FBQyxDQUFBO1FBQ2xDLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQzVDLElBQUksVUFBVSxFQUFFO1lBQ2QsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3RELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDbkMsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQzdGLE1BQU0sZ0JBQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTthQUMzRTtTQUNGO0tBQ0Y7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEdBQUcsRUFBRSxDQUFDLENBQUE7S0FDakQ7QUFDSCxDQUFDO0FBRUQsS0FBSyxVQUFVLEtBQUs7SUFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLGdCQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDeEMsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFBO0lBQ25CLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDekMsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFBO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQy9DLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxNQUFNLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtZQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3JDLElBQUk7Z0JBQ0YsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO2FBQzlCO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO2FBQy9DO1lBQ0QsVUFBVSxHQUFHLEVBQUUsQ0FBQTtTQUNoQjthQUFNO1lBQ0wsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUN0QztLQUNGO0FBQ0gsQ0FBQztBQUVELGtCQUFlLEtBQUssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiB5aGwsIHlobEAxMDI0aHcub3JnXG4gKiBARGF0ZTogMjAxOC0wOC0xMSAyMzoxMDo0N1xuICogQExhc3QgTW9kaWZpZWQgYnk6IHlobFxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAyMS0wNS0xNCAxNjoxMjozMlxuICovXG5pbXBvcnQgY29uZmlnIGZyb20gJ2NvbmZpZydcbmltcG9ydCBTZXF1ZWxpemUgZnJvbSAnc2VxdWVsaXplJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vbGliL3VzZXInXG5pbXBvcnQgaGVscGVyIGZyb20gJy4vaGVscGVyJ1xuaW1wb3J0IFVzZXJNZXRlcnNNb2RlbCBmcm9tICcuLi9tb2RlbHMvdXNlcl9tZXRlcnMnXG5cbmNvbnN0IE1ldGVyREIgPSBVc2VyTWV0ZXJzTW9kZWwoaGVscGVyLmRiLCBTZXF1ZWxpemUpXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VyTWV0ZXIgKHVpZDogbnVtYmVyKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHVpZCwgY29uZmlnKVxuICAgIGNvbnN0IHVzZXJNZXRlcnMgPSBhd2FpdCB1c2VyLmdldFVzZXJNZXRlcigpXG4gICAgaWYgKHVzZXJNZXRlcnMpIHtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB1c2VyTWV0ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCB1c2VyTWV0ZXIgPSB1c2VyTWV0ZXJzW2luZGV4XVxuICAgICAgICBjb25zdCBtZXRlckRCID0gYXdhaXQgTWV0ZXJEQi5maW5kT25lKHsgd2hlcmU6IHsgbWlkOiB1c2VyTWV0ZXIubWlkIH0sIGF0dHJpYnV0ZXM6IFsnbWlkJ10gfSlcbiAgICAgICAgYXdhaXQgaGVscGVyLnVwZGF0ZU9yQ3JlYXRlKE1ldGVyREIsIG1ldGVyREIsIHVzZXJNZXRlciwgeyB1c2VyX2lkOiB1aWQgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihgdXBkYXRlIHVzZXIgbWV0ZXIgZXJyb3I6ICR7dWlkfWApXG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQgKCkge1xuICBjb25zdCBsZW4gPSBOdW1iZXIoY29uZmlnLmdldCgnbWF4VWlkJykpXG4gIGxldCBhbGxQcm9taXNlID0gW11cbiAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8PSBsZW47IGluZGV4KyspIHtcbiAgICBjb25zdCB1aWQgPSBpbmRleFxuICAgIGNvbnN0IG1heExlbiA9IE51bWJlcihjb25maWcuZ2V0KCdtYXhQcm9taXNlJykpXG4gICAgaWYgKGFsbFByb21pc2UubGVuZ3RoID49IG1heExlbiB8fCBpbmRleCA9PT0gbGVuKSB7XG4gICAgICBhbGxQcm9taXNlLnB1c2godXBkYXRlVXNlck1ldGVyKHVpZCkpXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChhbGxQcm9taXNlKVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZSB1c2VyIG1ldGVyIGVycm9yICEgISAhJylcbiAgICAgIH1cbiAgICAgIGFsbFByb21pc2UgPSBbXVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGxQcm9taXNlLnB1c2godXBkYXRlVXNlck1ldGVyKHVpZCkpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YXJ0XG4iXX0=