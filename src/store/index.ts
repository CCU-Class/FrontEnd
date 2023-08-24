import { createStore } from 'vuex';

interface State {
    show: boolean;
}

const store = createStore<State>({
    state: {
        show: false
    },
    mutations: {
        display(state: State) {
            console.log('display');
            state.show = true;
        },
        hidden(state: State) {
            state.show = false;
        }
    },
    actions: {
        display(context: any) {
            context.commit('display');
        },
        hidden(context: any) {
            context.commit('hidden');
        }
    }
});

export default store;
