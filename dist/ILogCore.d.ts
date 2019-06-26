export default interface ILogCode {
    log(...p: any): void;
    debug(...p: any): void;
    error(...p: any): void;
    warn(...p: any): void;
}
export declare type ILevel = 0 | 1 | 2 | 3 | 4;
