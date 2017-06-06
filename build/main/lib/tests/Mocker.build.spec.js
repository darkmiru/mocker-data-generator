"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
ava_1.test('Should build with callback', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var result, mock;
    return tslib_1.__generator(this, function (_a) {
        result = {
            users: [{
                    hello: 'world'
                }]
        };
        mock = new _1.Mocker();
        mock.schema('users', { hello: { static: 'world' } }, 1);
        mock.build(function (db) { return t.deepEqual(db, result); });
        return [2 /*return*/];
    });
}); });
ava_1.test('Should build with await (Promised)', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var result, mock, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = {
                    users: [{
                            hello: 'world'
                        }]
                };
                mock = new _1.Mocker();
                return [4 /*yield*/, mock
                        .schema('users', { hello: { static: 'world' } }, 1)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db, result);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should build with Promised old style', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var result, mock;
    return tslib_1.__generator(this, function (_a) {
        result = {
            users: [{
                    hello: 'world'
                }]
        };
        mock = new _1.Mocker();
        mock
            .schema('users', { hello: { static: 'world' } }, 1)
            .build()
            .then(function (db) { return t.deepEqual(db, result); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja2VyLmJ1aWxkLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL01vY2tlci5idWlsZC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkEwQ0E7OztBQTFDQSwyQkFBMEI7QUFDMUIsMkJBQXVDO0FBR3ZDLFVBQUksQ0FBQyw0QkFBNEIsRUFBRSxVQUFNLENBQUM7UUFDbEMsTUFBTSxFQUtOLElBQUk7O2lCQUxLO1lBQ1QsS0FBSyxFQUFFLENBQUM7b0JBQ0osS0FBSyxFQUFFLE9BQU87aUJBQ2pCLENBQUM7U0FDTDtlQUNVLElBQUksU0FBTSxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUE7OztLQUM1QyxDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsb0NBQW9DLEVBQUUsVUFBTSxDQUFDO1FBQzFDLE1BQU0sRUFLTixJQUFJOzs7O3lCQUxLO29CQUNULEtBQUssRUFBRSxDQUFDOzRCQUNKLEtBQUssRUFBRSxPQUFPO3lCQUNqQixDQUFDO2lCQUNMO3VCQUNVLElBQUksU0FBTSxFQUFFO2dCQUNkLHFCQUFNLElBQUk7eUJBQ2QsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzt5QkFDbEQsS0FBSyxFQUFFLEVBQUE7O3FCQUZILFNBRUc7Z0JBRVosQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUE7Ozs7S0FDMUIsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLHNDQUFzQyxFQUFFLFVBQU0sQ0FBQztRQUM1QyxNQUFNLEVBS04sSUFBSTs7aUJBTEs7WUFDVCxLQUFLLEVBQUUsQ0FBQztvQkFDSixLQUFLLEVBQUUsT0FBTztpQkFDakIsQ0FBQztTQUNMO2VBQ1UsSUFBSSxTQUFNLEVBQUU7UUFFdkIsSUFBSTthQUNDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbEQsS0FBSyxFQUFFO2FBQ1AsSUFBSSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQTs7O0tBQzNDLENBQUMsQ0FBQSJ9