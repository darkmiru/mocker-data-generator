"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var Generator_1 = require("./Generator");
var iterate = function (obj, res, currentPath) {
    var _this = this;
    if (!currentPath) {
        currentPath = [];
    }
    Object.keys(obj)
        .map(function (k) {
        var value = obj[k];
        var path = currentPath.slice(0);
        path.push(k);
        if (utils_1.iamLastParent(value)) {
            if (path) {
                if (utils_1.isArray(value)) {
                    if (value[0] && value[0].virtual) {
                        _this.virtualPaths.push(path.toString());
                    }
                }
                else {
                    if (value.virtual) {
                        _this.virtualPaths.push(path.toString());
                    }
                }
            }
            var fieldCalculated = _this.proccessLeaf(value);
            if (!utils_1.isConditional(k)) {
                res[k] = fieldCalculated;
            }
            else {
                var key = k.split(',');
                if (utils_1.evalWithContextData(key[0], _this.object)) {
                    res[key[1]] = fieldCalculated;
                }
            }
        }
        else {
            res[k] = {};
            iterate.call(_this, value, res[k], path);
        }
    });
};
var Schema = (function (_super) {
    tslib_1.__extends(Schema, _super);
    function Schema(name, cfg, options) {
        var _this = _super.call(this) || this;
        _this.schema = cfg;
        _this.name = name;
        _this.options = options;
        // Temp fields
        _this.DB = {};
        _this.object = {};
        _this.virtualPaths = [];
        return _this;
    }
    Schema.prototype.proccessLeaf = function (field) {
        var _this = this;
        if (utils_1.isArray(field)) {
            var fieldConfig_1 = field[0];
            var na = Array();
            if (fieldConfig_1.concat) {
                na = utils_1.evalWithContextData(fieldConfig_1.concat, this.object, this.DB);
                // Strict Mode
                na = (fieldConfig_1.concatStrict) ? Array.from(new Set(na)).slice() : na;
            }
            var length_1 = utils_1.fieldArrayCalcLength(fieldConfig_1, na.length, this);
            var array = Array
                .from(new Array(length_1))
                .reduce(function (acc, el, index) {
                var self = acc.slice(0);
                acc.push(_this.generateField(fieldConfig_1, index, length_1, self));
                return acc;
            }, []);
            return array.concat(na);
        }
        else {
            return this.generateField(field);
        }
    };
    Schema.prototype.generateField = function (cfg) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = {};
        var generators = ['faker', 'chance', 'casual', 'randexp', 'self', 'db', 'eval', 'hasOne', 'hasMany', 'static', 'function', 'values', 'incrementalId'];
        generators.forEach(function (key) {
            try {
                if (cfg.hasOwnProperty(key)) {
                    result = _this[key].apply(_this, [cfg].concat(args));
                }
            }
            catch (e) {
                throw new Error('Generator: "' + key + '" ' + e);
            }
        });
        return result;
    };
    Schema.prototype.buildSingle = function (schema) {
        if (utils_1.iamLastParent(schema)) {
            this.object = this.proccessLeaf(schema);
        }
        else {
            iterate.call(this, schema, this.object);
        }
    };
    Schema.prototype.build = function (db) {
        var _this = this;
        if (db === void 0) { db = {}; }
        this.object = {};
        this.DB = db ? db : {};
        this.DB[this.name] = [];
        if (Number.isInteger(this.options)) {
            Array.from(new Array(this.options)).map(function () {
                _this.buildSingle(_this.schema);
                _this.DB[_this.name].push(_this.object);
                _this.object = {};
            });
        }
        else if (utils_1.isObject(this.options)) {
            if (this.options.uniqueField) {
                var f_1 = this.options.uniqueField;
                var entityConfig_1 = this.schema;
                var possibleValues = void 0;
                if (f_1 === '.') {
                    possibleValues = this.schema.values;
                }
                else {
                    if (this.schema[f_1]) {
                        if (utils_1.isArray(this.schema[f_1].values)) {
                            possibleValues = this.schema[f_1].values;
                        }
                        else {
                            possibleValues = this.schema[f_1];
                        }
                    }
                    else {
                        console.error('The field ' + f_1 + ', on the schema ' + this.name + ' not exists.');
                        return this.DB[this.name];
                    }
                }
                if (!utils_1.isArray(possibleValues)) {
                    console.error('The field ' + f_1 + ', on the schema ' + this.name + ' is not an array.');
                    return this.DB[this.name];
                }
                possibleValues.map(function (value) {
                    if (f_1 === '.') {
                        return;
                    }
                    entityConfig_1[f_1] = { static: value };
                    _this.buildSingle(entityConfig_1);
                    _this.DB[_this.name].push(_this.object);
                    _this.object = {};
                });
            }
            if (this.options.length) {
                var length = this.options.length;
                Array.from(new Array(this.options.length)).map(function () {
                    _this.buildSingle(_this.schema);
                    _this.DB[_this.name].push(_this.object);
                    _this.object = {};
                });
            }
            if (this.options.max || this.options.min) {
                var max = 10;
                var min = 0;
                var length = void 0;
                if (this.options.max) {
                    max = this.options.max;
                }
                if (this.options.min) {
                    min = this.options.min;
                }
                length = Math.floor(Math.random() * (max - min + 1) + min);
                Array.from(new Array(length)).map(function () {
                    _this.buildSingle(_this.schema);
                    _this.DB[_this.name].push(_this.object);
                    _this.object = {};
                });
            }
        }
        else {
            console.error('An string ' + this.options + ', is not recognized as a parameter.');
        }
        return this.DB[this.name];
    };
    return Schema;
}(Generator_1.Generator));
exports.Schema = Schema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9TY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWlJO0FBRWpJLHlDQUF1QztBQUV2QyxJQUFJLE9BQU8sR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsV0FBVztJQUEvQixpQkFzQ2I7SUFyQ0csRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUFDLENBQUM7SUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDWCxHQUFHLENBQUMsVUFBQyxDQUFDO1FBQ0gsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRWxCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVaLEVBQUUsQ0FBQyxDQUFDLHFCQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsRUFBRSxDQUFDLENBQUUsZUFBTyxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtvQkFDM0MsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNoQixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtvQkFDM0MsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUVELElBQUksZUFBZSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7WUFFOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQTtZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDdEIsRUFBRSxDQUFDLENBQUMsMkJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUE7Z0JBQ2pDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDM0MsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFBO0FBQ1YsQ0FBQyxDQUFBO0FBRUQ7SUFBNEIsa0NBQVM7SUFFakMsZ0JBQWEsSUFBWSxFQUFFLEdBQUcsRUFBRSxPQUFPO1FBQXZDLFlBQ0ksaUJBQU8sU0FTVjtRQVJHLEtBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ2pCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBRXRCLGNBQWM7UUFDZCxLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUNaLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ2hCLEtBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFBOztJQUMxQixDQUFDO0lBRUQsNkJBQVksR0FBWixVQUFjLEtBQUs7UUFBbkIsaUJBMkJDO1FBekJHLEVBQUUsQ0FBQyxDQUFFLGVBQU8sQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxhQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzFCLElBQUksRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFBO1lBRWhCLEVBQUUsQ0FBQyxDQUFDLGFBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixFQUFFLEdBQUcsMkJBQW1CLENBQUMsYUFBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDbEUsY0FBYztnQkFFZCxFQUFFLEdBQUcsQ0FBQyxhQUFXLENBQUMsWUFBWSxDQUFDLEdBQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFJLEVBQUUsQ0FBQTtZQUN2RSxDQUFDO1lBRUQsSUFBSSxRQUFNLEdBQUcsNEJBQW9CLENBQUMsYUFBVyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFFL0QsSUFBSSxLQUFLLEdBQUcsS0FBSztpQkFDWixJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBTSxDQUFDLENBQUM7aUJBQ3ZCLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSztnQkFDbkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDdkIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLGFBQVcsRUFBRSxLQUFLLEVBQUUsUUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7Z0JBQzlELE1BQU0sQ0FBQyxHQUFHLENBQUE7WUFDZCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFFVixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUMzQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDhCQUFhLEdBQWIsVUFBZSxHQUFHO1FBQWxCLGlCQWVDO1FBZm1CLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAsNkJBQU87O1FBQ3ZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNmLElBQUksVUFBVSxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUE7UUFFckosVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDbkIsSUFBSSxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixNQUFNLEdBQUcsS0FBSSxDQUFDLEdBQUcsQ0FBQyxPQUFULEtBQUksR0FBTSxHQUFHLFNBQUssSUFBSSxFQUFDLENBQUE7Z0JBQ3BDLENBQUM7WUFDTCxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVCxNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3BELENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxNQUFNLENBQUE7SUFDakIsQ0FBQztJQUVELDRCQUFXLEdBQVgsVUFBYSxNQUFNO1FBQ2YsRUFBRSxDQUFDLENBQUMscUJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDM0MsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBSyxHQUFMLFVBQU8sRUFBTztRQUFkLGlCQXdGQztRQXhGTSxtQkFBQSxFQUFBLE9BQU87UUFDVixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUV2QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBQyxPQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFMUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUM3QixLQUFJLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNwQyxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNwQixDQUFDLENBQUMsQ0FBQTtRQUVOLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxHQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUE7Z0JBQ2hDLElBQUksY0FBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7Z0JBQzlCLElBQUksY0FBYyxTQUFBLENBQUE7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLEdBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNaLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtnQkFDdkMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsRUFBRSxDQUFDLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7d0JBQzFDLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUE7d0JBQ25DLENBQUM7b0JBQ0wsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxHQUFDLEdBQUcsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQTt3QkFDakYsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUM3QixDQUFDO2dCQUVMLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUUsQ0FBQyxlQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxHQUFDLEdBQUcsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxDQUFBO29CQUN0RixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzdCLENBQUM7Z0JBRUQsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUs7b0JBRXJCLEVBQUUsQ0FBQyxDQUFDLEdBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNaLE1BQU0sQ0FBQTtvQkFDVixDQUFDO29CQUVELGNBQVksQ0FBQyxHQUFDLENBQUMsR0FBRyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQTtvQkFFakMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxjQUFZLENBQUMsQ0FBQTtvQkFDOUIsS0FBSSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDcEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7Z0JBQ3BCLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFFdEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUE7Z0JBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDM0MsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQzdCLEtBQUksQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQ3BDLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO2dCQUNwQixDQUFDLENBQUMsQ0FBQTtZQUVOLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRXZDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtnQkFDWixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7Z0JBQ1gsSUFBSSxNQUFNLFNBQUEsQ0FBQTtnQkFFVixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQTtnQkFDMUIsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQTtnQkFDMUIsQ0FBQztnQkFFRCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUVsRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO29CQUM5QixLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDN0IsS0FBSSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDcEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7Z0JBQ3BCLENBQUMsQ0FBQyxDQUFBO1lBRU4sQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcscUNBQXFDLENBQUMsQ0FBQTtRQUN0RixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFFTCxhQUFDO0FBQUQsQ0FBQyxBQTlKRCxDQUE0QixxQkFBUyxHQThKcEM7QUE5Slksd0JBQU0ifQ==