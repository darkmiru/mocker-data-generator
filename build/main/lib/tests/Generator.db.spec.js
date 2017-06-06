"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should have access to db', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = { hello: 'world' };
        res = gen.db({ db: 'hello' });
        t.true(res === 'world');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmRiLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL0dlbmVyYXRvci5kYi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFhQTs7O0FBYkEsMkJBQTBCO0FBQzFCLDJCQUFrQztBQUdsQyxJQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVMsRUFBRSxDQUFBO0FBRTNCLFVBQUksQ0FBQywwQkFBMEIsRUFBRSxVQUFNLENBQUM7UUFHaEMsR0FBRzs7UUFGUCxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxDQUFBO2NBRWhCLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLENBQUE7OztLQUUxQixDQUFDLENBQUEifQ==