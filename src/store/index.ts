import { stat } from 'fs';
import { createStore } from 'vuex';
import { Course, InitTable } from '../functions/general'

interface State {
    show: boolean;
    classStorage: Array<Array<Course>>;
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

const store = createStore<State>({
    state: {
        show: false,
        classStorage : []
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
            let data = JSON.parse(courseTable!);
            state.classStorage = Transfer(data);
        },
        addCourse(state: State, data : any){
            state.classStorage = Transfer(data);
            console.log(48763)
            localStorage.setItem("courseTable", JSON.stringify(data));
        },
        clearCourse(state: State){
            state.classStorage = InitTable();
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
        }
    }
});

export default store;
