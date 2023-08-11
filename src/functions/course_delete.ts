import { Course} from "./general";

export function courseDelete(item: Course)
{
    let data = JSON.parse(localStorage.getItem("courseTable")!)
    let table: Course[][] = []
    for(let i = 0; i < data.length; i++)
    {
        let row: Course[] = []
        for(let j = 0; j < data[i].length; j++)
        {
            if(data[i][j].courseData.course_name == item.getCourseName() && data[i][j].courseData.start_time == item.getStartTime() && data[i][j].courseData.classroom == item.getClassroom())
                continue;
            else
            {
                row.push(new Course({
                    course_name: data[i][j].courseData.course_name,
                    start_time: data[i][j].courseData.start_time,
                    classroom: data[i][j].courseData.classroom,
                    is_title: data[i][j].courseData.is_title,
                    is_course: data[i][j].courseData.is_course
                }))
            }
        }
        table.push(row)
    }
    localStorage.setItem("courseTable", JSON.stringify(table));
    return true;
}