const model = require('../models/courseModel.cjs');

const controller = {
    async searchCourses(keyword){
        let result = await model.getCourses(keyword);
        return result;
    }
};
module.exports = controller;