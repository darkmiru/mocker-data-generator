"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should works', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var values, res;
    return tslib_1.__generator(this, function (_a) {
        values = ['test', 'this', 'awesome', 'module'];
        res = gen.values({ values: values });
        t.true(typeof res === 'string');
        t.true(values.indexOf(res) > -1);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLnZhbHVlcy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0cy9HZW5lcmF0b3IudmFsdWVzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQVlBOzs7QUFaQSwyQkFBMEI7QUFDMUIsMkJBQWtDO0FBR2xDLElBQU0sR0FBRyxHQUFHLElBQUksWUFBUyxFQUFFLENBQUE7QUFFM0IsVUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFNLENBQUM7UUFDcEIsTUFBTSxFQUNOLEdBQUc7O2lCQURNLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO2NBQ3hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUE7UUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7OztLQUNuQyxDQUFDLENBQUEifQ==