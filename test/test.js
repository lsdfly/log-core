// import LogCore from '../src/index'
LogCore.on(LogCore.LEVEL_ERROR, function (e, ee) {
    console.log('错误输出了', e, ee);
    new Image().src=`report?error=${e}&msg=${ee}`
})
new LogCore('测试').error('测试输出')
// let y = new LogCore();
// const LogCore = require('../dist/index')
// LogCore.LEVEL_DEBUG
// window.addEventListener('error',function(e){
//     this.console.log('跨域监控错误：',e.error)

//     let stackTrace = e.error.stack.split("\n")[1];
//     // console.log(stackTrace)
//     if (/ /.test(stackTrace)) {
//         let arr = stackTrace.trim().split(" ");
//         let [, name, url = arr[1]] = arr;

//      let   _sourec = {
//             name,
//             url: url.replace(/\(|\)/g, '')
//         }
//         this.console.log(_sourec)
//     }

// })
// function aa() {
//     var log = new LogCore('页面A');
//     var logCore = new LogCore();
//     // setTimeout(v=>{
//     //     throw new Error("跨域的js出现错误");
//     // },2000)
// //    for(let i=0;i<100;i++){
//     log.log({'test':'log-信息'})
//     // log.log(document.body)
//     // log.debug('debug-信息')
//     // log.warn('wran-信息')
//     // log.error('error-信息')

//     // log.log('ssss')
//     // logCore.log('ssss')
// //    }

// }
// aa()