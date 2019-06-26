import ILogCode, { ILevel } from './ILogCore';
declare class LogCode implements ILogCode {
    /**
     *
     * @param name 模块名称
     */
    constructor(name: string);
    private init;
    static setLevel(level: ILevel): void;
    name: string;
    /**
     * 调试级别
     */
    static LEVEL_DEBUG: ILevel;
    /**
     * 日志级别
     */
    static LEVEL_LOG: ILevel;
    /**
     * 警告级别
     */
    static LEVEL_WARN: ILevel;
    /**
     * 错误级别
     */
    static LEVEL_ERROR: ILevel;
    /**
     * 关闭日志
     */
    static LEVEL_OFF: ILevel;
    log(...p: any): void;
    debug(...p: any): void;
    warn(...p: any): void;
    error(...p: any): void;
    private logSource;
    private getSource;
}
export default LogCode;
