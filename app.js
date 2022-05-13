// console.log("app Hi");
// function run() {
//     console.log('3초 후 실행');
// }
// console.log("시작");
// setTimeout(run, 3000);
// console.log("끝")

// console.log("app2 Hi");

//#region   sdsd
// function longRunngingTask() {
//     console.log("작업 끝");
// }
// console.log('start');
// setTimeout(longRunngingTask, 0); // setTimeout(.. , 0)은 코드를 논 블로킹으로 만든다.
// console.log('end');
//#endregion


//#region 객체 리터럴
// // --> 객체에 동적으로 속성을 추가할수 있다.
// var sayNode = function() {
//     console.log('Node');
// }

// var es = 'ES';
// var oldObject = {
//     sayJS : function() {
//         console.log('JS');
//     },
//     sayNode : sayNode,
// };

// oldObject[es + 6] = 'Fantastic';
// oldObject.sayNode();
// oldObject.sayJS();
// console.log(oldObject.ES6);
//#endregion

//#region worker_therad
// const { Worker, isMainThread, parentPort} = require('worker_threads');  
//   if (isMainThread) 
//   { // 부모일 때
//     const worker = new Worker(__filename); // 현재 파일을 Worker스레드에서 실행시킨다.
//     worker.on('message', message => console.log('from worker', message)); // 메세지 대기
//     worker.on('exit', () => console.log('worker exit'));
//     worker.postMessage('ping'); // worker로 메세지를 보낸다.
//   }
//   else 
//   { // 워커일 때
//     parentPort.on('message', (value) => {
//       console.log('from parent', value);
//       parentPort.postMessage('pong');
//       parentPort.close(); // worker를 종료시킨다.
//     });
//   }  
//#endregion

// //#region worker_therad2
// const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
// if(isMainThread)
// {
//     const threads = new Set();
//     // 일단 new Worker로 생성되면서 바로 실행된다.
//     threads.add(new Worker(__filename, {
//         workerData : {start : 1}
//     }));
//     threads.add(new Worker(__filename, {
//         workerData : {start : 2}
//     }));

//     for (let worker of threads)
//     {
//         worker.on('message', message=>console.log('from workder : ', message));
//         worker.on('exit', ()=>{
//             threads.delete(worker);
//             if(threads.size == 0 )
//             {
//                 console.log('job done');
//             }
//         });
//     }
// }
// else
// {
//     console.log('start worker');    
//     const data = workerData;
//     parentPort.postMessage(data.start + 100);
// }
// //#endregion
