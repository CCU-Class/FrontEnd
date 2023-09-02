import { createStore } from 'vuex';
import course from './course';
import ccuplus from './ccuplus';

const env = import.meta.env;

const store = createStore({
    modules: {
        course: course,
        ccuplus: ccuplus
    }
});

export default store;
