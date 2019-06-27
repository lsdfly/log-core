import ILogCode, { ILevel } from './ILogCore';
// const logCore = new LogCode('LogCode');
let globalLevel = 5, lastSource = '', init = false, queue: { [key: number]: any } = {},
    logCore: any = null;
class LogCode implements ILogCode {
    /**
     * 
     * @param name 模块名称
     */
    constructor(name: string) {
        this.name = name || '未定义模块名称';

        this.init();
    }
    private init() {

        if (!init) {
            init = true
            console.log("%c LogCore日志组件", "font-size:50px;color:red;-webkit-text-fill-color:red;-webkit-text-stroke: 1px black;")


        }
    }
    static on(level: ILevel, cb: Function) {
        queue[level] = cb;
    }
    static setLevel(level: ILevel) {

        globalLevel = level;

    }
    static log(...p: any) {
        logCore || (logCore = new LogCode(''));
        logCore.log.apply(logCore, p)
    }
    static debug(...p: any) {
        logCore || (logCore = new LogCode(''));
        logCore.debug.apply(logCore, p)
    }
    static error(...p: any) {
        logCore || (logCore = new LogCode(''));
        logCore.error.apply(logCore, p)
    }
    static warn(...p: any) {
        logCore || (logCore = new LogCode(''));
        logCore.warn.apply(logCore, p)
    }
    private name = '';

    /**
     * 调试级别
     */
    static LEVEL_DEBUG: ILevel = 4;
    /**
     * 日志级别
     */
    static LEVEL_LOG: ILevel = 3;
    /**
     * 警告级别
     */
    static LEVEL_WARN: ILevel = 2;
    /**
     * 错误级别
     */
    static LEVEL_ERROR: ILevel = 1;
    /**
     * 关闭日志
     */
    static LEVEL_OFF: ILevel = 0;
    // 信息级别
    // static LEVEL_INFO = 0;
    log(...p: any): void {
        console.debug('设置日志级别', globalLevel)
        if (globalLevel >= LogCode.LEVEL_LOG) {
            let s = this.logSource();
            queue[LogCode.LEVEL_LOG] && queue[LogCode.LEVEL_ERROR](p, s);
            p.unshift(`${this.name}:`);
            console.log.apply(this, p)
        }
    }
    debug(...p: any): void {
        if (globalLevel >= LogCode.LEVEL_DEBUG) {
            let s = this.logSource();
            queue[LogCode.LEVEL_DEBUG] && queue[LogCode.LEVEL_ERROR](p, s);
            p.unshift(`${this.name}:`);
            console.debug.apply(this, p);
        }
    }

    warn(...p: any): void {
        if (globalLevel >= LogCode.LEVEL_WARN) {
            let s = this.logSource();
            queue[LogCode.LEVEL_WARN] && queue[LogCode.LEVEL_ERROR](p, s);
            p.unshift(`${this.name}:`);
            console.warn.apply(this, p)
        }
    }
    error(...p: any): void {
        if (globalLevel >= LogCode.LEVEL_ERROR) {
            let s = this.logSource();
            queue[LogCode.LEVEL_ERROR] && queue[LogCode.LEVEL_ERROR](p, s);
            p.unshift(`${this.name}:`);
            console.error.apply(this, p)
        }
    }
    private logSource() {
        let d = new Date();
        let time = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        let { name, url } = this.getSource(4);
        let _sourec = `${name}  ${url}`;
        if (lastSource != _sourec) {
            lastSource = _sourec;
            console.log(`${this.name}: %c${time}%c ${_sourec}`, 'color:red', 'color:#000');
        }
        return `${time} ${_sourec}`;
    }

    private getSource(depth = 2): any {

        let error = {} as Error, _sourec = {} as any;

        try {
            throw new Error("999")
            // throw new Error("主站的js出现错误");

        } catch (e) {

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
        let stackTrace = error.stack.split("\n")[depth];
        // console.log(stackTrace)
        if (/ /.test(stackTrace)) {
            let arr = stackTrace.trim().split(/ |@/);
            // console.log('切割=',arr)
            let [, name, url = arr[1]] = arr;

            _sourec = {
                name,
                url: url.replace(/\(|\)/g, '')
            }

        } else if (/@/.test(stackTrace)) {
            let arr = stackTrace.trim().split(/@/);
            // console.log('切割=',arr)
            let [name, url = arr[0]] = arr;

            _sourec = {
                name,
                url: url.replace(/\(|\)/g, '')
            }
        }
        return _sourec;
    }
}
export default LogCode;