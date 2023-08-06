

export function splittime(time: string){
    // 回傳值為二維陣列，為[][],內部陣列為[星期, 開始節次, 結束節次]
    let store = time.split(" ");
    let arr:[string, string, string][] = [];
    for(let i = 0; i < store.length; i++){
        let temp = store[i][0];
        // temp2 remove the first char
        let temp2 = store[i].slice(1);
        let temp3 = temp2.split(",");
        let single_data: [string, string, string] = [temp, temp3[0], ''];
        if(temp3.length > 1)
            single_data[2] = temp3[1];
        else
            single_data[2] = temp3[0];
        // push to arr
        arr.push(single_data);
    }
    return arr;
}