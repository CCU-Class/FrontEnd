const { resolve } = require('path');
const database = require('../config/database.cjs');

class Course{

}


const model = {
    async getCourses(class_name){

        //會根據class_name的比對位置來排序 越先比對到的越前面
        let str = this.getQueryString(class_name);
        //console.log(str);
        return new Promise((resolve, reject) => {
            //console.log("try query...");
            database.query(str, (err, result, fields) => {
                if (err) {
                    //console.log(err);
                    reject(err);
                } else {
                    //console.log(result);
                    resolve(result);
                }
            });
        });
    },
    getQueryString(class_name){
        if(process.env.USING_DATABASE== "postgre")return `SELECT * FROM course where class_name like '%${class_name}%' order by position('${class_name}' in class_name);`;
        else return `SELECT * FROM \`course\` where \`class_name\` like '%${class_name}%' order by position('${class_name}' in class_name);`;
    }
}

module.exports = model;