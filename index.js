var booleans = {
    true: true,
    false: false,
    undefined: undefined,
    null: null,
    NaN: NaN
};
module.exports = {
    json: function () {
        return function (req, res, next) {
            var n, body = req.body;
            for (n in body) {
                body[n] = parse(body[n]);
            }
            next();
        };
    }
};

function parse(value) {
    if (typeof value !== 'string') {
        return value;
    }
    var converted, first = value[0],
        last = value[value.length - 1];
    if (booleans.hasOwnProperty(value)) {
        return booleans[value];
    } else if ((converted = +value) === converted) {
        return converted;
    } else if ((first === '{' && last === '}') || (first === '[' && last === ']')) {
        return tryparse(value);
    } else {
        return value;
    }
}

function tryparse(value) {
    try {
        return JSON.parse(value);
    } catch (e) {}
}