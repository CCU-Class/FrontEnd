import { Module } from "vuex";
import { Course, InitTable } from "../functions/general";
import { rowspanize } from "../functions/rowspanizer";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { toRaw } from "vue";
const env = import.meta.env;

interface State {
  show: boolean;
  TotalCourseData: Array<CourseData>;
  show_ColorPick: boolean;
  chooseCard: Course | null;
  cardMode: number;
  defaultColor: string;
  showTable: boolean;
  show_credit: boolean;
  searchTime_status: boolean;
  timeSearchMode: boolean;
  timeSearchArgument: Array<number>;
  runConflict: number;
  selectedYear: number;
  selectedSemester: number;
  activeIndex: number;
}

interface CourseData {
  name: string;
  id: string;
  classStorage: Array<Array<Course>>;
  classListStorage: Array<Course>;
  credit: number;
}

interface CourseAppearanceUpdate {
  uuid: string;
  color?: string;
  textColor?: string;
}

const DEFAULT_COURSE_COLOR =
  env.VITE_CARD_DEFAULT_COLOR || "rgb(192 215 193 / 1)";

function isBlankColor(color: string | null | undefined): boolean {
  return typeof color !== "string" || color.trim() === "";
}

function normalizeCourseColors(courseData: CourseData): boolean {
  let changed = false;
  const applyDefaultColor = (course: Course) => {
    if (course.getIsCourse() && isBlankColor(course.getColor())) {
      course.setColor(DEFAULT_COURSE_COLOR);
      changed = true;
    }
  };

  courseData.classListStorage.forEach(applyDefaultColor);
  courseData.classStorage.forEach((row) =>
    row.forEach(applyDefaultColor),
  );
  return changed;
}

function Transfer(data: any) {
  let temp: Course[][] = [];
  for (let i = 0; i < data.length; i++) {
    let t: Course[] = [];
    for (let j = 0; j < data[i].length; j++) {
      t.push(new Course(data[i][j]["courseData"]));
    }
    temp.push(t);
  }
  return temp;
}

function Transfer_class_list(data: any) {
  let temp: Course[] = [];
  for (let i = 0; i < data.length; i++) {
    temp.push(new Course(data[i]["courseData"]));
  }
  return temp;
}

// 僅回傳值
function OldDataTransfer(): Array<CourseData> {
  console.log("OldDataTransfer");
  let courseTable: string | null =
    localStorage.getItem("courseTable");
  let courseList: string | null = localStorage.getItem("courseList");
  let creditL: string | null = localStorage.getItem("credit");
  if (courseTable != null || courseList != null || creditL != null) {
    console.log("not null");
    localStorage.removeItem("courseTable");
    localStorage.removeItem("courseList");
    localStorage.removeItem("credit");
    let TotalCourseData: Array<CourseData> = [];
    TotalCourseData.push({
      name: "課表",
      id: uuidv4(),
      classStorage: rowspanize(Transfer(JSON.parse(courseTable!))),
      classListStorage: Transfer_class_list(JSON.parse(courseList!)),
      credit: Number(creditL),
    });
    return TotalCourseData;
  }
  return [
    {
      name: "課表",
      id: uuidv4(),
      classStorage: rowspanize(InitTable()),
      classListStorage: [],
      credit: 0,
    },
  ];
}

const store: Module<State, any> = {
  state: {
    show: false,
    TotalCourseData: [],
    show_ColorPick: false,
    chooseCard: null,
    cardMode: 0,
    defaultColor: DEFAULT_COURSE_COLOR,
    showTable: true,
    show_credit: false,
    searchTime_status: false,
    timeSearchMode: false,
    timeSearchArgument: [0, 0, 0],
    runConflict: 0,
    selectedYear: 113,
    selectedSemester: 1,
    activeIndex: 0,
  },
  mutations: {
    set_yearNsemester(state: State, data: Array<number>) {
      state.selectedYear = data[0];
      state.selectedSemester = data[1];
    },
    display(state: State) {
      state.show = true;
    },
    hidden(state: State) {
      state.show = false;
    },
    show_credit(state: State) {
      state.show_credit = true;
    },
    hidden_credit(state: State) {
      state.show_credit = false;
    },
    initAll(state: State) {
      console.log("initAll");
      let TotalCourseData = localStorage.getItem("TotalCourseData");
      // 無資料或者是僅有舊資料
      // console.log(TotalCourseData);
      if (TotalCourseData === null) {
        console.log("initAll debug");
        state.TotalCourseData = OldDataTransfer();
        state.TotalCourseData.forEach(normalizeCourseColors);
        console.log(state.TotalCourseData);
        localStorage.setItem(
          "TotalCourseData",
          JSON.stringify(state.TotalCourseData),
        );
        return;
      }
      state.TotalCourseData = JSON.parse(TotalCourseData);
      let colorsNormalized = false;
      for (let i = 0; i < state.TotalCourseData.length; i++) {
        state.TotalCourseData[i].classStorage = rowspanize(
          Transfer(state.TotalCourseData[i].classStorage),
        );
        state.TotalCourseData[i].classListStorage =
          Transfer_class_list(
            state.TotalCourseData[i].classListStorage,
          );
        colorsNormalized =
          normalizeCourseColors(state.TotalCourseData[i]) ||
          colorsNormalized;
      }
      if (colorsNormalized) {
        localStorage.setItem(
          "TotalCourseData",
          JSON.stringify(state.TotalCourseData),
        );
      }
    },
    // initCourseFromLocalstorage(state: State) {
    //   let courseTable: string | null =
    //     localStorage.getItem("courseTable");
    //   if (courseTable == null || courseTable == "") {
    //     state.classStorage = InitTable();
    //     rowspanize(state.classStorage);
    //     localStorage.setItem(
    //       "courseTable",
    //       JSON.stringify(state.classStorage),
    //     );
    //     return;
    //   }
    //   let data = JSON.parse(courseTable!);
    //   state.classStorage = Transfer(data);
    //   rowspanize(state.classStorage);
    // },
    addCourse(state: State, data: Array<Array<Course>>) {
      // console.log(state.classStorage);
      state.TotalCourseData[state.activeIndex].classStorage = data;
      // console.log(state.classStorage);
      localStorage.setItem(
        "TotalCourseData",
        JSON.stringify(state.TotalCourseData),
      );
    },
    clearCourse(state: State) {
      // console.log("clear")
      state.TotalCourseData[state.activeIndex].classStorage =
        rowspanize(InitTable());
      state.TotalCourseData[state.activeIndex].classListStorage = [];
      state.TotalCourseData[state.activeIndex].credit = 0;
      state.chooseCard = null;
      localStorage.setItem(
        "TotalCourseData",
        JSON.stringify(state.TotalCourseData),
      );
      // state.classStorage = InitTable();
      // rowspanize(state.classStorage);
      // console.log(state.classStorage)
      // state.classListStorage = [];
      // state.credit = 0;
      // state.chooseCard = null;
      // localStorage.setItem(
      //   "courseTable",
      //   JSON.stringify(state.classStorage),
      // );
      // localStorage.setItem(
      //   "courseList",
      //   JSON.stringify(state.classListStorage),
      // );
      // localStorage.setItem("credit", state.credit.toString());
    },
    // initCourseListFromLocalstorage(state: State) {
    //   let courseList: string | null =
    //     localStorage.getItem("courseList");
    //   if (courseList == null) {
    //     state.classListStorage = [];
    //     localStorage.setItem(
    //       "courseList",
    //       JSON.stringify(state.classListStorage),
    //     );
    //     return;
    //   }
    //   let data = JSON.parse(courseList!);
    //   state.classListStorage = Transfer_class_list(data);
    // },
    addCourseList(state: State, Class: Course) {
      state.TotalCourseData[state.activeIndex].classListStorage.push(
        Class,
      );
      // state.classListStorage.push(Class);
      // localStorage.setItem(
      //   "courseList",
      //   JSON.stringify(state.classListStorage),
      // );
      localStorage.setItem(
        "TotalCourseData",
        JSON.stringify(state.TotalCourseData),
      );
    },
    deleteCourseList(state: State, Class: Course) {
      // let List = state.classListStorage;
      let List =
        state.TotalCourseData[state.activeIndex].classListStorage;
      let temp: Array<Course> = [];
      for (let i = 0; i < List.length; i++) {
        if (List[i].getUuid() == Class.getUuid()) {
          continue;
        } else {
          temp.push(List[i]);
        }
      }
      // state.classListStorage = temp;
      state.TotalCourseData[state.activeIndex].classListStorage =
        temp;
      // localStorage.setItem(
      //   "courseList",
      //   JSON.stringify(state.classListStorage),
      // );
      localStorage.setItem(
        "TotalCourseData",
        JSON.stringify(state.TotalCourseData),
      );
    },
    // initCredit(state: State) {
    //   let creditL: string | null = localStorage.getItem("credit");
    //   if (creditL == null) {
    //     state.credit = 0;
    //     localStorage.setItem("credit", state.credit.toString());
    //     return;
    //   }
    //   state.credit = Number(creditL);
    // },
    addCredit(state: State, delta: number) {
      // state.credit += delta;
      state.TotalCourseData[state.activeIndex].credit += delta;
      // console.log(state.credit, delta)
      // localStorage.setItem("credit", state.credit.toString());
      localStorage.setItem(
        "TotalCourseData",
        JSON.stringify(state.TotalCourseData),
      );
    },
    changeShowColorPick(state: State, Bool: boolean) {
      state.show_ColorPick = Bool;
    },
    setChooseCard(state: State, Card: Course) {
      state.chooseCard = Card;
    },
    setCardMode(state: State, mode: number) {
      state.cardMode = mode;
    },
    setDefaultColor(state: State, color: string) {
      state.defaultColor = color;
    },
    updateCourseAppearance(
      state: State,
      update: CourseAppearanceUpdate,
    ) {
      const courseData = state.TotalCourseData[state.activeIndex];
      if (!courseData) return;

      const updateCourse = (course: Course) => {
        if (course.getUuid() !== update.uuid) return;
        if (update.color !== undefined) course.setColor(update.color);
        if (update.textColor !== undefined) {
          course.setTextColor(update.textColor);
        }
      };

      courseData.classListStorage.forEach(updateCourse);
      courseData.classStorage.forEach((row) =>
        row.forEach(updateCourse),
      );
      localStorage.setItem(
        "TotalCourseData",
        JSON.stringify(state.TotalCourseData),
      );
    },
    setShowTable(state: State, Bool: boolean) {
      state.showTable = Bool;
    },
    setSearchTimeTable(state: State, Bool: boolean) {
      state.searchTime_status = Bool;
    },
    changeTimeSearchMode(state: State) {
      state.timeSearchMode = !state.timeSearchMode;
    },
    setTimeSearchMode(state: State, Bool: boolean) {
      state.timeSearchMode = Bool;
    },
    settimeSearchArgument(state: State, arg: Array<number>) {
      state.timeSearchArgument = arg;
    },
    setrunConflictState(state: State, arg: number) {
      state.runConflict = arg;
    },
    updateCourseList(state: State, data: Array<Course>) {
      // state.classListStorage = data;
      // localStorage.setItem(
      //   "courseList",
      //   JSON.stringify(state.classListStorage),
      // );
      state.TotalCourseData[state.activeIndex].classListStorage =
        data;
      localStorage.setItem(
        "TotalCourseData",
        JSON.stringify(state.TotalCourseData),
      );
    },
    setactiveIndex(state: State, index: number) {
      state.activeIndex = index;
    },
    addTabs(state: State, id: string | null) {
      if (id == null) {
        state.TotalCourseData.push({
          name: `課表${state.TotalCourseData.length + 1}`,
          id: uuidv4(),
          classStorage: rowspanize(InitTable()),
          classListStorage: [],
          credit: 0,
        });
        state.activeIndex = state.TotalCourseData.length - 1;
      } else {
        console.log(state.TotalCourseData);
        let length = state.TotalCourseData.length;
        for (let i = 0; i < length; i++) {
          if (state.TotalCourseData[i].id == id) {
            state.TotalCourseData.push(
              _.cloneDeep(toRaw(state.TotalCourseData[i])),
            );
            state.activeIndex = state.TotalCourseData.length - 1;
            state.TotalCourseData[state.activeIndex].id = uuidv4();
            state.TotalCourseData[state.activeIndex].name =
              state.TotalCourseData[state.activeIndex].name + " copy";
            break;
          }
        }
        // console.log(state.TotalCourseData);
      }
      localStorage.setItem(
        "TotalCourseData",
        JSON.stringify(state.TotalCourseData),
      );
    },
    importTabs(state: State, data: any) {
      console.log(data);
      state.TotalCourseData.push({
        name: data.name,
        id: uuidv4(),
        classStorage: rowspanize(Transfer(data.classStorage)),
        classListStorage: Transfer_class_list(data.classListStorage),
        credit: data.credit,
      });
      state.activeIndex = state.TotalCourseData.length - 1;
      localStorage.setItem(
        "TotalCourseData",
        JSON.stringify(state.TotalCourseData),
      );
    },
    deleteTabs(state: State, id: string) {
      let temp: Array<CourseData> = [];
      for (let i = 0; i < state.TotalCourseData.length; i++) {
        if (state.TotalCourseData[i].id != id) {
          temp.push(state.TotalCourseData[i]);
        }
      }
      state.TotalCourseData = temp;
      localStorage.setItem(
        "TotalCourseData",
        JSON.stringify(state.TotalCourseData),
      );
      state.activeIndex = 0;
    },
    renameTabs(state: State, data: any) {
      let id = data.id;
      let name = data.name;
      for (let i = 0; i < state.TotalCourseData.length; i++) {
        if (state.TotalCourseData[i].id == id) {
          state.TotalCourseData[i].name = name;
        }
      }
      localStorage.setItem(
        "TotalCourseData",
        JSON.stringify(state.TotalCourseData),
      );
    },
  },
  actions: {
    set_yearNsemester(context: any, data: Array<number>) {
      context.commit("set_yearNsemester", data);
    },
    display(context: any) {
      context.commit("display");
    },
    hidden(context: any) {
      context.commit("hidden");
    },
    show_credit(context: any) {
      context.commit("show_credit");
    },
    hidden_credit(context: any) {
      context.commit("hidden_credit");
    },
    initCourseFromLocalstorage(context: any) {
      context.commit("initCourseFromLocalstorage");
    },
    addCourse(context: any, data: any) {
      context.commit("addCourse", data);
    },
    clearCourse(context: any) {
      context.commit("clearCourse");
    },
    initCourseListFromLocalstorage(context: any) {
      context.commit("initCourseListFromLocalstorage");
    },
    addCourseList(context: any, Class: Array<Course>) {
      context.commit("addCourseList", Class);
    },
    initCredit(context: any) {
      context.commit("initCredit");
    },
    initAll(context: any) {
      context.commit("initAll");
      // context.commit("initCredit");
      // context.commit("initCourseListFromLocalstorage");
      // context.commit("initCourseFromLocalstorage");
    },
    addCredit(context: any, delta: number) {
      context.commit("addCredit", delta);
    },
    deleteCourseList(context: any, Class: Course) {
      context.commit("deleteCourseList", Class);
    },
    changeShowColorPick(context: any, Bool: boolean) {
      context.commit("changeShowColorPick", Bool);
    },
    setChooseCard(context: any, Card: Course) {
      context.commit("setChooseCard", Card);
    },
    setCardMode(context: any, mode: number) {
      context.commit("setCardMode", mode);
    },
    setDefaultColor(context: any, color: string) {
      // console.log(color)
      context.commit("setDefaultColor", color);
    },
    updateCourseAppearance(
      context: any,
      update: CourseAppearanceUpdate,
    ) {
      context.commit("updateCourseAppearance", update);
    },
    setShowTable(context: any, Bool: boolean) {
      // console.log("change")
      context.commit("setShowTable", Bool);
    },
    setSearchTimeTable(context: any, Bool: boolean) {
      context.commit("setSearchTimeTable", Bool);
    },
    changeTimeSearchMode(context: any) {
      context.commit("changeTimeSearchMode");
      context.commit("hidden");
      context.commit("purge");
    },
    setTimeSearchMode(context: any, Bool: boolean) {
      context.commit("setTimeSearchMode", Bool);
      context.commit("hidden");
      context.commit("purge");
    },
    settimeSearchArgument(context: any, arg: Array<number>) {
      context.commit("settimeSearchArgument", arg);
    },
    setrunConflictState(context: any, arg: number) {
      context.commit("setrunConflictState", arg);
    },
    updateCourseList(context: any, data: any) {
      context.commit("updateCourseList", data);
    },
    setactiveIndex(context: any, index: number) {
      context.commit("setactiveIndex", index);
    },
    addTabs(context: any, id: string | null) {
      context.commit("addTabs", id);
    },
    importTabs(context: any, data: any) {
      context.commit("importTabs", data);
    },
    deleteTabs(context: any, id: string) {
      context.commit("deleteTabs", id);
    },
    renameTabs(context: any, data: any) {
      context.commit("renameTabs", data);
    },
  },
};

export default store;
