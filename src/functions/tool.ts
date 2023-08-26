

export function splittime(time: string){
    // console.log(time)
    // 回傳值為二維陣列，為[][],內部陣列為[星期, 開始節次, 結束節次]
    let store = time.split(" ");
    store.splice(0,1);
    // console.log(store)
    let arr:[string, string, string][] = [];
    for(let i = 0; i < store.length; i++){
        let temp = store[i][0];
        // temp2 remove the first char
        let temp2 = store[i].slice(1);
        let temp3 = temp2.split(",");
        let single_data: [string, string, string] = [temp, temp3[0], temp3[temp3.length - 1]];
        // push to arr
        arr.push(single_data);
    }
    return arr;
}