export default interface ILogCode {
    //模块名称
    // private  readonly  name:string|undefined
    //普通日志
    log(...p: any): void
    //调试日志
    debug(...p: any): void
    // 错误日志
    error(...p: any): void
    //警告
    warn(...p: any): void
    // //信息
    // info(...p: any): void

}
export type ILevel = 0 | 1 | 2 | 3 | 4;