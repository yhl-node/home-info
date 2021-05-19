"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:57
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:09:58
 */
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("config"));
const sequelize = new sequelize_1.Sequelize({
    host: config_1.default.get('mysql.host'),
    username: config_1.default.get('mysql.user'),
    password: config_1.default.get('mysql.pwd'),
    database: config_1.default.get('mysql.db'),
    dialect: 'mysql',
    define: { timestamps: false },
    logging: false
});
function updateOrCreate(model, obj, info, addInfo = {}) {
    if (obj) {
        return obj.update(info);
    }
    else if (info) {
        return model.create(Object.assign(info, addInfo));
    }
}
exports.default = {
    db: sequelize,
    updateOrCreate
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2pvYnMvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7O0dBS0c7QUFDSCx5Q0FBcUM7QUFDckMsb0RBQTJCO0FBRTNCLE1BQU0sU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQztJQUM5QixJQUFJLEVBQUUsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQzlCLFFBQVEsRUFBRSxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDbEMsUUFBUSxFQUFFLGdCQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUNqQyxRQUFRLEVBQUUsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ2hDLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7SUFDN0IsT0FBTyxFQUFFLEtBQUs7Q0FDZixDQUFDLENBQUE7QUFFRixTQUFTLGNBQWMsQ0FBRSxLQUFVLEVBQUUsR0FBUSxFQUFFLElBQVMsRUFBRSxPQUFPLEdBQUcsRUFBRTtJQUNwRSxJQUFJLEdBQUcsRUFBRTtRQUNQLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUN4QjtTQUFNLElBQUksSUFBSSxFQUFFO1FBQ2YsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7S0FDbEQ7QUFDSCxDQUFDO0FBRUQsa0JBQWU7SUFDYixFQUFFLEVBQUUsU0FBUztJQUNiLGNBQWM7Q0FDZixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBBdXRob3I6IHlobCwgeWhsQDEwMjRody5vcmdcbiAqIEBEYXRlOiAyMDE4LTA4LTExIDIzOjEwOjU3XG4gKiBATGFzdCBNb2RpZmllZCBieTogeWhsXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDIxLTA1LTE0IDE2OjA5OjU4XG4gKi9cbmltcG9ydCB7IFNlcXVlbGl6ZSB9IGZyb20gJ3NlcXVlbGl6ZSdcbmltcG9ydCBjb25maWcgZnJvbSAnY29uZmlnJ1xuXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKHtcbiAgaG9zdDogY29uZmlnLmdldCgnbXlzcWwuaG9zdCcpLFxuICB1c2VybmFtZTogY29uZmlnLmdldCgnbXlzcWwudXNlcicpLFxuICBwYXNzd29yZDogY29uZmlnLmdldCgnbXlzcWwucHdkJyksXG4gIGRhdGFiYXNlOiBjb25maWcuZ2V0KCdteXNxbC5kYicpLFxuICBkaWFsZWN0OiAnbXlzcWwnLFxuICBkZWZpbmU6IHsgdGltZXN0YW1wczogZmFsc2UgfSxcbiAgbG9nZ2luZzogZmFsc2Vcbn0pXG5cbmZ1bmN0aW9uIHVwZGF0ZU9yQ3JlYXRlIChtb2RlbDogYW55LCBvYmo6IGFueSwgaW5mbzogYW55LCBhZGRJbmZvID0ge30pIHtcbiAgaWYgKG9iaikge1xuICAgIHJldHVybiBvYmoudXBkYXRlKGluZm8pXG4gIH0gZWxzZSBpZiAoaW5mbykge1xuICAgIHJldHVybiBtb2RlbC5jcmVhdGUoT2JqZWN0LmFzc2lnbihpbmZvLCBhZGRJbmZvKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRiOiBzZXF1ZWxpemUsXG4gIHVwZGF0ZU9yQ3JlYXRlXG59XG4iXX0=