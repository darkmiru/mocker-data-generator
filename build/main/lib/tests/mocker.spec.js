"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
ava_1.test('Should return an new instance of mocker', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        t.deepEqual(_1.default(), new _1.Mocker());
        return [2 /*return*/];
    });
}); });
ava_1.test('Should iterate root level too with fields in models', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var length, expectedResult, user, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                length = 1;
                expectedResult = { user: ['firstName'] };
                user = { static: 'firstName' };
                return [4 /*yield*/, _1.default()
                        .schema('user', user, length)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db, expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Virtuals should be eliminated in the final object and can be accesible during generation', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var model, expectedResult, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                model = {
                    exampleVirtual: {
                        incrementalId: 0,
                        virtual: true
                    },
                    id: {
                        function: function () {
                            return this.object.exampleVirtual;
                        }
                    },
                    deep: {
                        more: {
                            field: {
                                static: 'im here',
                                virtual: true
                            }
                        }
                    },
                    deep2: {
                        more: {
                            field: {
                                static: 'im here'
                            }
                        }
                    }
                };
                expectedResult = {
                    id: 0,
                    deep2: {
                        more: {
                            field: 'im here'
                        }
                    }
                };
                return [4 /*yield*/, _1.default()
                        .schema('situation', model, 1)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should iterate over more complex levels (deeper & function used...)', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var model, expectedResult, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                model = {
                    name: {
                        firstName: {
                            static: 'firstName'
                        },
                        lastName: {
                            static: 'lastName'
                        },
                        much: {
                            deeper: {
                                function: function () {
                                    return this.object.name.firstName + ' ' + this.object.name.lastName;
                                }
                            },
                            more: {
                                deeper: {
                                    function: function () {
                                        return this.object.name.firstName + ' ' + this.object.name.lastName;
                                    }
                                },
                                level: {
                                    deeper: {
                                        function: function () {
                                            return this.object.name.firstName + ' ' + this.object.name.lastName;
                                        }
                                    },
                                    awesome: {
                                        deeper: {
                                            function: function () {
                                                return this.object.name.firstName + ' ' + this.object.name.lastName;
                                            }
                                        },
                                        deeper2: {
                                            function: function () {
                                                return this.object.name.firstName + ' ' + this.object.name.lastName;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                expectedResult = {
                    name: {
                        firstName: 'firstName',
                        lastName: 'lastName',
                        much: {
                            deeper: 'firstName lastName',
                            more: {
                                deeper: 'firstName lastName',
                                level: {
                                    deeper: 'firstName lastName',
                                    awesome: {
                                        deeper: 'firstName lastName',
                                        deeper2: 'firstName lastName'
                                    }
                                }
                            }
                        }
                    }
                };
                return [4 /*yield*/, _1.default()
                        .schema('situation', model, 1)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should work with conditional keys', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var conditional, expectedResult, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                conditional = {
                    condition: {
                        static: 'a'
                    },
                    'object.condition==="a",a': {
                        static: 'conditionLinkedToConditionField'
                    },
                    'object.condition==="b",b': {
                        static: 'conditionLinkedToConditionField'
                    }
                };
                expectedResult = {
                    condition: 'a',
                    a: 'conditionLinkedToConditionField'
                };
                return [4 /*yield*/, _1.default()
                        .schema('situation', conditional, 1)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should not affect init values to next entity', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var length, request, request2, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                length = 10;
                request = {
                    type: {
                        values: ['kitty', 'pitxi', 'txuri']
                    }
                };
                request2 = {
                    type: {
                        static: 'staticValue'
                    }
                };
                return [4 /*yield*/, _1.default()
                        .schema('request', request, { uniqueField: 'type' })
                        .schema('request2', request2, 10)
                        .build()];
            case 1:
                db = _a.sent();
                t.notDeepEqual(db.request, db.request2);
                db.request2.forEach(function (r2) {
                    db.request.forEach(function (r) {
                        t.notDeepEqual(r2, r);
                    });
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should generate more entities', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var length, model1, model2, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                length = 10;
                model1 = { request: {
                        id: {
                            faker: 'random.number'
                        },
                        title: {
                            faker: 'lorem.sentence'
                        },
                        number: {
                            faker: 'random.number'
                        }
                    } };
                model2 = { request: {
                        id: {
                            faker: 'random.number'
                        },
                        title: {
                            faker: 'lorem.sentence'
                        },
                        number: {
                            faker: 'random.number'
                        }
                    } };
                return [4 /*yield*/, _1.default()
                        .schema('act', model1, length)
                        .schema('act2', model2, length)
                        .build()];
            case 1:
                data = _a.sent();
                t.true(Object.keys(data).length === 2);
                t.deepEqual(Object.keys(data), Array('act', 'act2'));
                t.true(data.act.length === length);
                t.true(data.act2.length === length);
                data.act.forEach(function (d) {
                    t.true(Object.keys(d).length === Object.keys(model1).length);
                    t.deepEqual(Object.keys(d), Object.keys(model1));
                    t.deepEqual(Object.keys(d.request), Object.keys(model1.request));
                });
                data.act2.forEach(function (d) {
                    t.true(Object.keys(d).length === Object.keys(model2).length);
                    t.deepEqual(Object.keys(d), Object.keys(model2));
                    t.deepEqual(Object.keys(d.request), Object.keys(model2.request));
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should uniqueField works', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var cat, cat2, result, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cat = {
                    name: ['txuri', 'pitxi', 'kitty']
                };
                cat2 = {
                    name: {
                        values: ['txuri', 'pitxi', 'kitty']
                    }
                };
                result = [{ name: 'txuri' }, { name: 'pitxi' }, { name: 'kitty' }];
                return [4 /*yield*/, _1.default()
                        .schema('cat', cat, { uniqueField: 'name' })
                        .schema('cat2', cat2, { uniqueField: 'name' })
                        .build()];
            case 1:
                data = _a.sent();
                t.deepEqual(data.cat, data.cat2);
                t.deepEqual(data.cat, result);
                t.deepEqual(data.cat2, result);
                return [2 /*return*/];
        }
    });
}); });
/*
test('Should generate correctly with 2 ways of uniqueField', function(done) {
            var cat = {
                name: ['txuri', 'pitxi', 'kitty']
            };
            var cat2 = {
                name: {
                    values: ['txuri', 'pitxi', 'kitty']
                }
            };
            var result = [ { name: 'txuri' }, { name: 'pitxi' }, { name: 'kitty' } ]
            var m = mocker()
                .schema('cat', cat, {uniqueField: 'name'})
                .schema('cat2', cat2, {uniqueField: 'name'})
                .build(function(data){
                    try {
                        expect(data.cat)
                            .to.deep.equal(data.cat2)
                            .to.deep.equal(result)
                            .to.not.be.undefined
                            .to.not.be.null
                        done()
                    } catch (x) {
                        done(x)
                    }
                })
        })*/
ava_1.test('Should be awesome', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        t.true(true);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja2VyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL21vY2tlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFvU0E7OztBQXBTQSwyQkFBMEI7QUFDMUIsMkJBQStDO0FBRy9DLFVBQUksQ0FBQyx5Q0FBeUMsRUFBRSxVQUFNLENBQUM7O1FBQ25ELENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBTSxFQUFFLEVBQUUsSUFBSSxTQUFNLEVBQUUsQ0FBQyxDQUFBOzs7S0FDdEMsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLHFEQUFxRCxFQUFFLFVBQU0sQ0FBQztRQUMzRCxNQUFNLEVBRU4sY0FBYyxFQUNkLElBQUk7Ozs7eUJBSEssQ0FBQztpQ0FFTyxFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFO3VCQUNqQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7Z0JBRXpCLHFCQUFNLFVBQU0sRUFBRTt5QkFDbEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDO3lCQUM1QixLQUFLLEVBQUUsRUFBQTs7cUJBRkgsU0FFRztnQkFFWixDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQTs7OztLQUNsQyxDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsMEZBQTBGLEVBQUUsVUFBTSxDQUFDO1FBQ2hHLEtBQUssRUE0QkwsY0FBYzs7Ozt3QkE1Qk47b0JBQ1IsY0FBYyxFQUFFO3dCQUNaLGFBQWEsRUFBRSxDQUFDO3dCQUNoQixPQUFPLEVBQUUsSUFBSTtxQkFDaEI7b0JBRUQsRUFBRSxFQUFFO3dCQUNBLFFBQVEsRUFBRTs0QkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUE7d0JBQ3JDLENBQUM7cUJBQ0o7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLElBQUksRUFBRTs0QkFDRixLQUFLLEVB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