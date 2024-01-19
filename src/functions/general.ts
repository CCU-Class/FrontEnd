import store from '../store';
const env = import.meta.env;
import {v4 as uuidv4} from 'uuid';

// using a key-value pair to map courseID to time
export const courseToTime: { [key: string]: string } = {
    "1" : "07:10",
    "2" : "08:10",
    "3" : "09:10",
    "4" : "10:10",
    "5" : "11:10",
    "6" : "12:10",
    "7" : "13:10",
    "8" : "14:10",
    "9" : "15:10",
    "10" : "16:10",
    "11" : "17:10",
    "12" : "18:10",
    "13" : "19:10",
    "14" : "20:10",
    "15" : "21:10",
    "A" : "07:15",
    "B" : "08:45",
    "C" : "10:15",
    "D" : "11:45",
    "E" : "13:15",
    "F" : "14:45",
    "G" : "16:15",
    "H" : "17:45",
    "I" : "19:15",
    "J" : "20:45"
}

export const courseToStartIndex: { [key: string]: number } = {
    "1" : 0,
    "2" : 2,
    "3" : 4,
    "4" : 6,
    "5" : 8,
    "6" : 10,
    "7" : 12,
    "8" : 14,
    "9" : 16,
    "10" : 18,
    "11" : 20,
    "12" : 22,
    "13" : 24,
    "14" : 26,
    "15" : 28,
    "A" : 0,
    "B" : 3,
    "C" : 6,
    "D" : 9,
    "E" : 12,
    "F" : 15,
    "G" : 18,
    "H" : 21,
    "I" : 24,
    "J" : 27
}
export const courseToEndIndex: { [key: string]: number } = {
    "1" : 2,
    "2" : 4,
    "3" : 6,
    "4" : 8,
    "5" : 10,
    "6" : 12,
    "7" : 14,
    "8" : 16,
    "9" : 18,
    "10" : 20,
    "11" : 22,
    "12" : 24,
    "13" : 26,
    "14" : 28,
    "15" : 30,
    "A" : 3,
    "B" : 6,
    "C" : 9,
    "D" : 12,
    "E" : 15,
    "F" : 18,
    "G" : 21,
    "H" : 24,
    "I" : 27,
    "J" : 30
}
export const WeekDayToInt: { [key: string]: number } = {
    "一" : 3,
    "二" : 4,
    "三" : 5,
    "四" : 6,
    "五" : 7,
    "六" : 8
}

interface CourseData
{
    start_time: string;
    end_time?: string;
    week_day?: string;
    course_name: string;
    classroom: string;
    is_title: boolean;
    is_course: boolean;
    color: string;
    ID: string | null;
    Credit: number | null;
    is_custom: boolean | null;
    Teacher: string | null;
    Memo: string | null;
    textColor: string;
    textStyle: string;
    uuid: string;
    length: number;
    department: string;
    grade: string;
}

export class Course
{
    private courseData!: CourseData;
    constructor();
    constructor(courseData: CourseData);
    constructor(uuid: string);
    constructor(uuid: string, start_time: string);
    constructor(courseData?: CourseData | string, start_time?: string) {
        if(!courseData){
            this.courseData = {
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
                uuid: "",
                length: 0,
                department: "",
                grade: ""
            };
        }
        else if (typeof courseData === "string") {
            this.courseData = {
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
                uuid: courseData,
                length: 0,
                department: "",
                grade: ""
            };
            if(start_time) this.courseData.start_time = start_time;
        } else if(typeof courseData === "object"){
            this.courseData = courseData as CourseData;
        }
    }
    public inputValue(courseData: CourseData): void
    {
        this.courseData = courseData;
    }
    public getStartTime(): string
    {
        return this.courseData.start_time;
    }
    public setStartTime(time :string): void
    {   
        // console.log(time)
        this.courseData.start_time = time;
    }
    public getEndTime(): string
    {
        return this.courseData.end_time!;
    }
    public getWeekDay(): string
    {
        return this.courseData.week_day!;
    }
    public getCourseName(): string
    {
        return this.courseData.course_name;
    }
    public setCourseName(name : string): void
    {
        this.courseData.course_name = name;
    }
    public getClassroom(): string
    {
        return this.courseData.classroom;
    }
    public getIsTitle(): boolean
    {
        return this.courseData.is_title;
    }
    public setTitle(state: boolean): void
    {
        this.courseData.is_title = state;
    }
    public getIsCourse(): boolean
    {
        return this.courseData.is_course;
    }
    public getColor(): string
    {
        return this.courseData.color;
    }
    public setColor(color : string): void
    {
        this.courseData.color = color;
    }
    public getId(): string | null
    {
        return this.courseData.ID;
    }
    public getCredit(): number | null
    {
        return this.courseData.Credit;
    }
    public getIsCustom(): boolean | null
    {
        return this.courseData.is_custom;
    }
    public getTeacher(): string | null
    {
        return this.courseData.Teacher;
    }
    public getMemo(): string | null
    {
        return this.courseData.Memo;
    }
    public getTextColor() : string
    {
        return this.courseData.textColor
    }
    public setTextColor(color :string) : void
    {
        this.courseData.textColor = color;
    }
    public getTextStyle() : string
    {
        return this.courseData.textStyle;
    }
    public setTextStyle(style: string) : void
    {
        this.courseData.textStyle = style;
    }
    public getUuid() : string
    {   
        return this.courseData.uuid;
    }
    public setUuid(uuid : string) : void
    {
        this.courseData.uuid = uuid;
    }
    public getLength() : number
    {
        return this.courseData.length;
    }
    public setLength(length : number) : void
    {
        this.courseData.length = length;
    }
    public getDepartment() : string
    {
        return this.courseData.department;
    }
    public getGrade() : string
    {
        return this.courseData.grade;
    }
    public getCourseID() : string
    {
        return this.courseData.ID!;
    }
}


export function InitTable()
{   
    // retrurn InitTable
    // use uuid to decide length
    let data_table: Course[][] = []
    var data = [
        ["", "1", "A", "", "", "", "", "", ""],
        ["", "1", "A", "", "", "", "", "", ""], 
        ["", "2", "A", "", "", "", "", "", ""], 
        ["", "2", "B", "", "", "", "", "", ""], 
        ["", "3", "B", "", "", "", "", "", ""], 
        ["", "3", "B", "", "", "", "", "", ""], 
        ["", "4", "C", "", "", "", "", "", ""], 
        ["", "4", "C", "", "", "", "", "", ""], 
        ["", "5", "C", "", "", "", "", "", ""], 
        ["", "5", "D", "", "", "", "", "", ""], 
        ["", "6", "D", "", "", "", "", "", ""], 
        ["", "6", "D", "", "", "", "", "", ""], 
        ["", "7", "E", "", "", "", "", "", ""], 
        ["", "7", "E", "", "", "", "", "", ""], 
        ["", "8", "E", "", "", "", "", "", ""], 
        ["", "8", "F", "", "", "", "", "", ""], 
        ["", "9", "F", "", "", "", "", "", ""], 
        ["", "9", "F", "", "", "", "", "", ""], 
        ["", "10", "G", "", "", "", "", "", ""], 
        ["", "10", "G", "", "", "", "", "", ""], 
        ["", "11", "G", "", "", "", "", "", ""], 
        ["", "11", "H", "", "", "", "", "", ""], 
        ["", "12", "H", "", "", "", "", "", ""], 
        ["", "12", "H", "", "", "", "", "", ""], 
        ["", "13", "I", "", "", "", "", "", ""], 
        ["", "13", "I", "", "", "", "", "", ""], 
        ["", "14", "I", "", "", "", "", "", ""], 
        ["", "14", "J", "", "", "", "", "", ""], 
        ["", "15", "J", "", "", "", "", "", ""], 
        ["", "15", "J", "", "", "", "", "", ""]
    ]
    for(let i = 0; i < data.length; i++)
    {
        let row: Course[] = []
        for(let j = 0; j < data[i].length; j++)
        {
            if(j == 0)
            {
                row.push(new Course(uuidv4(), data[i][j]));
            }
            else if(j == 1)
            {   
                let course :Course = new Course(uuidv4(), data[i][j]);
                course.setColor(env.VITE_TITLE_DEFAULT_COLOR);
                course.setCourseName(courseToTime[data[i][j]]);
                course.setTitle(true);
                if(i % 2 ==0)
                {
                    row.push(course);
                }
                else
                {   
                    course.setUuid(data_table[i - 1][j].getUuid());
                    row.push(course);
                }
            }
            else if(j == 2)
            {   
                let course :Course = new Course(uuidv4(), data[i][j]);
                course.setColor(env.VITE_TITLE_DEFAULT_COLOR);
                course.setCourseName(courseToTime[data[i][j]]);
                course.setTitle(true);
                if(i % 3 ==0)
                {
                    row.push(course);
                }
                else
                {   
                    course.setUuid(data_table[i - 1][j].getUuid());
                    row.push(course);
                }
            }
            else
            {
                row.push(new Course());
            }
        }
        data_table.push(row)
    }
    localStorage.setItem("courseTable", JSON.stringify(data_table))
    return data_table
}

export function GetCourseTable()
{   
    return store.state.course.classStorage;
}
