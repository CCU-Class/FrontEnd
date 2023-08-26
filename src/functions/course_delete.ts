import { Course} from "./general";
import store from "../store";

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
                    is_course: data[i][j].courseData.is_course,
                    color: data[i][j].courseData.color,
                    ID: data[i][j].courseData.ID,
                    Credit: data[i][j].courseData.Credit,
                    is_custom: data[i][j].courseData.is_custom,
                    Teacher: data[i][j].courseData.Teacher,
                    Memo: data[i][j].courseData.Memo
                }))
            }
        }
        table.push(row)
    }
    // 不要在這邊儲存localstorage，使用store
    store.dispatch('addCourse', table);
    return true;
}