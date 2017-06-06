"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should get one of the DB', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ 'id': i }); });
        gen.DB = { hello: data };
        res = gen.hasOne({ hasOne: 'hello' });
        t.true(data.indexOf(res) > -1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get one of the DB, and one field of that entity', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ 'id': i }); });
        gen.DB = { hello: data };
        res = gen.hasOne({ hasOne: 'hello', get: 'id' });
        t.true(res !== undefined);
        t.true(res !== null);
        t.true(res <= 10);
        t.true(res >= 0);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmhhc09uZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0cy9HZW5lcmF0b3IuaGFzT25lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQXdCQTs7O0FBeEJBLDJCQUEwQjtBQUMxQiwyQkFBa0M7QUFHbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFTLEVBQUUsQ0FBQTtBQUUzQixVQUFJLENBQUMsMEJBQTBCLEVBQUUsVUFBTSxDQUFDO1FBQ2hDLElBQUksRUFHSixHQUFHOztlQUhJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFFLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFiLENBQWEsQ0FBRTtRQUNuRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFBO2NBRWQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7O0tBQ2pDLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQyx3REFBd0QsRUFBRSxVQUFNLENBQUM7UUFDOUQsSUFBSSxFQUdKLEdBQUc7O2VBSEksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQUUsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQWIsQ0FBYSxDQUFFO1FBQ25FLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUE7Y0FFZCxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDcEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDLENBQUE7UUFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUE7UUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUE7OztLQUNuQixDQUFDLENBQUEifQ==