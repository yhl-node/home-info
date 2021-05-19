"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:51
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:31:21
 */
const config_1 = __importDefault(require("config"));
const sequelize_1 = __importDefault(require("sequelize"));
const meter_1 = __importDefault(require("../lib/meter"));
const helper_1 = __importDefault(require("./helper"));
const user_meters_1 = __importDefault(require("../models/user_meters"));
const meters_charge_log_1 = __importDefault(require("../models/meters_charge_log"));
const MeterDB = user_meters_1.default(helper_1.default.db, sequelize_1.default);
const MeterChargeLog = meters_charge_log_1.default(helper_1.default.db, sequelize_1.default);
async function updateMeterInfo(mid) {
    try {
        const meter = new meter_1.default(mid, config_1.default);
        const meterInfo = await meter.getChargeInfo();
        if (meterInfo) {
            await Promise.all(meterInfo.map((meterInfo) => MeterChargeLog.create(Object.assign(meterInfo, { meter_id: mid }))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2pvYnMvY2hhcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7O0dBS0c7QUFDSCxvREFBMkI7QUFDM0IsMERBQWlDO0FBQ2pDLHlEQUFnQztBQUNoQyxzREFBNkI7QUFDN0Isd0VBQW1EO0FBQ25ELG9GQUE4RDtBQUU5RCxNQUFNLE9BQU8sR0FBRyxxQkFBZSxDQUFDLGdCQUFNLENBQUMsRUFBRSxFQUFFLG1CQUFTLENBQUMsQ0FBQTtBQUNyRCxNQUFNLGNBQWMsR0FBRywyQkFBb0IsQ0FBQyxnQkFBTSxDQUFDLEVBQUUsRUFBRSxtQkFBUyxDQUFDLENBQUE7QUFFakUsS0FBSyxVQUFVLGVBQWUsQ0FBRSxHQUFXO0lBQ3pDLElBQUk7UUFDRixNQUFNLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQyxHQUFHLEVBQUUsZ0JBQU0sQ0FBQyxDQUFBO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQzdDLElBQUksU0FBUyxFQUFFO1lBQ2IsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFjLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUN6SDtLQUNGO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixHQUFHLEVBQUUsQ0FBQyxDQUFBO0tBQzVDO0FBQ0gsQ0FBQztBQUVELEtBQUssVUFBVSxLQUFLO0lBQ2xCLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMvRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFBO0lBQzNCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQTtJQUNuQixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3pDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO1FBQ25DLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQy9DLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxNQUFNLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtZQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3JDLElBQUk7Z0JBQ0YsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO2FBQzlCO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO2FBQzNDO1lBQ0QsVUFBVSxHQUFHLEVBQUUsQ0FBQTtTQUNoQjthQUFNO1lBQ0wsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUN0QztLQUNGO0FBQ0gsQ0FBQztBQUVELGtCQUFlLEtBQUssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiB5aGwsIHlobEAxMDI0aHcub3JnXG4gKiBARGF0ZTogMjAxOC0wOC0xMSAyMzoxMDo1MVxuICogQExhc3QgTW9kaWZpZWQgYnk6IHlobFxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAyMS0wNS0xNCAxNjozMToyMVxuICovXG5pbXBvcnQgY29uZmlnIGZyb20gJ2NvbmZpZydcbmltcG9ydCBTZXF1ZWxpemUgZnJvbSAnc2VxdWVsaXplJ1xuaW1wb3J0IE1ldGVyIGZyb20gJy4uL2xpYi9tZXRlcidcbmltcG9ydCBoZWxwZXIgZnJvbSAnLi9oZWxwZXInXG5pbXBvcnQgVXNlck1ldGVyc01vZGVsIGZyb20gJy4uL21vZGVscy91c2VyX21ldGVycydcbmltcG9ydCBNZXRlcnNDaGFyZ2VMb2dNb2RlbCBmcm9tICcuLi9tb2RlbHMvbWV0ZXJzX2NoYXJnZV9sb2cnXG5cbmNvbnN0IE1ldGVyREIgPSBVc2VyTWV0ZXJzTW9kZWwoaGVscGVyLmRiLCBTZXF1ZWxpemUpXG5jb25zdCBNZXRlckNoYXJnZUxvZyA9IE1ldGVyc0NoYXJnZUxvZ01vZGVsKGhlbHBlci5kYiwgU2VxdWVsaXplKVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVNZXRlckluZm8gKG1pZDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbWV0ZXIgPSBuZXcgTWV0ZXIobWlkLCBjb25maWcpXG4gICAgY29uc3QgbWV0ZXJJbmZvID0gYXdhaXQgbWV0ZXIuZ2V0Q2hhcmdlSW5mbygpXG4gICAgaWYgKG1ldGVySW5mbykge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobWV0ZXJJbmZvLm1hcCgobWV0ZXJJbmZvOiBhbnkpID0+IE1ldGVyQ2hhcmdlTG9nLmNyZWF0ZShPYmplY3QuYXNzaWduKG1ldGVySW5mbywgeyBtZXRlcl9pZDogbWlkIH0pKSkpXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoYHVwZGF0ZSBtZXRlciBlcnJvcjogJHttaWR9YClcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzdGFydCAoKSB7XG4gIGNvbnN0IGFsbE1ldGVyID0gYXdhaXQgTWV0ZXJEQi5maW5kQWxsKHsgYXR0cmlidXRlczogWydtaWQnXSB9KVxuICBjb25zdCBsZW4gPSBhbGxNZXRlci5sZW5ndGhcbiAgbGV0IGFsbFByb21pc2UgPSBbXVxuICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDw9IGxlbjsgaW5kZXgrKykge1xuICAgIGNvbnN0IG1pZCA9IGFsbE1ldGVyW2luZGV4IC0gMV0ubWlkXG4gICAgY29uc3QgbWF4TGVuID0gTnVtYmVyKGNvbmZpZy5nZXQoJ21heFByb21pc2UnKSlcbiAgICBpZiAoYWxsUHJvbWlzZS5sZW5ndGggPj0gbWF4TGVuIHx8IGluZGV4ID09PSBsZW4pIHtcbiAgICAgIGFsbFByb21pc2UucHVzaCh1cGRhdGVNZXRlckluZm8obWlkKSlcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGFsbFByb21pc2UpXG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigndXBkYXRlIG1ldGVyIGZhaWxlZCAhICEgIScpXG4gICAgICB9XG4gICAgICBhbGxQcm9taXNlID0gW11cbiAgICB9IGVsc2Uge1xuICAgICAgYWxsUHJvbWlzZS5wdXNoKHVwZGF0ZU1ldGVySW5mbyhtaWQpKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFydFxuIl19