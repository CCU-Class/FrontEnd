import { createStore } from 'vuex';
import course from './course';
import ccuplus from './ccuplus';


const store = createStore({
    modules: {
        course: course,
        ccuplus: ccuplus
    }
});

export default store;
