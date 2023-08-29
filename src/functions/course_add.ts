import store  from '../store';
import { Course, courseToTime, courseToStartIndex, courseToEndIndex, WeekDayToInt } from "./general";
import {v4 as uuidv4} from 'uuid';

const env = import.meta.env;

// a function that put the course in the database of manual input
// and return the status of the operation

export function courseAdd(courseName: string, classRoom: string, weekDay: string, start: string, end:string)
{
    // construct a course object here
    // push the course object to the local storage
    // store information in the database
    // return the status of the operation
    let courseTable: string | null = localStorage.getItem("courseTable")
    let table: Course[][] = []
    let data = JSON.parse(courseTable!)
    for(let i = 0; i < data.length; i++)
    {
        let row: Course[] = []
        for(let j = 0; j < data[i].length; j++)
        {
            row.push(new Course({
                course_name: data[i][j].courseData.course_name,
                start_time: data[i][j].courseData.start_time,
                classroom: data[i][j].courseData.classroom,
                is_title: data[i][j].courseData.is_title,
                is_course: data[i][j].courseData.is_course,
                color: data[i][j].courseData.color,
                ID: data[i][j].courseData.ID,
                Credit: data[i][j].courseData.Credit,
                is_custom: data[i][j].courseData.is_custom,
                Teacher: data[i][j].courseData.Teacher,
                Memo: data[i][j].courseData.Memo,
                textColor: data[i][j].courseData.textColor,
                textStyle: data[i][j].courseData.textStyle,
                uuid: data[i][j].courseData.uuid
            }))
        }
        table.push(row)
    }
    let Uuid = uuidv4();
    let course = new Course({
        start_time: courseToTime[start],
        course_name: courseName,
        classroom: classRoom,
        is_title: false,
        is_course: true,
        color: env.VITE_DEFAULT_COLOR,
        ID: null,
        Credit: null,
        is_custom: true,
        Teacher: null,
        Memo: null,
        textColor: env.VITE_CARDTEXT_DEFAULT_COLOR,
        textStyle: env.VITE_CARDTEXT_DEFAULT_STYLE,
        uuid: Uuid
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
            table[i][weekDayIndex] = course;
        }
    }
    store.dispatch('addCourse', table);
    let temp = JSON.parse(JSON.stringify(course));;
    temp.start_time = startT;
    store.dispatch('addCourseList', temp);
    console.log("this")
    // 不要在這邊儲存localstorage，使用store
    console.log(table)
    window.location.reload();
    return table;
}


export function searchAdd(course_list : Course[])
{
    // construct a course object here
    // push the course object to the local storage
    // store information in the database
    // return the status of the operation
    console.log(course_list);
    let table: Course[][] = store.state.classStorage;
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
            console.log(table[j][weekDayIndex]);
            if(table[j][weekDayIndex].getIsCourse())
            {
                // there is a course in the same time slot
                return false;
            }
            else
            {   
                // there is no course in the same time slot
                // console.log(course.getStartTime());
                // course.setStartTime(courseToTime[course.getStartTime().toString()]);
                // console.log(j, weekDayIndex);
                table[j][weekDayIndex] = course;
                // console.log(course.getStartTime())
                // console.log(course.getStartTime());
                // console.log(courseToTime[course.getStartTime()])
                // console.log(courseToTime['1'])
                table[j][weekDayIndex].setStartTime(startT);
                // console.log(table[j][weekDayIndex].getStartTime())
            }
        }
    }
    // console.log(table);
    // 不要在這邊儲存localstorage，使用storec
    store.dispatch('addCourse', table);
    return table;
}