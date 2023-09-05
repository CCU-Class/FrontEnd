import store  from '../store';
import { Course, courseToTime, courseToStartIndex, courseToEndIndex, WeekDayToInt } from "./general";
import {v4 as uuidv4} from 'uuid';
import { rowspanize } from './rowspanizer';
import _ from 'lodash';
import { toRaw } from 'vue';

const env = import.meta.env;

// a function that put the course in the database of manual input
// and return the status of the operation

export function courseAdd(courseName: string, classRoom: string, weekDay: string, start: string, end:string)
{
    // construct a course object here
    // push the course object to the local storage
    // store information in the database
    // return the status of the operation
    let table: Course[][] = _.cloneDeep(store.state.course.classStorage);
    let Uuid = uuidv4();
    let course = new Course({
        start_time: courseToTime[start],
        course_name: courseName,
        classroom: classRoom,
        is_title: false,
        is_course: true,
        color: env.VITE_CARD_DEFAULT_COLOR,
        ID: null,
        Credit: null,
        is_custom: true,
        Teacher: null,
        Memo: null,
        textColor: env.VITE_CARDTEXT_DEFAULT_COLOR,
        textStyle: env.VITE_CARDTEXT_DEFAULT_STYLE,
        uuid: Uuid,
        length: 0
    })
    let weekDayIndex = WeekDayToInt[weekDay]; // 2 is the offset of the first two columns
    let startHour = courseToStartIndex[start];
    let endHour = courseToEndIndex[end];
    let startT = `${weekDay}${start}~${end}`;
    for(let i = startHour; i < endHour; i++)
    {
        if(table[i][weekDayIndex].getIsCourse())
        {
            // there is a course in the same time slot
            return false;
        }
        else
        {
            // there is no course in the same time slot
            table[i][weekDayIndex] = _.cloneDeep(course);
        }
    }
    course.setStartTime(startT);
    store.dispatch('addCourseList', course);
    // 不要在這邊儲存localstorage，使用store
    // window.location.reload();
    rowspanize(table);
    return true;
}



export function searchAdd(course_list : Course[])
{
    // construct a course object here
    // push the course object to the local storage
    // store information in the database
    // return the status of the operation
    // console.log(course_list);
    let table = _.cloneDeep(toRaw(store.state.course.classStorage));
    // put the list of courses into the table
    for(let i = 0; i < course_list.length; i++)
    {
        let course = course_list[i];
        // console.log(course);
        let weekDayIndex = WeekDayToInt[course.getWeekDay()]; // 2 is the offset of the first two columns
        let startHour = courseToStartIndex[course.getStartTime()];
        let endHour = courseToEndIndex[course.getEndTime()];
        // console.log(startHour, endHour);
        let startT = courseToTime[course.getStartTime()];
        for(let j = startHour; j < endHour; j++)
        {   
            // console.log(table[j][weekDayIndex]);
            if(table[j][weekDayIndex].getIsCourse())
            {
                // there is a course in the same time slot
                return false;
            }
            else
            {   
                table[j][weekDayIndex] = _.cloneDeep(course);
                table[j][weekDayIndex].setStartTime(startT);
            }
        }
    }
    // 不要在這邊儲存localstorage，使用storec
    rowspanize(table);
    return true;
}