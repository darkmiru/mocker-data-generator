"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
ava_1.test('Should be "lorem.words"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "lorem.words()"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words()' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "lorem.words(1)"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words(1)' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "random.number({"max": 1})"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'random.number({"max": 1})' });
        t.true(typeof res === 'number');
        t.true(res <= 1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "random.number({"min": 1, "max": 2})"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'random.number({"min": 1, "max": 2})' });
        t.true(typeof res === 'number');
        t.true(res <= 2);
        t.true(res >= 1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "lorem.words()[0]"', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words()[0]' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should be "lorem.words(1)[0]""', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.faker({ faker: 'lorem.words(1)[0]' });
        t.true(typeof res === 'string');
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmZha2VyanMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdGVzdHMvR2VuZXJhdG9yLmZha2VyanMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBMENBOzs7QUExQ0EsMkJBQTBCO0FBQzFCLDJCQUFrQztBQUVsQyxJQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVMsRUFBRSxDQUFBO0FBRTNCLFVBQUksQ0FBQyx5QkFBeUIsRUFBRSxVQUFNLENBQUM7UUFDL0IsR0FBRzs7Y0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDO1FBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUE7OztLQUNsQyxDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsMkJBQTJCLEVBQUUsVUFBTSxDQUFDO1FBQ2pDLEdBQUc7O2NBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQztRQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBOzs7S0FDbEMsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLDRCQUE0QixFQUFFLFVBQU0sQ0FBQztRQUNsQyxHQUFHOztjQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztRQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBOzs7S0FDbEMsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLHVDQUF1QyxFQUFFLFVBQU0sQ0FBQztRQUM3QyxHQUFHOztjQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQztRQUMzRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBO1FBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBOzs7S0FDbkIsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLGlEQUFpRCxFQUFFLFVBQU0sQ0FBQztRQUN2RCxHQUFHOztjQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUscUNBQXFDLEVBQUUsQ0FBQztRQUNyRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBO1FBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBOzs7S0FDbkIsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLDhCQUE4QixFQUFFLFVBQU0sQ0FBQztRQUNwQyxHQUFHOztjQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQztRQUNsRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBOzs7S0FDbEMsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLGdDQUFnQyxFQUFFLFVBQU0sQ0FBQztRQUN0QyxHQUFHOztjQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztRQUNuRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFBOzs7S0FDbEMsQ0FBQyxDQUFBIn0=