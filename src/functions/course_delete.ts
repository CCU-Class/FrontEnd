import { Course} from "./general";
import store from "../store";

export function courseDelete(item: Course)
{   
    // 比對名子 課程編號 教室 其他不管
    console.log(item)
    let data = JSON.parse(localStorage.getItem("courseTable")!)
    console.log(data);
    let table: Course[][] = []
    for(let i = 0; i < data.length; i++)
    {
        let row: Course[] = []
        for(let j = 0; j < data[i].length; j++)
        {
            if(data[i][j].courseData.uuid == item.getUuid()){
                
                row.push(new Course(
                    {
                        course_name: "",
                        start_time: "",
                        classroom: "",
                        is_title: false,
                        is_course: false,
                        color: "",
                        ID: null,
                        Credit: null,
                        is_custom: null,
                        Teacher: null,
                        Memo: null,
                        textColor: "",
                        textStyle: "",
                        uuid: ""
                    }
                ))
            }
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
                    Memo: data[i][j].courseData.Memo,
                    textColor: data[i][j].courseData.textColor,
                    textStyle: data[i][j].courseData.textStyle,
                    uuid: data[i][j].courseData.uuid
                }))
            }
        }
        table.push(row)
    }
    // 不要在這邊儲存localstorage，使用store
    store.dispatch('deleteCourseList', item);
    store.dispatch('addCourse', table);
    return true;
}

export function decreaseCredit(credit : number){
    store.dispatch('addCredit', -credit);
}