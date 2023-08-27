import { stat } from 'fs';
import { createStore } from 'vuex';
import { Course, InitTable } from '../functions/general'
const env = import.meta.env;

interface State {
    show: boolean;
    classStorage: Array<Array<Course>>;
    classListStorage: Array<Course>;
    credit : number;
    show_ColorPick : boolean;
    chooseCard : Course | null;
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
        credit : 0,
        show_ColorPick : false,
        chooseCard: null
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
            state.classStorage = data;
            localStorage.setItem("courseTable", JSON.stringify(state.classStorage));
        },
        clearCourse(state: State){
            state.classStorage = InitTable();
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
            console.log(state.credit);
        },
        addCredit(state: State, delta : number){
            state.credit += delta;
            console.log(state.credit, delta)
            localStorage.setItem("credit", state.credit.toString());
        },
        changeShowColorPick(state: State, Bool: boolean){
            state.show_ColorPick = Bool;
        },
        setChooseCard(state: State, Card: Course){
            state.chooseCard = Card;
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
        },
        deleteCourseList(context: any, Class: Course){
            context.commit("deleteCourseList", Class);
        },
        changeShowColorPick(context: any, Bool: boolean){
            context.commit("changeShowColorPick", Bool);
        },
        setChooseCard(context: any, Card: Course){
            context.commit("setChooseCard", Card);
        }
    }
});

export default store;
