// Generated by CoffeeScript 1.8.0
(function() {
  "use strict";
  var Chars, Strings, Types, asciiStringType, breakIfEqual, changeCase, createForce, literals, mapStringToNumber, testValues, typesPredicates, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Types = {
    parseIntBase: 10
  };

  literals = {
    'Boolean': false,
    'String': '',
    'Number': 0,
    'Object': {},
    'Array': [],
    'Function': function() {}
  };

  createForce = function(type) {
    var convertType;
    convertType = function(value) {
      switch (type) {
        case 'Number':
          if (Types.notNaN(value = parseInt(value, Types.parseIntBase))) {
            return value;
          }
          break;
        case 'String':
          if (Types.isStringOrNumber(value)) {
            return value + '';
          }
          break;
        default:
          if (Types['is' + type](value)) {
            return value;
          }
      }
      return false;
    };
    return function(value, replacement) {
      if (replacement == null) {
        replacement = value;
      }
      if (false !== (value = convertType(value))) {
        return value;
      }
      if (false !== (replacement = convertType(replacement))) {
        return replacement;
      }
      return literals[type];
    };
  };

  testValues = function(predicate, breakState, values) {
    var value, _i, _len;
    if (values == null) {
      values = [];
    }
    if (values.length < 1) {
      if (predicate === typesPredicates.Undefined) {
        return true;
      }
      return false;
    }
    for (_i = 0, _len = values.length; _i < _len; _i++) {
      value = values[_i];
      if ((predicate(value)) === breakState) {
        return breakState;
      }
    }
    return !breakState;
  };

  typesPredicates = {
    'Undefined': function(value) {
      return value === void 0;
    },
    'Null': function(value) {
      return value === null;
    },
    'Boolean': function(value) {
      return typeof value === 'boolean';
    },
    'String': function(value) {
      return typeof value === 'string';
    },
    'Function': function(value) {
      return typeof value === 'function';
    },
    'Number': function(value) {
      return (typeof value === 'number') && (value === value);
    },
    'Array': function(value) {
      return (typeof value === 'object') && (value instanceof Array);
    },
    'RegExp': function(value) {
      return (typeof value === 'object') && (value instanceof RegExp);
    },
    'Date': function(value) {
      return (typeof value === 'object') && (value instanceof Date);
    },
    'Object': function(value) {
      return (typeof value === 'object') && !(value instanceof Array) && !(value instanceof RegExp) && !(value instanceof Date) && !(value === null);
    },
    'NaN': function(value) {
      return (typeof value === 'number') && (value !== value);
    },
    'Defined': function(value) {
      return value !== void 0;
    }
  };

  typesPredicates.StringOrNumber = function(value) {
    return typesPredicates['String'](value) || typesPredicates['Number'](value);
  };

  breakIfEqual = true;

  (function() {
    var name, predicate, _results;
    _results = [];
    for (name in typesPredicates) {
      predicate = typesPredicates[name];
      _results.push((function(name, predicate) {
        Types['is' + name] = predicate;
        Types['not' + name] = function(value) {
          return !predicate(value);
        };
        Types['has' + name] = function() {
          return testValues(predicate, breakIfEqual, arguments);
        };
        Types['all' + name] = function() {
          return testValues(predicate, !breakIfEqual, arguments);
        };
        if (name in literals) {
          return Types['force' + name] = createForce(name);
        }
      })(name, predicate));
    }
    return _results;
  })();

  Types["typeof"] = function(value) {
    var predicate, type;
    for (type in typesPredicates) {
      predicate = typesPredicates[type];
      if (predicate(value) === true) {
        return type.toLowerCase();
      }
    }
    return 'unknown';
  };

  mapStringToNumber = function(array) {
    var index, nr, value, _i, _len;
    if (_.notArray(array)) {
      return 0;
    }
    for (index = _i = 0, _len = array.length; _i < _len; index = ++_i) {
      value = array[index];
      if (_.isNaN(nr = parseInt(array[index], 10))) {
        return index;
      }
      array[index] = nr;
    }
    return array.length;
  };

  _ = (function(_super) {
    __extends(_, _super);

    function _() {
      return _.__super__.constructor.apply(this, arguments);
    }

    _.inRange = function(nr, range) {
      if ((_.isNaN(nr = parseInt(nr, 10))) || (mapStringToNumber(range) < 2)) {
        return false;
      }
      return (nr >= range[0]) && (nr <= range[1]);
    };

    _.limitNumber = function(nr, range) {
      nr = _.forceNumber(nr);
      if (mapStringToNumber(range) < 2) {
        return nr;
      }
      if (nr < range[0]) {
        return range[0];
      }
      if (nr > range[1]) {
        return range[1];
      }
      return nr;
    };

    _.randomNumber = function(min, max) {
      if (mapStringToNumber([min, max]) < 2) {
        return 0;
      }
      if (max < min) {
        return min;
      }
      max = (max - min) + 1;
      return Math.floor((Math.random() * max) + min);
    };

    _.shuffleArray = function(array) {
      var i, length, rand, temp, _i;
      if (_.notArray(array) || array.length < 1) {
        return [];
      }
      length = array.length - 1;
      for (i = _i = length; length <= 0 ? _i <= 0 : _i >= 0; i = length <= 0 ? ++_i : --_i) {
        rand = _.randomNumber(0, i);
        temp = array[i];
        array[i] = array[rand];
        array[rand] = temp;
      }
      return array;
    };

    _.positiveIndex = function(index, max) {
      if (0 === (index = _.forceNumber(index))) {
        return false;
      }
      max = Math.abs(_.forceNumber(max));
      if (Math.abs(index) <= max) {
        if (index > 0) {
          return index - 1;
        }
        return max + index;
      }
      return false;
    };

    return _;

  })(Types);

  Chars = (function(_super) {
    __extends(Chars, _super);

    function Chars() {
      return Chars.__super__.constructor.apply(this, arguments);
    }

    Chars.ASCII_RANGE_UPPERCASE = [65, 90];

    Chars.ASCII_RANGE_LOWERCASE = [97, 122];

    Chars.ASCII_RANGE_NUMBERS = [48, 57];

    Chars.ASCII_RANGE_ALL = [32, 126];

    Chars.REGEXP_SPECIAL_CHARS = ['?', '\\', '[', ']', '(', ')', '*', '+', '.', '/', '|', '^', '$', '<', '>', '-', '&'];

    Chars.ascii = function(ordinal) {
      return String.fromCharCode(_.forceNumber(ordinal));
    };

    Chars.ordinal = function(char) {
      return _.forceNumber(_.forceString(char).charCodeAt());
    };

    Chars.isUpper = function(char) {
      return _.inRange(Chars.ordinal(char), Chars.ASCII_RANGE_UPPERCASE);
    };

    Chars.isLower = function(char) {
      return _.inRange(Chars.ordinal(char), Chars.ASCII_RANGE_LOWERCASE);
    };

    Chars.isAlpha = function(char) {
      return Chars.isUpper(char) || Chars.isLower(char);
    };

    Chars.isNumeric = function(char) {
      return _.inRange(Chars.ordinal(char), Chars.ASCII_RANGE_NUMBERS);
    };

    Chars.isSpecial = function(char) {
      return _.inRange(Chars.ordinal(char), Chars.ASCII_RANGE_ALL) && !(Chars.isAlphaNumeric(char) || (char === ' '));
    };

    Chars.isAlphaNumeric = function(char) {
      return Chars.isAlpha(char) || Chars.isNumeric(char);
    };

    Chars.random = function(range) {
      var max, min;
      range = _.forceArray(range, Chars.ASCII_RANGE_ALL);
      min = _.limitNumber(range[0], range);
      max = _.limitNumber(range[1], range);
      return Chars.ascii(_.randomNumber(min, max));
    };

    return Chars;

  })(_);

  changeCase = function() {
    var arg, args, caseMethod, pos, string, _i, _j, _len, _len1;
    string = arguments[0], caseMethod = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (string == null) {
      string = '';
    }
    if ('' === (string = _.forceString(string))) {
      return string;
    }
    if ((args.length < 1) || args[0] === void 0) {
      return string[caseMethod]();
    } else if (_.isNumber(args[0])) {
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        pos = _.positiveIndex(arg, string.length);
        string = Strings.xs(string, function(char, index) {
          if (index === pos) {
            return char[caseMethod]();
          }
          return char;
        });
      }
    } else if (_.isString(args[0])) {
      for (_j = 0, _len1 = args.length; _j < _len1; _j++) {
        arg = args[_j];
        string = Strings.replace(string, arg, arg[caseMethod](), 'gi');
      }
    }
    return string;
  };

  asciiStringType = function(string, method) {
    var char, _i, _len;
    if ('' === (string = _.forceString(string))) {
      return false;
    }
    for (_i = 0, _len = string.length; _i < _len; _i++) {
      char = string[_i];
      if (!method(char)) {
        return false;
      }
    }
    return true;
  };

  Strings = (function(_super) {
    __extends(Strings, _super);

    Strings.create = function() {
      var arg, string, _i, _len;
      string = '';
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        arg = arguments[_i];
        string += _.forceString(arg);
      }
      return string;
    };

    Strings.get = function() {
      var argsLength, length, pos, positions, result, string, _i;
      string = arguments[0], positions = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (arguments.length < 2) {
        return '';
      }
      string = _.forceString(string);
      length = string.length;
      result = '';
      argsLength = arguments.length;
      for (pos = _i = 1; 1 <= argsLength ? _i <= argsLength : _i >= argsLength; pos = 1 <= argsLength ? ++_i : --_i) {
        pos = _.positiveIndex(arguments[pos], length);
        if (pos !== false) {
          result += string[pos];
        }
      }
      return result;
    };

    Strings.random = function(amount, charSet) {
      var i, string, _i;
      amount = _.forceNumber(amount, 1);
      string = '';
      for (i = _i = 1; 1 <= amount ? _i <= amount : _i >= amount; i = 1 <= amount ? ++_i : --_i) {
        string += Chars.random(charSet);
      }
      return string;
    };

    Strings.times = function(string, amount) {
      var multi;
      if ('' === (string = _.forceString(string))) {
        return '';
      }
      amount = _.forceNumber(amount, 1);
      multi = '';
      while (amount-- > 0) {
        multi += string;
      }
      return multi;
    };

    Strings.regEscape = function(string) {
      if ('' === (string = _.forceString(string))) {
        return string;
      }
      return Strings.xs(string, function(char) {
        if (__indexOf.call(Chars.REGEXP_SPECIAL_CHARS, char) >= 0) {
          return '\\' + char;
        }
        return true;
      });
    };

    Strings.empty = function(string) {
      if (_.notString(string) || (string.length > 0)) {
        return false;
      }
      return true;
    };

    Strings.isAlpha = function(string) {
      return asciiStringType(string, Chars.isAlpha);
    };

    Strings.isNumeric = function(string) {
      return asciiStringType(string, Chars.isNumeric);
    };

    Strings.isAlphaNumeric = function(string) {
      return asciiStringType(string, Chars.isAlphaNumeric);
    };

    Strings.isSpecial = function(string) {
      return asciiStringType(string, Chars.isSpecial);
    };

    Strings.isSpace = function(string) {
      return /^[ \t]+$/g.test(string);
    };

    Strings.xs = function(string, callback) {
      var index, length, response, result, _i;
      if (string == null) {
        string = '';
      }
      string = _.forceString(string);
      if (-1 === (length = string.length - 1)) {
        return '';
      }
      callback = _.forceFunction(callback, function(char) {
        return char;
      });
      result = '';
      for (index = _i = 0; 0 <= length ? _i <= length : _i >= length; index = 0 <= length ? ++_i : --_i) {
        if (response = callback(string[index], index)) {
          if (response === true) {
            result += string[index];
          } else if (_.isStringOrNumber(response)) {
            result += response;
          }
        }
      }
      return result;
    };

    Strings.copy = function(string, offset, amount) {
      offset = _.forceNumber(offset);
      if (('' === (string = _.forceString(string))) || (Math.abs(offset) > string.length)) {
        return '';
      }
      if (offset > 0) {
        offset -= 1;
      }
      return string.substr(offset, _.forceNumber(amount, string.length));
    };

    Strings.replace = function(string, toReplace, replacement, flags) {
      var _ref;
      if (string == null) {
        string = '';
      }
      if (toReplace == null) {
        toReplace = '';
      }
      if (replacement == null) {
        replacement = '';
      }
      if (flags == null) {
        flags = 'g';
      }
      if (!(_.isStringOrNumber(string) && ((_ref = _["typeof"](toReplace)) === 'string' || _ref === 'number' || _ref === 'regexp'))) {
        return _.forceString(string);
      }
      if (_.notRegExp(toReplace)) {
        toReplace = Strings.regEscape(toReplace + '');
        toReplace = new RegExp(toReplace, flags);
      }
      return (string + '').replace(toReplace, replacement);
    };

    Strings.trim = function(string) {
      return Strings.replace(string, /^\s+|\s+$/g);
    };

    Strings.trimLeft = function(string) {
      return Strings.replace(string, /^\s+/g);
    };

    Strings.trimRight = function(string) {
      return Strings.replace(string, /\s+$/g);
    };

    Strings.oneSpace = function(string) {
      return Strings.replace(string, /\s+/g, ' ');
    };

    Strings.oneSpaceAndTrim = function(string) {
      return Strings.oneSpace(Strings.trim(string));
    };

    Strings.toCamel = function(string, char) {
      var match;
      string = _.forceString(string);
      char = _.forceString(char, '-');
      match = new RegExp(Strings.regEscape(char) + '([a-z])', 'ig');
      return Strings.replace(string, match, function(all, found) {
        return found.toUpperCase();
      });
    };

    Strings.unCamel = function(string, insertion) {
      string = _.forceString(string);
      insertion = _.forceString(insertion, '-');
      return Strings.replace(string, /([A-Z])/g, insertion + '$1').toLowerCase();
    };

    Strings.shuffle = function(string) {
      string = _.forceString(string);
      return _.shuffleArray((string + '').split('')).join('');
    };

    Strings.find = function(string, toFind, flags) {
      var indices, result;
      indices = [];
      if ('' === (string = _.forceString(string))) {
        return indices;
      }
      flags = _.forceString(flags, 'g');
      if (_.isStringOrNumber(toFind)) {
        toFind = new RegExp(Strings.regEscape(toFind + ''), flags);
      } else if (_.isRegExp(toFind)) {
        toFind = new RegExp(toFind.source, flags);
      } else {
        return indices;
      }
      if (toFind.global) {
        while (result = toFind.exec(string)) {
          indices.push(result.index + 1);
        }
      } else {
        if (result = toFind.exec(string)) {
          indices.push(result.index + 1);
        }
      }
      return indices;
    };

    Strings.count = function(string, toFind) {
      return Strings.find(string, toFind).length;
    };

    Strings.contains = function(string, substring) {
      return Strings.count(string, substring) > 0;
    };

    Strings.between = function(string, before, after) {
      var reg, _ref;
      if (!_.allStringOrNumber(string, before, after)) {
        return '';
      }
      before = Strings.regEscape(before + '');
      after = Strings.regEscape(after + '');
      reg = new RegExp(before + '(.+)' + after);
      return ((_ref = reg.exec(string + '')) != null ? _ref[1] : void 0) || '';
    };

    Strings.slice = function(string, start, size) {
      string = _.forceString(string);
      start = _.forceNumber(start || 1);
      if (false !== (start = _.positiveIndex(start, string.length))) {
        size = _.forceNumber(size);
        return string.slice(start, start + size);
      }
      return '';
    };

    Strings.truncate = function(string, length, appendix) {
      string = _.forceString(string);
      length = _.forceNumber(length, string.length);
      string = Strings.slice(string, 1, length);
      return string + _.forceString(appendix);
    };

    Strings.pop = function(string, amount) {
      string = _.forceString(string);
      amount = _.forceNumber(amount, 1);
      return string.slice(0, -Math.abs(amount));
    };

    Strings.split = function(string, delimiter) {
      var array, result, word, _i, _len;
      string = Strings.oneSpaceAndTrim(string);
      result = [];
      if (string.length < 1) {
        return result;
      }
      delimiter = _.forceString(delimiter, ' ');
      array = string.split(delimiter[0] || '');
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        word = array[_i];
        if (word.match(/^\s$/)) {
          continue;
        }
        result.push(Strings.trim(word));
      }
      return result;
    };

    Strings.reverse = function(string) {
      var ch, length, reversed, _i;
      if (string == null) {
        string = '';
      }
      string = _.forceString(string);
      if ((length = string.length - 1) < 1) {
        return string;
      }
      reversed = '';
      for (ch = _i = length; length <= 0 ? _i <= 0 : _i >= 0; ch = length <= 0 ? ++_i : --_i) {
        reversed += string[ch];
      }
      return reversed;
    };

    Strings.upper = function() {
      var args, string;
      string = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return changeCase.apply(null, [string, 'toUpperCase'].concat(__slice.call(args)));
    };

    Strings.lower = function() {
      var args, string;
      string = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return changeCase.apply(null, [string, 'toLowerCase'].concat(__slice.call(args)));
    };

    Strings.insert = function(string, insertion, index) {
      if (index == null) {
        index = 1;
      }
      string = _.forceString(string);
      insertion = _.forceString(insertion);
      index = _.forceNumber(index);
      if (index > string.length) {
        return string + insertion;
      }
      index = _.positiveIndex(index, string.length);
      if (index === false) {
        index = 0;
      }
      return string.substr(0, index) + insertion + string.substr(index);
    };

    Strings.removeRange = function(string, offset, amount) {
      var endpoint;
      string = _.forceString(string);
      if ((string === '') || (false === (offset = _.positiveIndex(offset, string.length))) || (0 > (amount = _.forceNumber(amount, 1)))) {
        return string;
      }
      endpoint = offset + amount;
      return Strings.xs(string, function(char, index) {
        if ((index < offset) || (index >= endpoint)) {
          return true;
        }
      });
    };

    Strings.removePos = function() {
      var pos, positions, string;
      string = arguments[0], positions = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ('' === (string = _.forceString(string))) {
        return '';
      }
      pos = positions.map(function(value, index) {
        return _.positiveIndex(value, string.length);
      });
      return Strings.xs(string, function(char, index) {
        if (!(__indexOf.call(pos, index) >= 0)) {
          return true;
        }
      });
    };

    Strings.remove = function() {
      var remove, string, toRemove, _i, _len;
      string = arguments[0], toRemove = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (string == null) {
        string = '';
      }
      if (('' === (string = _.forceString(string))) || (toRemove.length < 1)) {
        return string;
      }
      for (_i = 0, _len = toRemove.length; _i < _len; _i++) {
        remove = toRemove[_i];
        string = Strings.replace(string, remove);
      }
      return string;
    };

    Strings.startsWith = function(string, start) {
      return Strings.find(string, start)[0] === 1;
    };

    Strings.endsWith = function(string, ending) {
      if (('' === (string = _.forceString(string))) || ('' === (ending = _.forceString(ending)))) {
        return false;
      }
      ending = new RegExp(Strings.regEscape(ending) + '$');
      return ending.test(string);
    };

    Strings.wrap = function(prepend, append) {
      var wrapper;
      if (prepend == null) {
        prepend = '';
      }
      if (append == null) {
        append = '';
      }
      wrapper = function(string) {
        return Strings.create(prepend, string, append);
      };
      wrapper.wrap = function(outerPrepend, outerAppend) {
        if (outerPrepend == null) {
          outerPrepend = '';
        }
        if (outerAppend == null) {
          outerAppend = '';
        }
        prepend = _.forceString(outerPrepend) + prepend;
        return append += _.forceString(outerAppend);
      };
      return wrapper;
    };

    function Strings() {
      this.set.apply(this, arguments);
      this.wrapMethod = null;
      this.crop = this.slice;
    }

    Strings.prototype.set = function() {
      this.string = Strings.create.apply(this, arguments);
      return this;
    };

    Strings.prototype.random = function(amount, charSet) {
      this.string = Strings.random(amount, charSet);
      return this;
    };

    Strings.prototype.xs = function(callback) {
      this.string = Strings.xs(this.string, callback);
      return this;
    };

    Strings.prototype.times = function(times) {
      if (times == null) {
        times = 1;
      }
      this.string = Strings.times(this.string, times);
      return this;
    };

    Strings.prototype.get = function() {
      var position, string, _i, _len;
      if (arguments.length > 0) {
        string = '';
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          position = arguments[_i];
          position = _.positiveIndex(position, this.length);
          if (position !== false) {
            string += this.string[position];
          }
        }
        return string;
      }
      return this.string;
    };

    Strings.prototype.copy = function(offset, amount) {
      return Strings.copy(this.string, offset, amount);
    };

    Strings.prototype.empty = function() {
      return Strings.empty(this.string);
    };

    Strings.prototype.isAlpha = function() {
      return Strings.isAlpha(this.string);
    };

    Strings.prototype.isNumeric = function() {
      return Strings.isNumeric(this.string);
    };

    Strings.prototype.isAlphaNumeric = function() {
      return Strings.isAlphaNumeric(this.string);
    };

    Strings.prototype.isSpecial = function() {
      return Strings.isSpecial(this.string);
    };

    Strings.prototype.isSpace = function() {
      return Strings.isSpace(this.string);
    };

    Strings.prototype.push = function() {
      this.string = this.string + Strings.create.apply(this, arguments);
      return this;
    };

    Strings.prototype.prepend = function() {
      this.string = Strings.create.apply(this, arguments) + this.string;
      return this;
    };

    Strings.prototype.pop = function(amount) {
      this.string = Strings.pop(this.string, amount);
      return this;
    };

    Strings.prototype.insert = function(string, position) {
      this.string = Strings.insert(this.string, string, position);
      return this;
    };

    Strings.prototype.trim = function() {
      this.string = Strings.trim(this.string);
      return this;
    };

    Strings.prototype.trimLeft = function() {
      this.string = Strings.trimLeft(this.string);
      return this;
    };

    Strings.prototype.trimRight = function() {
      this.string = Strings.trimRight(this.string);
      return this;
    };

    Strings.prototype.oneSpace = function() {
      this.string = Strings.oneSpace(this.string);
      return this;
    };

    Strings.prototype.oneSpaceAndTrim = function() {
      this.string = Strings.oneSpaceAndTrim(this.string);
      return this;
    };

    Strings.prototype.find = function(string) {
      return Strings.find(this.string, string);
    };

    Strings.prototype.count = function(string) {
      return Strings.count(this.string, string);
    };

    Strings.prototype.contains = function(string) {
      return Strings.contains(this.string, string);
    };

    Strings.prototype.between = function(before, after) {
      return Strings.between(this.string, before, after);
    };

    Strings.prototype.slice = function(start, size) {
      this.string = Strings.slice(this.string, start, size);
      return this;
    };

    Strings.prototype.truncate = function(size, suffix) {
      this.string = Strings.truncate(this.string, size, suffix);
      return this;
    };

    Strings.prototype.remove = function() {
      var strings;
      strings = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.string = Strings.remove.apply(Strings, [this.string].concat(__slice.call(strings)));
      return this;
    };

    Strings.prototype.removeRange = function(offset, amount) {
      this.string = Strings.removeRange(this.string, offset, amount);
      return this;
    };

    Strings.prototype.removePos = function() {
      var positions;
      positions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.string = Strings.removePos.apply(Strings, [this.string].concat(__slice.call(positions)));
      return this;
    };

    Strings.prototype.replace = function(subString, replacement, flags) {
      this.string = Strings.replace(this.string, subString, replacement, flags);
      return this;
    };

    Strings.prototype.reverse = function() {
      this.string = Strings.reverse(this.string);
      return this;
    };

    Strings.prototype.upper = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.string = Strings.upper.apply(Strings, [this.string].concat(__slice.call(args)));
      return this;
    };

    Strings.prototype.lower = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.string = Strings.lower.apply(Strings, [this.string].concat(__slice.call(args)));
      return this;
    };

    Strings.prototype.shuffle = function() {
      this.string = Strings.shuffle(this.string);
      return this;
    };

    Strings.prototype.toCamel = function(char) {
      this.string = Strings.toCamel(this.string, char);
      return this;
    };

    Strings.prototype.unCamel = function(insertion) {
      this.string = Strings.unCamel(this.string, insertion);
      return this;
    };

    Strings.prototype.startsWith = function(start) {
      return Strings.startsWith(this.string, start);
    };

    Strings.prototype.endsWith = function(ending) {
      return Strings.endsWith(this.string, ending);
    };

    Strings.prototype.setWrap = function(prepend, append) {
      if (_.isNull(this.wrapMethod)) {
        this.wrapMethod = Strings.wrap(prepend, append);
      } else {
        this.wrapMethod.wrap(prepend, append);
      }
      return this;
    };

    Strings.prototype.removeWrap = function() {
      this.wrapMethod = null;
      return this;
    };

    Strings.prototype.applyWrap = function(prepend, append) {
      this.string = this.setWrap(prepend, append).wrap;
      this.removeWrap();
      return this;
    };

    return Strings;

  })(Chars);

  Object.defineProperty(Strings.prototype, '$', {
    get: function() {
      return this.get();
    }
  });

  Object.defineProperty(Strings.prototype, 'length', {
    get: function() {
      return this.string.length;
    }
  });

  Object.defineProperty(Strings.prototype, 'wrap', {
    get: function() {
      if (!_.isNull(this.wrapMethod)) {
        return this.wrapMethod(this.string);
      }
      return this.string;
    }
  });

  Strings.Types = Types;

  Strings.Chars = Chars;

  Strings.crop = Strings.slice;

  if (typeof window !== "undefined" && window !== null) {
    window.Strings = Strings;
  } else {
    module.exports = Strings;
  }

}).call(this);
