<template>
    <div class = "w-full">
        <div class = "w-10/12 md:w-5/12 bg-gray-100 rounded-3xl shadow-lg mx-auto my-36 py-16">
            <div class = "text-center text-2xl font-bold">
                後台登入
            </div>
            <hr class = "w-10/12 mx-auto mt-3">
            <form class = 'text-center py-6'>
                <table class = "py-3 mx-auto content-center">
                    <tr>
                        <td class = "text-left text-xl font-mono px-3">
                            Account
                        </td>
                        <td>
                            <input type = "text" placeholder = "在此輸入帳號" class = "rounded-lg py-1 px-3">
                        </td>
                    </tr>
                    <tr>
                        <td class = "text-left text-xl font-mono px-3">
                            Password
                        </td>
                        <td>
                            <input type = "password" placeholder = "在此輸入密碼" class = "rounded-lg py-1 px-3" autocomplete="on">
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
