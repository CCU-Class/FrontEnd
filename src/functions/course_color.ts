import { Course } from './general.ts'
import store from '../store'

export function courseChangeColor(course : Course, color : string){
    let temp = store.state.classStorage;
    for(let i = 0; i < temp.length; i++){
        for(let j = 0; j < temp[i].length; j++){
            if(course.getCourseName() == temp[i][j].getCourseName() && course.getId() == temp[i][j].getId() && course.getClassroom() == temp[i][j].getClassroom()){
                temp[i][j].setColor(color);
            }
        }
    }
    store.dispatch('addCourse', temp);
}

export function courseTextChangeColor(course : Course, color : string){
    let temp = store.state.classStorage;
    for(let i = 0; i < temp.length; i++){
        for(let j = 0; j < temp[i].length; j++){
            if(course.getCourseName() == temp[i][j].getCourseName() && course.getId() == temp[i][j].getId() && course.getClassroom() == temp[i][j].getClassroom()){
                temp[i][j].setTextColor(color);
            }
        }
    }
    store.dispatch('addCourse', temp);
}