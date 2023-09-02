import { Module } from 'vuex';
import { searchCommentsOnCcuplus } from '../functions/ccuplus';
import { json } from 'stream/consumers';

const env = import.meta.env;

interface Comment{
    user: string | null;
    professor: string;
    content: string;
    commented_at: string;
    comments: Array<Comment>;
    deleted: boolean;
    token: string;
    course: string | null;
}

interface State {
    status: boolean;
    comments: Array<any>;
}

const ccuplus: Module<State, any> = {
    state: {
        status: false,
        comments: []
    },
    mutations: {
        get_comments(state, payload) {
            let response = searchCommentsOnCcuplus(payload);
            response.then((data: any) => {
                if(data != false && data != null) {
                    let tmp_data = JSON.parse(data.data);
                    state.status = true;
                    // let tmp: Array<Comment> = [];
                    // for(let i = 0; i < tmp_data.length; i++) {
                    //     let comment: Comment = {
                    //         user: tmp_data[i]['user'],
                    //         professor: tmp_data[i]['professor'],
                    //         content: tmp_data[i]['content'],
                    //         commented_at: tmp_data[i]['commented_at'],
                    //         comments: tmp_data[i]['comments'],
                    //         deleted: tmp_data[i]['deleted'],
                    //         token: tmp_data[i]['token'],
                    //         course: tmp_data[i]['course']
                    //     };
                    //     console.log(comment);
                    //     tmp.push(comment);
                    // }
                    // console.log(tmp);
                    // state.comments = tmp;
                } else {
                    state.status = false;
                    state.comments = [];
                }
            });
        },
        clear_comments(state) {
            state.status = false;
            state.comments = [];
        }
    },
    actions: {
        get_comments(context, payload) {
            context.commit('get_comments', payload);
        },
        clear_comments(context) {
            context.commit('clear_comments');
        }
    }
};

export default ccuplus;
