

export function splittime(time: string){
    // 回傳值為二維陣列，為[][],內部陣列為[星期, 開始節次, 結束節次]
    let store = time.split(" ");
    store.splice(0,1);
    let arr = [];
    for(let i = 0; i < store.length; i++){
        let temp = [];
        let a = store[i].charAt(0);
        store[i] = store[i].slice(1);
        temp.push(a);
        store[i] = store[i].split(",");
        temp.push(store[i][0]);
        temp.push(store[i][store[i].length-1]);
        arr.push(temp);
    }
    return arr;
}