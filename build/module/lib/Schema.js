import * as tslib_1 from "tslib";
import { isObject, isArray, iamLastParent, fieldArrayCalcLength, evalWithContextData, isConditional } from './utils';
import { Generator } from './Generator';
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
        if (iamLastParent(value)) {
            if (path) {
                if (isArray(value)) {
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
            if (!isConditional(k)) {
                res[k] = fieldCalculated;
            }
            else {
                var key = k.split(',');
                if (evalWithContextData(key[0], _this.object)) {
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
        if (isArray(field)) {
            var fieldConfig_1 = field[0];
            var na = Array();
            if (fieldConfig_1.concat) {
                na = evalWithContextData(fieldConfig_1.concat, this.object, this.DB);
                // Strict Mode
                na = (fieldConfig_1.concatStrict) ? Array.from(new Set(na)).slice() : na;
            }
            var length_1 = fieldArrayCalcLength(fieldConfig_1, na.length, this);
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
        if (iamLastParent(schema)) {
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
        else if (isObject(this.options)) {
            if (this.options.uniqueField) {
                var f_1 = this.options.uniqueField;
                var entityConfig_1 = this.schema;
                var possibleValues = void 0;
                if (f_1 === '.') {
                    possibleValues = this.schema.values;
                }
                else {
                    if (this.schema[f_1]) {
                        if (isArray(this.schema[f_1].values)) {
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
                if (!isArray(possibleValues)) {
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
}(Generator));
export { Schema };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9TY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBZ0Isb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRWpJLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFFdkMsSUFBSSxPQUFPLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLFdBQVc7SUFBL0IsaUJBc0NiO0lBckNHLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUFDLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ1gsR0FBRyxDQUFDLFVBQUMsQ0FBQztRQUNILElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVsQixJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFWixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsRUFBRSxDQUFDLENBQUUsT0FBTyxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENB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