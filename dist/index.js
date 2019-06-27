(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.LogCore = factory());
}(this, function () { 'use strict';

    // const logCore = new LogCode('LogCode');
    var globalLevel = 5, lastSource = '', init = false, queue = {}, logCore = null;
    var LogCode = /** @class */ (function () {
        /**
         *
         * @param name 模块名称
         */
        function LogCode(name) {
            this.name = '';
            this.name = name || '未定义模块名称';
            this.init();
        }
        LogCode.prototype.init = function () {
            if (!init) {
                init = true;
                console.log("%c LogCore日志组件", "font-size:50px;color:red;-webkit-text-fill-color:red;-webkit-text-stroke: 1px black;");
            }
        };
        LogCode.on = function (level, cb) {
            queue[level] = cb;
        };
        LogCode.setLevel = function (level) {
            globalLevel = level;
        };
        LogCode.log = function () {
            var arguments$1 = arguments;

            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments$1[_i];
            }
            logCore || (logCore = new LogCode(''));
            logCore.log.apply(logCore, p);
        };
        LogCode.debug = function () {
            var arguments$1 = arguments;

            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments$1[_i];
            }
            logCore || (logCore = new LogCode(''));
            logCore.debug.apply(logCore, p);
        };
        LogCode.error = function () {
            var arguments$1 = arguments;

            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments$1[_i];
            }
            logCore || (logCore = new LogCode(''));
            logCore.error.apply(logCore, p);
        };
        LogCode.warn = function () {
            var arguments$1 = arguments;

            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments$1[_i];
            }
            logCore || (logCore = new LogCode(''));
            logCore.warn.apply(logCore, p);
        };
        // 信息级别
        // static LEVEL_INFO = 0;
        LogCode.prototype.log = function () {
            var arguments$1 = arguments;

            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments$1[_i];
            }
            console.debug('设置日志级别', globalLevel);
            if (globalLevel >= LogCode.LEVEL_LOG) {
                var s = this.logSource();
                queue[LogCode.LEVEL_LOG] && queue[LogCode.LEVEL_ERROR](p, s);
                p.unshift(this.name + ":");
                console.log.apply(this, p);
            }
        };
        LogCode.prototype.debug = function () {
            var arguments$1 = arguments;

            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments$1[_i];
            }
            if (globalLevel >= LogCode.LEVEL_DEBUG) {
                var s = this.logSource();
                queue[LogCode.LEVEL_DEBUG] && queue[LogCode.LEVEL_ERROR](p, s);
                p.unshift(this.name + ":");
                console.debug.apply(this, p);
            }
        };
        LogCode.prototype.warn = function () {
            var arguments$1 = arguments;

            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments$1[_i];
            }
            if (globalLevel >= LogCode.LEVEL_WARN) {
                var s = this.logSource();
                queue[LogCode.LEVEL_WARN] && queue[LogCode.LEVEL_ERROR](p, s);
                p.unshift(this.name + ":");
                console.warn.apply(this, p);
            }
        };
        LogCode.prototype.error = function () {
            var arguments$1 = arguments;

            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments$1[_i];
            }
            if (globalLevel >= LogCode.LEVEL_ERROR) {
                var s = this.logSource();
                queue[LogCode.LEVEL_ERROR] && queue[LogCode.LEVEL_ERROR](p, s);
                p.unshift(this.name + ":");
                console.error.apply(this, p);
            }
        };
        LogCode.prototype.logSource = function () {
            var d = new Date();
            var time = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            var _a = this.getSource(4), name = _a.name, url = _a.url;
            var _sourec = name + "  " + url;
            if (lastSource != _sourec) {
                lastSource = _sourec;
                console.log(this.name + ": %c" + time + "%c " + _sourec, 'color:red', 'color:#000');
            }
            return time + " " + _sourec;
        };
        LogCode.prototype.getSource = function (depth) {
            if (depth === void 0) { depth = 2; }
            var error = {}, _sourec = {};
            try {
                throw new Error("999");
                // throw new Error("主站的js出现错误");
            }
            catch (e) {
                error = e;
            }
            // console.log('原样=',typeof error.stack )
            // console.log('typeof=',typeof error )
            // console.log('SON.stringify=',JSON.stringify(error)  )
            // console.log('valueOf=',error.valueOf()+'***' )
            // console.log('toString=',error.toString() )
            // IE9 does not have .stack property
            if (error.stack === undefined) {
                return _sourec;
            }
            // console.log(error.stack)
            var stackTrace = error.stack.split("\n")[depth];
            // console.log(stackTrace)
            if (/ /.test(stackTrace)) {
                var arr = stackTrace.trim().split(/ |@/);
                // console.log('切割=',arr)
                var name_1 = arr[1], _a = arr[2], url = _a === void 0 ? arr[1] : _a;
                _sourec = {
                    name: name_1,
                    url: url.replace(/\(|\)/g, '')
                };
            }
            else if (/@/.test(stackTrace)) {
                var arr = stackTrace.trim().split(/@/);
                // console.log('切割=',arr)
                var name_2 = arr[0], _b = arr[1], url = _b === void 0 ? arr[0] : _b;
                _sourec = {
                    name: name_2,
                    url: url.replace(/\(|\)/g, '')
                };
            }
            return _sourec;
        };
        /**
         * 调试级别
         */
        LogCode.LEVEL_DEBUG = 4;
        /**
         * 日志级别
         */
        LogCode.LEVEL_LOG = 3;
        /**
         * 警告级别
         */
        LogCode.LEVEL_WARN = 2;
        /**
         * 错误级别
         */
        LogCode.LEVEL_ERROR = 1;
        /**
         * 关闭日志
         */
        LogCode.LEVEL_OFF = 0;
        return LogCode;
    }());

    return LogCode;

}));
