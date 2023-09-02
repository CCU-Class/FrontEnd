import { Module } from 'vuex';

const env = import.meta.env;

interface State {
    course_id: string;
}

const ccuplus: Module<State, any> = {
    state: {
        course_id: ''
    },
    mutations: {
        pass_course_id(state: State, payload: string) {
            state.course_id = payload;
        },
        purge(state: State) {
            state.course_id = '';
        }
    },
    actions: {
        pass_course_id(context: any, payload: string) {
            context.commit('pass_course_id', payload);
        },
        purge(context: any) {
            context.commit('purge');
        }
    }
};

export default ccuplus;
