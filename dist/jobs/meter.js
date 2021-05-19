"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:51
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:40:00
 */
const config_1 = __importDefault(require("config"));
const sequelize_1 = __importDefault(require("sequelize"));
const meter_1 = __importDefault(require("../lib/meter"));
const helper_1 = __importDefault(require("./helper"));
const user_meters_1 = __importDefault(require("../models/user_meters"));
const meters_1 = __importDefault(require("../models/meters"));
const meters_update_log_1 = __importDefault(require("../models/meters_update_log"));
const MeterDB = user_meters_1.default(helper_1.default.db, sequelize_1.default.DataTypes);
const MeterInfoDB = meters_1.default(helper_1.default.db, sequelize_1.default);
const MeterLog = meters_update_log_1.default(helper_1.default.db, sequelize_1.default);
async function updateMeterInfo(mid) {
    try {
        const meter = new meter_1.default(mid, config_1.default);
        let [meterInfoDB, meterInfo] = await Promise.all([
            MeterInfoDB.findOne({ where: { mid: mid }, attributes: ['mid', 'meterValue'] }),
            meter.getMeterInfo()
        ]);
        meterInfo && !meterInfo.lastReadTime && (meterInfo.lastReadTime = null);
        if (meterInfo.lastReadTime && meterInfoDB) {
            meterInfo = Object.assign(meterInfo, {
                diffMeter: meterInfo.meterValue - meterInfoDB.meterValue
            });
            await Promise.all([
                helper_1.default.updateOrCreate(MeterInfoDB, meterInfoDB, meterInfo),
                MeterLog.create(meterInfo)
            ]);
        }
        else {
            await helper_1.default.updateOrCreate(MeterInfoDB, meterInfoDB, meterInfo);
        }
    }
    catch (error) {
        console.error(`update meter error: ${mid}`);
    }
}
async function start() {
    const allMeter = await MeterDB.findAll({ attributes: ['mid'] });
    const len = allMeter.length;
    let allPromise = [];
    for (let index = 1; index <= len; index++) {
        const mid = allMeter[index - 1].mid;
        const maxLen = Number(config_1.default.get('maxPromise'));
        if (allPromise.length >= maxLen || index === len) {
            allPromise.push(updateMeterInfo(mid));
            try {
                await Promise.all(allPromise);
            }
            catch (err) {
                console.error('update meter failed ! ! !');
            }
            allPromise = [];
        }
        else {
            allPromise.push(updateMeterInfo(mid));
        }
    }
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvam9icy9tZXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7OztHQUtHO0FBQ0gsb0RBQTJCO0FBQzNCLDBEQUFpQztBQUNqQyx5REFBZ0M7QUFDaEMsc0RBQTZCO0FBQzdCLHdFQUFtRDtBQUNuRCw4REFBMEM7QUFDMUMsb0ZBQThEO0FBRTlELE1BQU0sT0FBTyxHQUFHLHFCQUFlLENBQUMsZ0JBQU0sQ0FBQyxFQUFFLEVBQUUsbUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUMvRCxNQUFNLFdBQVcsR0FBRyxnQkFBVyxDQUFDLGdCQUFNLENBQUMsRUFBRSxFQUFFLG1CQUFTLENBQUMsQ0FBQTtBQUNyRCxNQUFNLFFBQVEsR0FBRywyQkFBb0IsQ0FBQyxnQkFBTSxDQUFDLEVBQUUsRUFBRSxtQkFBUyxDQUFDLENBQUE7QUFFM0QsS0FBSyxVQUFVLGVBQWUsQ0FBRSxHQUFXO0lBQ3pDLElBQUk7UUFDRixNQUFNLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQyxHQUFHLEVBQUUsZ0JBQU0sQ0FBQyxDQUFBO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQy9DLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxFQUFFLENBQUM7WUFDL0UsS0FBSyxDQUFDLFlBQVksRUFBRTtTQUNyQixDQUFDLENBQUE7UUFDRixTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUN2RSxJQUFJLFNBQVMsQ0FBQyxZQUFZLElBQUksV0FBVyxFQUFFO1lBQ3pDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDbkMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVU7YUFDekQsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNoQixnQkFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQztnQkFDMUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7YUFDM0IsQ0FBQyxDQUFBO1NBQ0g7YUFBTTtZQUNMLE1BQU0sZ0JBQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQTtTQUNqRTtLQUNGO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixHQUFHLEVBQUUsQ0FBQyxDQUFBO0tBQzVDO0FBQ0gsQ0FBQztBQUVELEtBQUssVUFBVSxLQUFLO0lBQ2xCLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMvRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFBO0lBQzNCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQTtJQUNuQixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3pDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO1FBQ25DLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQy9DLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxNQUFNLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtZQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3JDLElBQUk7Z0JBQ0YsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO2FBQzlCO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO2FBQzNDO1lBQ0QsVUFBVSxHQUFHLEVBQUUsQ0FBQTtTQUNoQjthQUFNO1lBQ0wsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUN0QztLQUNGO0FBQ0gsQ0FBQztBQUVELGtCQUFlLEtBQUssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiB5aGwsIHlobEAxMDI0aHcub3JnXG4gKiBARGF0ZTogMjAxOC0wOC0xMSAyMzoxMDo1MVxuICogQExhc3QgTW9kaWZpZWQgYnk6IHlobFxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAyMS0wNS0xNCAxNjo0MDowMFxuICovXG5pbXBvcnQgY29uZmlnIGZyb20gJ2NvbmZpZydcbmltcG9ydCBTZXF1ZWxpemUgZnJvbSAnc2VxdWVsaXplJ1xuaW1wb3J0IE1ldGVyIGZyb20gJy4uL2xpYi9tZXRlcidcbmltcG9ydCBoZWxwZXIgZnJvbSAnLi9oZWxwZXInXG5pbXBvcnQgVXNlck1ldGVyc01vZGVsIGZyb20gJy4uL21vZGVscy91c2VyX21ldGVycydcbmltcG9ydCBNZXRlcnNNb2RlbCBmcm9tICcuLi9tb2RlbHMvbWV0ZXJzJ1xuaW1wb3J0IE1ldGVyc1VwZGF0ZUxvZ01vZGVsIGZyb20gJy4uL21vZGVscy9tZXRlcnNfdXBkYXRlX2xvZydcblxuY29uc3QgTWV0ZXJEQiA9IFVzZXJNZXRlcnNNb2RlbChoZWxwZXIuZGIsIFNlcXVlbGl6ZS5EYXRhVHlwZXMpXG5jb25zdCBNZXRlckluZm9EQiA9IE1ldGVyc01vZGVsKGhlbHBlci5kYiwgU2VxdWVsaXplKVxuY29uc3QgTWV0ZXJMb2cgPSBNZXRlcnNVcGRhdGVMb2dNb2RlbChoZWxwZXIuZGIsIFNlcXVlbGl6ZSlcblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWV0ZXJJbmZvIChtaWQ6IHN0cmluZykge1xuICB0cnkge1xuICAgIGNvbnN0IG1ldGVyID0gbmV3IE1ldGVyKG1pZCwgY29uZmlnKVxuICAgIGxldCBbbWV0ZXJJbmZvREIsIG1ldGVySW5mb10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBNZXRlckluZm9EQi5maW5kT25lKHsgd2hlcmU6IHsgbWlkOiBtaWQgfSwgYXR0cmlidXRlczogWydtaWQnLCAnbWV0ZXJWYWx1ZSddIH0pLFxuICAgICAgbWV0ZXIuZ2V0TWV0ZXJJbmZvKClcbiAgICBdKVxuICAgIG1ldGVySW5mbyAmJiAhbWV0ZXJJbmZvLmxhc3RSZWFkVGltZSAmJiAobWV0ZXJJbmZvLmxhc3RSZWFkVGltZSA9IG51bGwpXG4gICAgaWYgKG1ldGVySW5mby5sYXN0UmVhZFRpbWUgJiYgbWV0ZXJJbmZvREIpIHtcbiAgICAgIG1ldGVySW5mbyA9IE9iamVjdC5hc3NpZ24obWV0ZXJJbmZvLCB7XG4gICAgICAgIGRpZmZNZXRlcjogbWV0ZXJJbmZvLm1ldGVyVmFsdWUgLSBtZXRlckluZm9EQi5tZXRlclZhbHVlXG4gICAgICB9KVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBoZWxwZXIudXBkYXRlT3JDcmVhdGUoTWV0ZXJJbmZvREIsIG1ldGVySW5mb0RCLCBtZXRlckluZm8pLFxuICAgICAgICBNZXRlckxvZy5jcmVhdGUobWV0ZXJJbmZvKVxuICAgICAgXSlcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgaGVscGVyLnVwZGF0ZU9yQ3JlYXRlKE1ldGVySW5mb0RCLCBtZXRlckluZm9EQiwgbWV0ZXJJbmZvKVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGB1cGRhdGUgbWV0ZXIgZXJyb3I6ICR7bWlkfWApXG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQgKCkge1xuICBjb25zdCBhbGxNZXRlciA9IGF3YWl0IE1ldGVyREIuZmluZEFsbCh7IGF0dHJpYnV0ZXM6IFsnbWlkJ10gfSlcbiAgY29uc3QgbGVuID0gYWxsTWV0ZXIubGVuZ3RoXG4gIGxldCBhbGxQcm9taXNlID0gW11cbiAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8PSBsZW47IGluZGV4KyspIHtcbiAgICBjb25zdCBtaWQgPSBhbGxNZXRlcltpbmRleCAtIDFdLm1pZFxuICAgIGNvbnN0IG1heExlbiA9IE51bWJlcihjb25maWcuZ2V0KCdtYXhQcm9taXNlJykpXG4gICAgaWYgKGFsbFByb21pc2UubGVuZ3RoID49IG1heExlbiB8fCBpbmRleCA9PT0gbGVuKSB7XG4gICAgICBhbGxQcm9taXNlLnB1c2godXBkYXRlTWV0ZXJJbmZvKG1pZCkpXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChhbGxQcm9taXNlKVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZSBtZXRlciBmYWlsZWQgISAhICEnKVxuICAgICAgfVxuICAgICAgYWxsUHJvbWlzZSA9IFtdXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsbFByb21pc2UucHVzaCh1cGRhdGVNZXRlckluZm8obWlkKSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhcnRcbiJdfQ==