import { Course, courseToTime, courseToStartIndex, courseToEndIndex, WeekDayToInt } from "./general";

// a function that put the course in the database of manual input
// and return the status of the operation
export default function courseAdd(courseName: string, classRoom: string, weekDay: string, start: string, end:string)
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
                is_course: data[i][j].courseData.is_course
            }))
        }
        table.push(row)
    }
    let course = new Course({
        start_time: courseToTime[start],
        course_name: courseName,
        classroom: classRoom,
        is_title: false,
        is_course: true
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
    localStorage.setItem("courseTable", JSON.stringify(table));
    return true;
}