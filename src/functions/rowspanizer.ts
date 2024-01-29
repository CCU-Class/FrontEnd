import store from "../store";
import { Course } from "./general.ts";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export function rowspanize(inputTable: Course[][]): void {
  let table = _.cloneDeep(inputTable);
  let tmpuuid1 = uuidv4(),
    tmpuuid2 = uuidv4();
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      table[i][j].setLength(0);
      if (j == 0 && table[i][j].getStartTime() != "") {
        table[i][j].setStartTime("");
      }

      if (j < 3 && table[i][j].getUuid() == "") {
        // 沒更新的處理一下
        if (j == 0) {
          table[i][j].setUuid(uuidv4()); // 每格都不一樣
        } else if (j == 1) {
          table[i][j].setUuid(tmpuuid1);
          if ((i + 1) % 2 == 0) tmpuuid1 = uuidv4();
        } else if (j == 2) {
          table[i][j].setUuid(tmpuuid2);
          if ((i + 1) % 3 == 0) tmpuuid2 = uuidv4();
        }
      }
    }
  }
  for (let j = 0; j < table[0].length; j++) {
    let current: string = table[0][j].getUuid();
    let currentIndex: number = 0;
    let len: number = 1;
    for (let i = 1; i < table.length; i++) {
      if (current === table[i][j].getUuid()) len++;
      else if (current != table[i][j].getUuid()) {
        table[currentIndex][j].setLength(len);
        len = 1;
        currentIndex = i;
        current = table[i][j].getUuid();
      }
    }
    table[currentIndex][j].setLength(len);
  }
  store.dispatch("addCourse", table);
}
