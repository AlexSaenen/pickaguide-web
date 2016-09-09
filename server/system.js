const System = {};

System.Logger = function Constructor() {
    if (!(this instanceof System.Logger)) {
        return new System.Logger();
    }
};

System.Logger.prototype._log = function _log(level, str) {
    console.log(`[${level}]: ${str}`);
};

System.Logger.prototype.info = function info(str) {
    this._log('info', str);
};

System.Logger.prototype.warn = function warn(str) {
    this._log('warn', str);
};

System.Logger.prototype.error = function error(str) {
    this._log('error', str);
};

module.exports = {
    System,
};
