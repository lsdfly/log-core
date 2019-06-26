(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.LogCore = factory());
}(this, function () { 'use strict';

    // const logCore = new LogCode('LogCode');
    var globalLevel = 5, lastSource = '', init = false;
    var LogCode = function LogCode(name) {
        this.name = '';
        this.name = name || '未定义模块名称';
        this.init();
    };
    LogCode.prototype.init = function init$1 () {
        init || (init = true) && console.log("%c LogCore日志组件", "font-size:50px;color:red;-webkit-text-fill-color:red;-webkit-text-stroke: 1px black;");
    };
    LogCode.setLevel = function setLevel (level) {
        globalLevel = level;
    };
    // 信息级别
    // static LEVEL_INFO = 0;
    LogCode.prototype.log = function log () {
            var p = [], len = arguments.length;
            while ( len-- ) p[ len ] = arguments[ len ];

        this.debug('设置日志级别', globalLevel);
        if (globalLevel >= LogCode.LEVEL_LOG) {
            this.logSource();
            p.unshift(((this.name) + ":"));
            console.log.apply(this, p);
        }
    };
    LogCode.prototype.debug = function debug () {
            var p = [], len = arguments.length;
            while ( len-- ) p[ len ] = arguments[ len ];

        if (globalLevel >= LogCode.LEVEL_DEBUG) {
            this.logSource();
            p.unshift(((this.name) + ":"));
            console.debug.apply(this, p);
        }
    };
    LogCode.prototype.warn = function warn () {
            var p = [], len = arguments.length;
            while ( len-- ) p[ len ] = arguments[ len ];

        if (globalLevel >= LogCode.LEVEL_WARN) {
            this.logSource();
            p.unshift(((this.name) + ":"));
            console.warn.apply(this, p);
        }
    };
    LogCode.prototype.error = function error () {
            var p = [], len = arguments.length;
            while ( len-- ) p[ len ] = arguments[ len ];

        if (globalLevel >= LogCode.LEVEL_ERROR) {
            this.logSource();
            p.unshift(((this.name) + ":"));
            console.error.apply(this, p);
        }
    };
    LogCode.prototype.logSource = function logSource () {
        var d = new Date();
        var time = (d.getFullYear()) + "-" + (d.getMonth()) + "-" + (d.getDate()) + " " + (d.getHours()) + ":" + (d.getMinutes()) + ":" + (d.getSeconds());
        var ref = this.getSource(4);
            var name = ref.name;
            var url = ref.url;
        var _sourec = name + "  " + url;
        if (lastSource != _sourec) {
            lastSource = _sourec;
            console.log(((this.name) + ": %c" + time + "%c " + _sourec), 'color:red', 'color:#000');
        }
    };
    LogCode.prototype.getSource = function getSource (depth) {
            if ( depth === void 0 ) depth = 2;

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
            var name = arr[1];
                var url = arr[2]; if ( url === void 0 ) url = arr[1];
            _sourec = {
                name: name,
                url: url.replace(/\(|\)/g, '')
            };
        }
        else if (/@/.test(stackTrace)) {
            var arr$1 = stackTrace.trim().split(/@/);
            // console.log('切割=',arr)
            var ref = arr$1;
                var name$1 = ref[0];
                var url$1 = ref[1]; if ( url$1 === void 0 ) url$1 = arr$1[0];
            _sourec = {
                name: name$1,
                url: url$1.replace(/\(|\)/g, '')
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
    //# sourceMappingURL=LogCore.js.map

    return LogCode;

}));
