```js
yarn add log-core
import LogCode from "log-core";
// 错误级别
LogCode.LEVEL_ERROR
//普通
LogCode.LEVEL_LOG
// 警告
LogCode.LEVEL_WARN
// 调试
LogCode.LEVEL_DEBUG
// 关闭
LogCode.LEVEL_OFF
LogCode.on(LogCode.LEVEL_ERROR, (err, msg) => {
    console.log('错误事件被触发');
    //异步上传到服务器记录
    new Image().src = `report?err=${err}&msg=${msg}`
})
// 只输出error事件
LogCode.setLevel(LogCode.LEVEL_ERROR)
const logCore = new LogCode('A页面');
logCore.debug('输出-debug')
logCore.log('输出-warn')
logCore.warn('输出-warn')
logCore.error('输出-error')
```