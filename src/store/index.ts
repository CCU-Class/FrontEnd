import { stat } from 'fs';
import { createStore } from 'vuex';
import { Course, InitTable } from '../functions/general'

interface State {
    show: boolean;
    classStorage: Array<Array<Course>>;
    classListStorage: Array<Course>;
    credit : number;
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

const store = createStore<State>({
    state: {
        show: false,
        classStorage : [],
        classListStorage : [],
        credit : 0
    },
    mutations: {
        display(state: State) {
            console.log('display');
            state.show = true;
        },
        hidden(state: State) {
            state.show = false;
        },
        initCourseFromLocalstorage(state: State){
            let courseTable: string | null = localStorage.getItem("courseTable");
            if(courseTable == null){
                state.classStorage = InitTable();
                localStorage.setItem("courseTable", JSON.stringify(state.classStorage));
                return;
            }
            let data = JSON.parse(courseTable!);
            state.classStorage = Transfer(data);
        },
        addCourse(state: State, data : any){
            state.classStorage = Transfer(data);
            localStorage.setItem("courseTable", JSON.stringify(data));
        },
        clearCourse(state: State){
            state.classStorage = InitTable();
            state.classListStorage = [];
            state.credit = 0 ;
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
        addCourseList(state: State, Class: Array<Course>){
            state.classListStorage = Class;
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
            console.log(state.credit);
        },
        addCredit(state: State, delta : number){
            state.credit += delta;
            localStorage.setItem("credit", state.credit.toString());
        }
    },
    actions: {
        display(context: any) {
            context.commit('display');
        },
        hidden(context: any) {
            context.commit('hidden');
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
        }
    }
});

export default store;
