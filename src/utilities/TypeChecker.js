module.exports.TYPE_OF = (value) => typeof value
module.exports.IS_INVALID_INSTANCE = (value, instance) => (value instanceof instance) == false;
module.exports.IS_INVALID_TYPE = (value, type) => (typeof value == type) == false;