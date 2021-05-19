/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:57
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-19 14:23:40
 */

function updateOrCreate (model: any, obj: any, info: any, addInfo = {}) {
  if (obj) {
    return obj.update(info)
  } else if (info) {
    return model.create(Object.assign(info, addInfo))
  }
}

export default {
  updateOrCreate
}
