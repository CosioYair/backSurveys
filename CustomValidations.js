module.exports = {
    isUnique(modelName, field, primaryKey = 'Oid') {
        return function (value, next) {
            var Model = require("./models")[modelName];
            var query = {};
            query[field] = value;
            Model.findOne({ where: query }).then(obj => {
                if (obj) {
                    next(`The ${field.split("_").join(" ")} ${value} is already in use`);
                } else {
                    next();
                }
            });
        };
    }
}
