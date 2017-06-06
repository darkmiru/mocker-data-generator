"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var utils_1 = require("../utils");
var gen = new _1.Generator();
ava_1.test('Normal Function', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () {
                return 'test';
            }
        });
        t.true(typeof res === 'string');
        t.true(res === 'test');
        return [2 /*return*/];
    });
}); });
ava_1.test('ES6 Function', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () { return 'test'; }
        });
        t.true(typeof res === 'string');
        t.true(res === 'test');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should call function with context', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res, ctx;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () {
                return this;
            }
        });
        t.true(utils_1.isObject(res));
        ctx = ['object', 'db', 'faker', 'chance', 'casual', 'randexp'];
        t.true(utils_1.isObject(res));
        ctx.forEach(function (c) { return t.true(res.hasOwnProperty(c)); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmZ1bmN0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL0dlbmVyYXRvci5mdW5jdGlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFzQ0E7OztBQXRDQSwyQkFBMEI7QUFDMUIsMkJBQWtDO0FBQ2xDLGtDQUE0QztBQUU1QyxJQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVMsRUFBRSxDQUFBO0FBRTNCLFVBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFNLENBQUM7UUFDdkIsR0FBRzs7Y0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQ25CLFFBQVEsRUFBRTtnQkFDTixNQUFNLENBQUMsTUFBTSxDQUFBO1lBQ2pCLENBQUM7U0FDSixDQUFDO1FBRUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsQ0FBQTs7O0tBQ3pCLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQyxjQUFjLEVBQUUsVUFBTSxDQUFDO1FBQ3BCLEdBQUc7O2NBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUNuQixRQUFRLEVBQUUsY0FBTSxPQUFBLE1BQU0sRUFBTixDQUFNO1NBQ3pCLENBQUM7UUFFRixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBO1FBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLE1BQU0sQ0FBQyxDQUFBOzs7S0FDekIsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLG1DQUFtQyxFQUFFLFVBQU0sQ0FBQztRQUN6QyxHQUFHLEVBT0gsR0FBRzs7Y0FQRyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQ25CLFFBQVEsRUFBRTtnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFBO1lBQ2YsQ0FBQztTQUNKLENBQUM7UUFFRixDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtjQUNYLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDckIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUE7OztLQUNsRCxDQUFDLENBQUEifQ==