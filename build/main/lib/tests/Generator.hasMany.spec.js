"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should get many from the DB with max', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ 'id': i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            max: 2
        });
        res.forEach(function (r) { return t.true(data.indexOf(r) > -1); });
        t.true(res.length <= 2);
        t.true(res.length >= 1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get many from the DB with min', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ 'id': i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            max: 10,
            min: 4
        });
        res.forEach(function (r) { return t.true(data.indexOf(r) > -1); });
        t.true(res.length <= 10);
        t.true(res.length >= 4);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get many from the DB with fixed amount', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ 'id': i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            amount: 5
        });
        res.forEach(function (r) { return t.true(data.indexOf(r) > -1); });
        t.true(res.length === 5);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get many from the DB, and one field of each entity', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ 'id': i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            get: 'id',
            amount: 1
        });
        t.true(typeof res[0] === 'number');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmhhc01hbnkuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdGVzdHMvR2VuZXJhdG9yLmhhc01hbnkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBNkRBOzs7QUE3REEsMkJBQTBCO0FBQzFCLDJCQUFrQztBQUdsQyxJQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVMsRUFBRSxDQUFBO0FBRTNCLFVBQUksQ0FBQyxzQ0FBc0MsRUFBRSxVQUFNLENBQUM7UUFDNUMsSUFBSSxFQUdKLEdBQUc7O2VBSEksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQUUsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQWIsQ0FBYSxDQUFFO1FBQ25FLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUE7Y0FFZCxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQ2xCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEdBQUcsRUFBRSxDQUFDO1NBQ1QsQ0FBQztRQUVGLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBNUIsQ0FBNEIsQ0FBRSxDQUFBO1FBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUE7OztLQUMxQixDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsc0NBQXNDLEVBQUUsVUFBTSxDQUFDO1FBQzVDLElBQUksRUFHSixHQUFHOztlQUhJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFFLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFiLENBQWEsQ0FBRTtRQUNuRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFBO2NBRWQsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUNsQixPQUFPLEVBQUUsT0FBTztZQUNoQixHQUFHLEVBQUUsRUFBRTtZQUNQLEdBQUcsRUFBRSxDQUFDO1NBQ1QsQ0FBQztRQUVGLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBNUIsQ0FBNEIsQ0FBRSxDQUFBO1FBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUE7OztLQUMxQixDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsK0NBQStDLEVBQUUsVUFBTSxDQUFDO1FBQ3JELElBQUksRUFHSixHQUFHOztlQUhJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFFLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFiLENBQWEsQ0FBRTtRQUNuRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFBO2NBRWQsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUNsQixPQUFPLEVBQUUsT0FBTztZQUNoQixNQUFNLEVBQUUsQ0FBQztTQUNaLENBQUM7UUFFRixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQTVCLENBQTRCLENBQUUsQ0FBQTtRQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUE7OztLQUMzQixDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsMkRBQTJELEVBQUUsVUFBTSxDQUFDO1FBQ2pFLElBQUksRUFHSixHQUFHOztlQUhJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFFLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFiLENBQWEsQ0FBRTtRQUNuRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFBO2NBRWQsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUNsQixPQUFPLEVBQUUsT0FBTztZQUNoQixHQUFHLEVBQUUsSUFBSTtZQUNULE1BQU0sRUFBRSxDQUFDO1NBRVosQ0FBQztRQUVGLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUE7OztLQUNyQyxDQUFDLENBQUEifQ==