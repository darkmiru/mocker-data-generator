import * as tslib_1 from "tslib";
export var isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};
export var isObject = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
};
export var evalWithContextData = function (key, object, db) {
    // In this (way, we can pass object and use inside the eval string
    return eval(key);
};
export var fieldArrayCalcLength = function (config, fixedArrayLength, schema) {
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
export var iamLastChild = function (parent, k) {
    if (isArray(parent[k])) {
        var last = false;
        if (parent[k].length === 0) {
            return true;
        }
        for (var i = 0; i < parent[k].length; i++) {
            var el = parent[k][i];
            last = !isObject(el);
            if (last) {
                break;
            }
        }
        return last;
    }
    else {
        return !isObject(parent[k]);
    }
};
export var iamLastParent = function (obj) {
    var last = false;
    if (isObject(obj)) {
        var ks = Object.keys(obj);
        for (var i = 0; i < ks.length; i++) {
            var k = ks[i];
            last = iamLastChild(obj, k);
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
export var isConditional = function (str) {
    var arr = str.split(',');
    return arr.length > 1;
};
export var cleanVirtuals = function (paths, object, options) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUcsVUFBVSxHQUFRO0lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQWdCLENBQUE7QUFDbkUsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLElBQU0sUUFBUSxHQUFHLFVBQVUsR0FBUTtJQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGlCQUFpQixDQUFBO0FBQ3BFLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxJQUFNLG1CQUFtQixHQUFHLFVBQVUsR0FBVyxFQUFFLE1BQVUsRUFBRSxFQUFHO0lBQ3JFLGtFQUFrRTtJQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUFHLFVBQVUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU07SUFDMUUsSUFBSSxNQUFNLENBQUE7SUFDVixFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQTtJQUM3QyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDakIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLElBQU0sWUFBWSxHQUFHLFVBQVUsTUFBTSxFQUFFLENBQUM7SUFDM0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUE7UUFFaEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDZixDQUFDO1FBRUQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDeEMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3JCLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLEtBQUssQ0FBQTtZQUNULENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMvQixDQUFDO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLElBQU0sYUFBYSxHQUFHLFVBQVUsR0FBRztJQUN0QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUE7SUFDaEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRXpCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNiLElBQUksR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUixLQUFLLENBQUE7WUFDVCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLElBQUksR0FBRyxJQUFJLENBQUE7SUFDZixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBRyxVQUFVLEdBQUc7SUFDdEMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7QUFDekIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLElBQU0sYUFBYSxHQUFHLFVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPO0lBRXpELHVCQUF1QjtJQUN2QixJQUFJLGFBQWEsR0FBRyxVQUFZLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTztZQUMxQyxJQUFJLEVBQ0osSUFBSSxFQUtDLENBQUMsRUFDRixLQUFLOzs7OzJCQVBGLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzsyQkFDMUIsR0FBRztvQkFFZCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQUMsTUFBTSxnQkFBQTtvQkFBQyxDQUFDO29CQUMxQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQUMsTUFBTSxnQkFBQTtvQkFBQyxDQUFDO29CQUVwQixHQUFHLENBQUMsQ0FBQyxJQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dDQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNyRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQ0FDbEIsS0FBSyxDQUFBOzRCQUNULENBQUM7d0JBQ0wsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO3dCQUN0QixDQUFDO29CQUNMLENBQUM7b0JBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO3lCQUVOLENBQUEsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsRUFBZix3QkFBZTtvQkFDZixzQkFBQSxpQkFBTyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBLEVBQUE7O29CQUE3RCxTQUE2RCxDQUFBOzt3QkFFN0Qsc0JBQU07Ozs7S0FFYixDQUFBO0lBRUQsSUFBSSxXQUFXLEdBQUcsVUFBWSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU87WUFDM0MsSUFBSSxFQUNKLElBQUksS0FHQSxLQUFLOzs7OzJCQUpGLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzsyQkFDMUIsTUFBTTt3QkFFSixDQUFDOzs7eUJBQUUsQ0FBQSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTs0QkFDZixJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUNmLENBQUEsQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEVBQXJCLHdCQUFxQjtvQkFDckIsdUJBQXVCO29CQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDbEIsc0JBQXNCO29CQUN0QixzQkFBQSxpQkFBTyxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQSxFQUFBOztvQkFEM0Msc0JBQXNCO29CQUN0QixTQUEyQyxDQUFBOzs7b0JBRTNDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7OztvQkFSTyxDQUFDLEVBQUUsQ0FBQTs7Ozs7S0FXdkMsQ0FBQTtJQUVELElBQUksUUFBUSxHQUFHLFVBQVksS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPO2VBRXJDLElBQUk7Ozs7d0JBREMsQ0FBQzs7O3lCQUFFLENBQUEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUE7MkJBQ2pCLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ25CLHNCQUFBLGlCQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQSxFQUFBOztvQkFBdEQsU0FBc0QsQ0FBQTs7O29CQUZ4QixDQUFDLEVBQUUsQ0FBQTs7Ozs7S0FJeEMsQ0FBQTtJQUVELEdBQUcsQ0FBQyxDQUFZLFVBQTRDLEVBQTVDLEtBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUE1QyxjQUE0QyxFQUE1QyxJQUE0QztRQUF2RCxJQUFJLEdBQUcsU0FBQTtLQUFxRDtJQUVqRSxNQUFNLENBQUMsTUFBTSxDQUFBO0FBQ2pCLENBQUMsQ0FBQSJ9