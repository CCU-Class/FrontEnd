import { Module } from 'vuex';
import { Course, InitTable } from '../functions/general'
import { rowspanize  } from '../functions/rowspanizer';

const env = import.meta.env;

interface State {
    show: boolean;
    classStorage: Array<Array<Course>>;
    classListStorage: Array<Course>;
    credit : number;
    show_ColorPick : boolean;
    chooseCard : Course | null;
    cardMode : number;
    defaultColor : string;
    showTable: boolean;
    show_credit: boolean;
    searchTime_status: boolean;
    timeSearchMode: boolean;
    timeSearchArgument: Array<number>;
}

function Transfer(data : any)
{
    let temp: Course[][] = [];
    for(let i = 0; i < data.length; i++){
        let t: Course[] = [];
        for(let j = 0; j < data[i].length; j++){
            t.push(new Course(data[i][j]['courseData']))
        }
        temp.push(t);
    }
    return temp;
}

function Transfer_class_list(data : any)
{
    let temp: Course[] = [];
    for(let i = 0; i < data.length; i++){
        temp.push(new Course(data[i]['courseData']));
    }
    return temp;
}

const store: Module<State, any> = {
    state: {
        show: false,
        classStorage : [],
        classListStorage : [],
        credit : 0,
        show_ColorPick : false,
        chooseCard: null,
        cardMode: 0,
        defaultColor: env.VITE_CARD_DEFAULT_COLOR,
        showTable: true,
        show_credit: false,
        searchTime_status: false,
        timeSearchMode: false,
        timeSearchArgument: [0, 0, 0]
    },
    mutations: {
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
        initCourseFromLocalstorage(state: State){
            let courseTable: string | null = localStorage.getItem("courseTable");
            if(courseTable == null || courseTable == ""){
                state.classStorage = InitTable();
                rowspanize(state.classStorage);
                localStorage.setItem("courseTable", JSON.stringify(state.classStorage));
                return;
            }
            let data = JSON.parse(courseTable!);
            state.classStorage = Transfer(data);
            rowspanize(state.classStorage);
        },
        addCourse(state: State, data : any){
            // console.log(state.classStorage);
            state.classStorage = data;
            // console.log(state.classStorage);
            localStorage.setItem("courseTable", JSON.stringify(state.classStorage));
        },
        clearCourse(state: State){
            // console.log("clear")
            state.classStorage = InitTable();
            rowspanize(state.classStorage);
            // console.log(state.classStorage)
            state.classListStorage = [];
            state.credit = 0 ;
            state.chooseCard = null;
            localStorage.setItem("courseTable", JSON.stringify(state.classStorage));
            localStorage.setItem("courseList", JSON.stringify(state.classListStorage));
            localStorage.setItem("credit", state.credit.toString());
        },
        initCourseListFromLocalstorage(state: State){
            let courseList: string | null = localStorage.getItem("courseList");
            if(courseList == null){
                state.classListStorage = [];
                localStorage.setItem("courseList", JSON.stringify(state.classListStorage));
                return;
            }
            let data = JSON.parse(courseList!);
            state.classListStorage = Transfer_class_list(data);
        },
        addCourseList(state: State, Class: Course){
            state.classListStorage.push(Class);
            localStorage.setItem("courseList", JSON.stringify(state.classListStorage));
        },
        deleteCourseList(state: State, Class: Course){
            let List = state.classListStorage;
            let temp :Array<Course> = [];
            for(let i = 0; i < List.length; i++){
                if(List[i].getCourseName() == Class.getCourseName() && List[i].getId() == Class.getId() && List[i].getClassroom() == Class.getClassroom()){
                    continue;
                }
                else{
                    temp.push(List[i]);
                }
            }
            state.classListStorage = temp;
            localStorage.setItem("courseList", JSON.stringify(state.classListStorage));
        },
        initCredit(state: State){
            let creditL: string | null = localStorage.getItem("credit");
            if(creditL == null){
                state.credit = 0;
                localStorage.setItem("credit", state.credit.toString());
                return;
            }
            state.credit = Number(creditL);
        },
        addCredit(state: State, delta : number){
            state.credit += delta;
            // console.log(state.credit, delta)
            localStorage.setItem("credit", state.credit.toString());
        },
        changeShowColorPick(state: State, Bool: boolean){
            state.show_ColorPick = Bool;
        },
        setChooseCard(state: State, Card: Course){
            state.chooseCard = Card;
        },
        setCardMode(state: State, mode: number){
            state.cardMode = mode;
        },
        setDefaultColor(state: State, color: string){
            state.defaultColor = color;
        },
        setShowTable(state: State, Bool: boolean){
            state.showTable = Bool;
        },
        setSearchTimeTable(state: State, Bool: boolean){
            state.searchTime_status = Bool;
        },
        changeTimeSearchMode(state: State){
            state.timeSearchMode = !state.timeSearchMode;
        },
        settimeSearchArgument(state: State, arg: Array<number>){
            state.timeSearchArgument = arg;
        }
    },
    actions: {
        display(context: any) {
            context.commit('display');
        },
        hidden(context: any) {
            context.commit('hidden');
        },
        show_credit(context: any) {
            context.commit('show_credit');
        },
        hidden_credit(context: any) {
            context.commit('hidden_credit');
        },
        initCourseFromLocalstorage(context: any){
            context.commit('initCourseFromLocalstorage');
        },
        addCourse(context: any, data : any){
            context.commit("addCourse", data);
        },
        clearCourse(context: any){
            context.commit("clearCourse");
        },
        initCourseListFromLocalstorage(context: any){
            context.commit("initCourseListFromLocalstorage");
        },
        addCourseList(context: any,  Class: Array<Course>){
            context.commit("addCourseList", Class);
        },
        initCredit(context: any){
            context.commit("initCredit");
        },
        initAll(context: any){
            context.commit("initCredit");
            context.commit("initCourseListFromLocalstorage");
            context.commit('initCourseFromLocalstorage');
        },
        addCredit(context: any,  delta: number){
            context.commit("addCredit", delta);
        },
        deleteCourseList(context: any, Class: Course){
            context.commit("deleteCourseList", Class);
        },
        changeShowColorPick(context: any, Bool: boolean){
            context.commit("changeShowColorPick", Bool);
        },
        setChooseCard(context: any, Card: Course){
            context.commit("setChooseCard", Card);
        },
        setCardMode(context: any, mode: number){
            context.commit("setCardMode", mode);
        },
        setDefaultColor(context: any, color: string){
            // console.log(color)
            context.commit("setDefaultColor", color);
        },
        setShowTable(context: any, Bool: boolean){
            // console.log("change")
            context.commit("setShowTable", Bool);
        },
        setSearchTimeTable(context: any, Bool: boolean){
            context.commit("setSearchTimeTable", Bool);
        },
        changeTimeSearchMode(context: any){
            context.commit("changeTimeSearchMode");
            context.commit("hidden")
            context.commit("purge");
        },
        settimeSearchArgument(context: any, arg: Array<number>){
            context.commit("settimeSearchArgument", arg);
        }
    }
};

export default store;
