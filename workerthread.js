


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

//#region 소수 구하기
const min =2;
const max = 10000000;
let primes = [];

function generatePrimes(start, range)
{   
    let isPrime = true;
    const end = start + range;
    for(let i = start; i < end; i++)
    {
        for(let j = min; j < Math.sqrt(end); j++)
        {
            if(i !== j && i % j ===0)
            {
                isPrime = false;
                break;
            }
        }
        if(isPrime)
        {
            primes.push(i);
        }
        isPrime = true;
    }
}
const { exit } = require('process');
// console.time('prime');
// generatePrimes(min, max);
// console.timeEnd('prime');
// console.log(primes.length);
// const { getEnabledCategories } = require('trace_events');
// // console.log(primes);

const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
function findPrimes(start, range)
{
    let isPrime = true;
    const end = start + range;
    for(let i = start; i < end; i++)
    {
        for(let j = min; j < Math.sqrt(end); j++)
        {
            if(i !== j && i % j ===0)
            {
                isPrime = false;
                break;
            }
        }
        if(isPrime)
        {
            primes.push(i);
        }
        isPrime = true;
    }
}

if(isMainThread)
{
    const max = 100;//00000;
    const threadCount = 8;
    const threads = new Set();
    const range = Math.ceil((max-min) / threadCount);
    let start = min;
    console.time('prime');
    for(let i = 0; i < threadCount-1; i++)
    {
        const wStart = start;
        threads.add(new Worker(__filename, {workerData:{start:wStart, range : range}}));
        start += range;
    }
    threads.add(new Worker(__filename, {workerData : {start : start , range:range + ((max - min + 1) % threadCount)}}));

    for(let woker of threads)
    {
        woker.on('error', (err)=>{
            throw err;
        });
        woker.on('exit', ()=>{
            threads.delete(woker);
            if(threads.size ==0)
            {
                console.timeEnd('prime');
                console.log(primes.length);
                console.log(primes);
            }
        });
        woker.on('message', (msg)=>{
            // msg는 worker 스레드 파일의 변수 primes다.
            // 각 primes들이 maint스레드의 primes로 합쳐진다.
            console.log('msg : ' + msg);
            console.log('primes before : ' + primes);

            primes = primes.concat(msg);
            console.log('primes  after : ' + primes);
            console.log('');
        })
    }
}
else
{
    // worker 스레드
    // file로 생성된다. worker스레드별 primes를 따로가진다.
    findPrimes(workerData.start, workerData.range);
    
    console.log('worker primes before : ' + primes);
    parentPort.postMessage(primes);
}



//#endregion