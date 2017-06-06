"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var utils_1 = require("../utils");
var schema = new _1.Schema('test', {}, {});
var arrayGenerationFixed = function (arrayModel, result) {
    var length = 10;
    var arrResult = Array.from(new Array(10)).map(function (_, index) { return result; });
    var arr = [];
    for (var i = 0; i < arrayModel.length; i++) {
        arr.push(result);
    }
    var situation = {
        test: [tslib_1.__assign({}, arrayModel, { length: 10, fixedLength: true })]
    };
    return {
        model: situation,
        expectedResult: {
            test: arrResult
        }
    };
};
ava_1.test('Array: It should recognise static field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, model, expectedResult, schema, data;
    return tslib_1.__generator(this, function (_b) {
        _a = arrayGenerationFixed({ static: 'hello' }, 'hello'), model = _a.model, expectedResult = _a.expectedResult;
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should recognise arrow function field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, model, expectedResult, schema, data;
    return tslib_1.__generator(this, function (_b) {
        _a = arrayGenerationFixed({ function: function () { return 'hello'; } }, 'hello'), model = _a.model, expectedResult = _a.expectedResult;
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should recognise normal function field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, model, expectedResult, schema, data;
    return tslib_1.__generator(this, function (_b) {
        _a = arrayGenerationFixed({ function: function () { return 'hello'; } }, 'hello'), model = _a.model, expectedResult = _a.expectedResult;
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: Should generate fixed length', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var expectedResult, model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        expectedResult = {
            test: Array.from(new Array(10)).map(function (_) { return 'test'; })
        };
        model = {
            test: [{
                    static: 'test',
                    length: 10,
                    fixedLength: true
                }]
        };
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: Should generate function length', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        model = {
            test: [{
                    static: 'test',
                    length: function () { return 10; }
                }]
        };
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.true(data[0].test.length === 10);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: Should generate dynamic length', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        model = {
            test: [{
                    static: 'test',
                    length: 10
                }]
        };
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.true(data[0].test.length <= 10);
        t.true(data[0].test.length > 0);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should recognise index param in normal function field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var expectedResult, model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        expectedResult = {
            test: Array.from(new Array(10)).map(function (_, index) { return index; })
        };
        model = {
            test: [{
                    function: function (i) { return i; },
                    length: 10,
                    fixedLength: true
                }]
        };
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should recognise index param in arrow function field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var expectedResult, model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        expectedResult = {
            test: Array.from(new Array(10)).map(function (_, index) { return index; })
        };
        model = {
            test: [{
                    function: function (i) { return i; },
                    length: 10,
                    fixedLength: true
                }]
        };
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should recognise context in function field', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        model = {
            test: [{
                    function: function () { return tslib_1.__assign({}, this); },
                    length: 10,
                    fixedLength: true
                }]
        };
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        data[0].test.forEach(function (d) {
            var keys = Object.keys(d);
            t.deepEqual(keys, ['object', 'db', 'faker', 'chance', 'casual', 'randexp']);
        });
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: Function generator should include index and length', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var expectedResult, model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        expectedResult = {
            test: Array.from(new Array(10)).map(function (_, index) { return ({ index: index, length: 10 }); })
        };
        model = {
            test: [{
                    function: function (index, length, self) {
                        return {
                            index: index,
                            length: length
                        };
                    },
                    fixedLength: true,
                    length: 10
                }]
        };
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: Function generator should include self too', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var expectedResult, model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        expectedResult = {
            test: Array.from(new Array(10)).map(function (_, index) { return 'hello'; })
        };
        model = {
            test: [{
                    function: function (index, length, self) {
                        t.deepEqual(self, Array.from(new Array(index)).map(function (_, index) { return 'hello'; }));
                        return 'hello';
                    },
                    fixedLength: true,
                    length: 10
                }]
        };
        schema = new _1.Schema('web', model, 1);
        data = schema.build();
        t.deepEqual(data[0], expectedResult);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should concat elements', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var model, schema, data;
    return tslib_1.__generator(this, function (_a) {
        model = {
            name: {
                values: ['txuri', 'pitxi', 'kitty']
            },
            emails: [{
                    faker: 'lorem.words()[0]',
                    length: 10,
                    concat: '[object.name, object.name]'
                }]
        };
        schema = new _1.Schema('test', model, 1);
        data = schema.build();
        t.true(utils_1.isArray(data[0].emails));
        t.true(data[0].emails.length < 13);
        t.true(data[0].emails.length > 2);
        return [2 /*return*/];
    });
}); });
/*
// TODO: check this behaviour
test('Should generate correctly with 2 ways of Array specification', async t => {
    let values = ['txuri', 'pitxi', 'kitty']
    let model = {
        name: {
            values,
        },
        name2: values
    }

    let schema = new Schema('test', model, 1)
    let data = schema.build()
    console.log(data[0])
    t.true(values.indexOf(data[0].name) > -1)
    t.true(values.indexOf(data[0].name2) > -1)
})*/
ava_1.test('Array: It should concatenated strings but not repeat same element itself (concatStrict)', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var model, schema, data, appeared;
    return tslib_1.__generator(this, function (_a) {
        model = {
            name: {
                values: ['txuri', 'pitxi', 'kitty']
            },
            emails: [{
                    faker: 'lorem.words()[0]',
                    length: 4,
                    concat: '[object.name, object.name]',
                    concatStrict: true,
                    fixedLength: true
                }]
        };
        schema = new _1.Schema('test', model, 1);
        data = schema.build();
        t.true(utils_1.isArray(data[0].emails));
        t.true(data[0].emails.length === 4);
        appeared = 0;
        data[0].emails.forEach(function (d) {
            appeared = (d === data[0].name) ? appeared + 1 : appeared;
        });
        t.true(appeared === 1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Array: It should concatenated strings but increase the length if it is fixed', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var model, schema, data, appeared;
    return tslib_1.__generator(this, function (_a) {
        model = {
            name: {
                values: ['txuri', 'pitxi', 'kitty']
            },
            emails: [{
                    faker: 'lorem.words()[0]',
                    length: 10,
                    concat: '[object.name, object.name]',
                    fixedLength: true
                }]
        };
        schema = new _1.Schema('test', model, 1);
        data = schema.build();
        t.true(utils_1.isArray(data[0].emails));
        t.true(data[0].emails.length === 10);
        appeared = 0;
        data[0].emails.forEach(function (d) {
            appeared = (d === data[0].name) ? appeared + 1 : appeared;
        });
        t.true(appeared === 2);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLkFycmF5LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL1NjaGVtYS5BcnJheS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFrVEE7OztBQWxUQSwyQkFBMEI7QUFDMUIsMkJBQStCO0FBQy9CLGtDQUE0QztBQUU1QyxJQUFJLE1BQU0sR0FBRyxJQUFJLFNBQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBRXZDLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxVQUFVLEVBQUUsTUFBTTtJQUM1QyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFFZixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUUsQ0FBQyxFQUFFLEtBQUssSUFBSyxPQUFBLE1BQU0sRUFBTixDQUFNLENBQUUsQ0FBQTtJQUVyRSxJQUFJLEdBQUcsR0FBVSxFQUFFLENBQUE7SUFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDekMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNwQixDQUFDO0lBRUQsSUFBSSxTQUFTLEdBQUc7UUFDWixJQUFJLEVBQUUsc0JBQU0sVUFBVSxJQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksSUFBRztLQUMzRCxDQUFBO0lBRUQsTUFBTSxDQUFDO1FBQ0gsS0FBSyxFQUFFLFNBQVM7UUFDaEIsY0FBYyxFQUFFO1lBQ1osSUFBSSxFQUFFLFNBQVM7U0FDbEI7S0FDSixDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsVUFBSSxDQUFDLHlDQUF5QyxFQUFFLFVBQU0sQ0FB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