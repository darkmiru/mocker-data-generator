"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};
exports.isObject = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
};
exports.evalWithContextData = function (key, object, db) {
    // In this (way, we can pass object and use inside the eval string
    return eval(key);
};
exports.fieldArrayCalcLength = function (config, fixedArrayLength, schema) {
    var length;
    if (typeof config.length === 'function') {
        length = config.length.call(schema);
    }
    else if (config.fixedLength) {
        length = config.length - fixedArrayLength;
    }
    else {
        length = Math.floor((Math.random() * config.length) + 1);
    }
    return length;
};
exports.iamLastChild = function (parent, k) {
    if (exports.isArray(parent[k])) {
        var last = false;
        if (parent[k].length === 0) {
            return true;
        }
        for (var i = 0; i < parent[k].length; i++) {
            var el = parent[k][i];
            last = !exports.isObject(el);
            if (last) {
                break;
            }
        }
        return last;
    }
    else {
        return !exports.isObject(parent[k]);
    }
};
exports.iamLastParent = function (obj) {
    var last = false;
    if (exports.isObject(obj)) {
        var ks = Object.keys(obj);
        for (var i = 0; i < ks.length; i++) {
            var k = ks[i];
            last = exports.iamLastChild(obj, k);
            if (!last) {
                break;
            }
        }
    }
    else {
        last = true;
    }
    return last;
};
exports.isConditional = function (str) {
    var arr = str.split(',');
    return arr.length > 1;
};
exports.cleanVirtuals = function (paths, object, options) {
    // clean specific paths
    var objectCleaner = function (path, obj, options) {
        var lvls, dest, i, field;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lvls = path.split(options.symbol);
                    dest = obj;
                    if (!lvls || lvls.length === 0) {
                        return [2 /*return*/];
                    }
                    if (!obj) {
                        return [2 /*return*/];
                    }
                    for (i = 0; i < lvls.length; i++) {
                        field = lvls[i];
                        if (i === lvls.length - 1 && dest[field]) {
                            if (Object.getOwnPropertyNames(dest[field]).length < 1) {
                                delete dest[field];
                                break;
                            }
                        }
                        else {
                            dest = dest[field];
                        }
                    }
                    lvls.pop();
                    if (!(lvls.length > 0)) return [3 /*break*/, 2];
                    return [5 /*yield**/, tslib_1.__values(objectCleaner(lvls.join(options.symbol), obj, options))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2: return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    };
    var forEachPath = function (path, object, options) {
        var lvls, dest, i, field;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lvls = path.split(options.symbol);
                    dest = object;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < lvls.length)) return [3 /*break*/, 5];
                    field = lvls[i];
                    if (!(i === lvls.length - 1)) return [3 /*break*/, 3];
                    // delete specific path
                    delete dest[field];
                    // clean specific path
                    return [5 /*yield**/, tslib_1.__values(objectCleaner(path, object, options))];
                case 2:
                    // clean specific path
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    dest = dest[field];
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    };
    var forPaths = function (paths, object, options) {
        var i, path;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < paths.length)) return [3 /*break*/, 4];
                    path = paths[i];
                    return [5 /*yield**/, tslib_1.__values(Array.from(forEachPath(path, object, options)))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    for (var _i = 0, _a = Array.from(forPaths(paths, object, options)); _i < _a.length; _i++) {
        var res = _a[_i];
    }
    return object;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsT0FBTyxHQUFHLFVBQVUsR0FBUTtJQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixDQUFBO0FBQ25FLENBQUMsQ0FBQTtBQUVZLFFBQUEsUUFBUSxHQUFHLFVBQVUsR0FBUTtJQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGlCQUFpQixDQUFBO0FBQ3BFLENBQUMsQ0FBQTtBQUVZLFFBQUEsbUJBQW1CLEdBQUcsVUFBVSxHQUFXLEVBQUUsTUFBVSxFQUFFLEVBQUc7SUFDckUsa0VBQWtFO0lBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDcEIsQ0FBQyxDQUFBO0FBRVksUUFBQSxvQkFBb0IsR0FBRyxVQUFVLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNO0lBQzFFLElBQUksTUFBTSxDQUFBO0lBQ1YsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUE7SUFDN0MsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxF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