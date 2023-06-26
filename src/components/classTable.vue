<template>
    <div class = "overflow-x-auto">
        <table class = 'bg-orange-100 rounded-lg px-2 my-3 py-2 mx-auto border-separate shadow-lg md:w-9/12' id = "class_table">
            <thead>
                <tr>
                    <th class = "w-[10px]">
                        ⠀
                    </th>
                    <th class = 'table-head w-36' colspan = "2">
                        節次
                    </th>   
                    <th class = 'table-head'>
                        星期一
                    </th>
                    <th class = 'table-head'>
                        星期二
                    </th>
                    <th class = 'table-head'>
                        星期三
                    </th>
                    <th class = 'table-head'>
                        星期四
                    </th>
                    <th class = 'table-head'>
                        星期五
                    </th>
                    <th class = 'table-head'>
                        星期六
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = "row in renderData">
                    <td v-for = "item in row" class = "text-center p-0 h-full overflow-auto" style ="height: 60px;">
                        {{ item.content }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

class RowspanData
{
    constructor(content)
    {
        this.content = content
    }
}
const week = ["節次", "節次", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
var data = [
    ["⠀", "1", "A", "3", "", "", "", "", ""],
    [" ", "1", "A", "3", "", "", "", "", ""], 
    ["⠀", "2", "A", "4", "", "", "", "", ""], 
    [" ", "2", "B", "4", "", "", "", "", ""], 
    ["⠀", "3", "B", "", "", "", "", "", ""], 
    [" ", "3", "B", "", "", "", "", "", ""], 
    ["⠀", "4", "C", "", "", "", "", "", ""], 
    [" ", "4", "C", "", "", "", "", "", ""], 
    ["⠀", "5", "C", "", "", "", "", "", ""], 
    [" ", "5", "D", "", "", "", "", "", ""], 
    ["⠀", "6", "D", "", "", "", "", "", ""], 
    [" ", "6", "D", "", "", "", "", "", ""], 
    ["⠀", "7", "E", "", "", "", "", "", ""], 
    [" ", "7", "E", "", "", "", "", "", ""], 
    ["⠀", "8", "E", "", "", "", "", "", ""], 
    [" ", "8", "F", "", "", "", "", "", "5"], 
    ["⠀", "9", "F", "", "", "", "", "", "5"], 
    [" ", "9", "F", "", "", "", "", "", "7"], 
    ["⠀", "10", "G", "", "", "", "", "", "7"], 
    [" ", "10", "G", "", "", "", "", "", "7"], 
    ["⠀", "11", "G", "", "", "", "", "", ""], 
    [" ", "11", "H", "", "", "", "", "", ""], 
    ["⠀", "12", "H", "", "", "", "", "", ""], 
    [" ", "12", "H", "", "", "", "", "", ""], 
    ["⠀", "13", "I", "", "", "", "", "", ""], 
    [" ", "13", "I", "", "", "", "", "", ""], 
    ["⠀", "14", "I", "", "", "", "", "", ""], 
    [" ", "14", "J", "", "", "", "", "", ""], 
    ["⠀", "15", "J", "", "", "", "", "", ""], 
    [" ", "15", "J", "", "", "", "", "", ""]
]

var renderData = rowspanData(data)

function rowspanData(data)
{
    let return_data = []
    for(let i = 0; i < data.length; i++)
    {
        let row = []
        for(let j = 0; j < data[i].length; j++)
        {
            let temp = new RowspanData(data[i][j])
            row.push(temp)
        }
        return_data.push(row)
    }
    console.log(return_data)
    return return_data
}

</script>
