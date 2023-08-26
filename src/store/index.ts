import { stat } from 'fs';
import { createStore } from 'vuex';
import { Course, InitTable } from '../functions/general'

interface State {
    show: boolean;
    classStorage: Array<Array<Course>>;
    classListStorage: Array<Course>;
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
        classListStorage : []
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
            localStorage.setItem("courseTable", JSON.stringify(state.classStorage));
            localStorage.setItem("courseList", JSON.stringify(state.classListStorage));
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
        }
    },
    actions: {
        display(context: any) {
            context.commit('display');
        },
        hidden(context: any) {
            context.commit('hidden');
        },
        initCourseFromLocalstorage(context: any, data: any){
            context.commit('initCourseFromLocalstorage', data);
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
        }
    }
});

export default store;
