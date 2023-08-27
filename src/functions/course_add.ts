import store  from '../store';
import { Course, courseToTime, courseToStartIndex, courseToEndIndex, WeekDayToInt } from "./general";

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
                Memo: data[i][j].courseData.Memo
            }))
        }
        table.push(row)
    }
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
        Memo: null
    })
    let weekDayIndex = WeekDayToInt[weekDay]; // 2 is the offset of the first two columns
    let startHour = courseToStartIndex[start];
    let endHour = courseToEndIndex[end];
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
    let temp = store.state.classListStorage;
    temp.push(course);
    store.dispatch('addCourseList', temp);
    // 不要在這邊儲存localstorage，使用store
    store.dispatch('addCourse', table);
    return table;
}


export function searchAdd(course_list : Course[])
{
    // construct a course object here
    // push the course object to the local storage
    // store information in the database
    // return the status of the operation
    console.log(course_list);
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
                Memo: null
            }))
        }
        table.push(row)
    }
    // put the list of courses into the table
    for(let i = 0; i < course_list.length; i++)
    {
        let course = course_list[i];
        // console.log(course);
        let weekDayIndex = WeekDayToInt[course.getWeekDay()]; // 2 is the offset of the first two columns
        let startHour = courseToStartIndex[course.getStartTime()];
        let endHour = courseToEndIndex[course.getEndTime()];
        // console.log(startHour, endHour);
        for(let j = startHour; j < endHour; j++)
        {   
            // console.log(typeof(table[j][weekDayIndex]));
            if(table[j][weekDayIndex].getIsCourse())
            {
                // there is a course in the same time slot
                return false;
            }
            else
            {   
                // there is no course in the same time slot
                table[j][weekDayIndex] = course;
            }
        }
    }
    
    // 不要在這邊儲存localstorage，使用storec
    store.dispatch('addCourse', table);
    return table;
}