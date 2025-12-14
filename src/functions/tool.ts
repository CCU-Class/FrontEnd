export function splittime(time: string) {
  // 回傳值為二維陣列，為[][],內部陣列為[星期, 開始節次, 結束節次]
  // 移除前後空白
  time = time.trim();
  // 以空白分割不同的時間區段
  let store = time.split(" ");
  let arr: [string, string, string][] = [];
  for (let i = 0; i < store.length; i++) {
    let temp = store[i][0];
    // temp2 remove the first char
    // 去掉星期幾 只留時間
    let temp2 = store[i].slice(1);
    let TimeArr = temp2.split(",");
    // 把每個時段切開
    for (let j = 0; j < TimeArr.length; j++) {
      let single_data: [string, string, string] = [
        temp,
        TimeArr[j],
        TimeArr[j],
      ];
      arr.push(single_data);
    }
  }
  return arr;
}
