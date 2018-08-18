/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-18 17:23:41
 * @Last Modified by:   yhl
 * @Last Modified time: 2018-08-18 17:23:41
 */
test('func-unit', () => {
  const response = 1 + 1
  expect(response).toBe(2)
  expect(response).toEqual(2)
})
