<template>
    <div class = "w-full">
        <div class = "w-10/12 md:w-5/12 bg-gray-100 rounded-3xl shadow-lg mx-auto my-36 py-16">
            <div class = "text-center text-2xl font-bold">
                後台登入
            </div>
            <hr class = "w-10/12 mx-auto mt-3">
            <form class = 'text-center py-6' @submit.prevent="login">
                <table class = "py-3 mx-auto content-center">
                    <tr>
                        <td class = "text-left text-xl font-mono px-3">
                            Account
                        </td>
                        <td>
                            <input type = "text" placeholder = "在此輸入帳號" class = "rounded-lg py-1 px-3" v-model="username">
                        </td>
                    </tr>
                    <tr>
                        <td class = "text-left text-xl font-mono px-3">
                            Password
                        </td>
                        <td>
                            <input type = "password" placeholder = "在此輸入密碼" class = "rounded-lg py-1 px-3" autocomplete="on" v-model="password">
                        </td>
                    </tr>
                </table>
                <button type = "submit" class = "mt-3 bg-orange-200 py-2 px-10 rounded-2xl hover:bg-orange-300">
                    登入
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    const env = import.meta.env;
    import Token from '../../../functions/token.ts';

    const apiSite = `https://${env.VITE_BACKEND_DEVICE}/`;


    export default{
        name:"login",
        data(){
            return{
                username:"",
                password:"",
            }
        },
        methods:{
            login(){
                const apiURL = apiSite + "login";
                axios.post(apiURL,{
                    username:this.username,
                    password:this.password,
                }).then((res)=>{
                    console.log(res.data);
                    Token.saveToken(res.data.token);
                    if(Boolean(res.data.status)){
                        //跳轉頁面
                        this.$router.push({name:"Admin"});
                    }
                    else{
                        alert("帳號或密碼錯誤");
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>
