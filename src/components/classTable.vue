<template>
    <table class = 'w-11/12 bg-orange-100/50 rounded-lg px-2 my-3 py-2 mx-auto border-separate shadow-lg md:w-9/12' id = "class_table">
        <thead>
            <tr>
                <th class = "py-3 border-collapse bg-orange-100 rounded-lg" v-for = "day in week"> {{ day }} </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for = "row in renderData">
                <td v-for = "items in row" v-show = "items.visible === 1" :rowspan = "items.rowspan" class = "text-center p-0 h-full overflow-auto" style ="height: 60px;">
                    {{ items.name }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
const week = ["節次", "節次", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
const sessionNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const sessionAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
var data = [
    ["1", "A", "", "", "", "", "", ""],
    ["1", "A", "", "", "", "", "", ""], 
    ["2", "A", "", "", "", "", "", ""], 
    ["2", "B", "", "", "", "", "", ""], 
    ["3", "B", "", "", "", "", "", ""], 
    ["3", "B", "", "", "", "", "", ""], 
    ["4", "C", "", "", "", "", "", ""], 
    ["4", "C", "", "", "", "", "", ""], 
    ["5", "C", "", "", "", "", "", ""], 
    ["5", "D", "", "", "", "", "", ""], 
    ["6", "D", "", "", "", "", "", ""], 
    ["6", "D", "", "", "", "", "", ""], 
    ["7", "E", "", "", "", "", "", ""], 
    ["7", "E", "", "", "", "", "", ""], 
    ["8", "E", "", "", "", "", "", ""], 
    ["8", "F", "", "", "", "", "", "5"], 
    ["9", "F", "", "", "", "", "", "5"], 
    ["9", "F", "", "", "", "", "", "7"], 
    ["10", "G", "", "", "", "", "", "7"], 
    ["10", "G", "", "", "", "", "", "7"], 
    ["11", "G", "", "", "", "", "", ""], 
    ["11", "H", "", "", "", "", "", ""], 
    ["12", "H", "", "", "", "", "", ""], 
    ["12", "H", "", "", "", "", "", ""], 
    ["13", "I", "", "", "", "", "", ""], 
    ["13", "I", "", "", "", "", "", ""], 
    ["14", "I", "", "", "", "", "", ""], 
    ["14", "J", "", "", "", "", "", ""], 
    ["15", "J", "", "", "", "", "", ""], 
    ["15", "J", "", "", "", "", "", ""]
]
/*
function rowspanData(data)
{
    let rowspanData = []
    for(let i = 0; i < data.length; i++)
    {
        let rowsArray = [] //一行
        for(let j = 0; j < data[i].length; j++)
        {
            let obj = 
            {
                name: data[i][j],
                rowspan: 1, //行
                visible: 0
            }
            if(i == 0)
                rowsArray.push(obj)
            if(i > 0)
            {
                if(data[i][j] == data[i - 1][j])
                    obj.rowspan = rowspanData[i - 1][j].rowspan + 1;
                else
                    rowspanData[i - 1][j].visible = 1;
                if(i == data.length - 1)
                    obj.visible = 1;
                rowsArray.push(obj)
            }
        }
        rowspanData.push(rowsArray)
    }
    return rowspanData
}*/

function rowspanData(data)
{
    // we create a table with data, and then we will use this table to create a rowspan table
    // if the data element is the same as the previous one, we will try to merge them together
    let rowspanData = []
    for(let i = 0; i < data.length; i++)
    {
        let rowsArray = [] //一行
        for(let j = 0; j < data[i].length; j++)
        {
            let obj = 
            {
                name: data[i][j],
                rowspan: 1, //行
                visible: 1
            }
            if(i == 0)
                rowsArray.push(obj)
            if(i > 0)
            {
                if(data[i][j] == data[i - 1][j])
                {
                    obj.rowspan = rowspanData[i - 1][j].rowspan + 1;
                    rowspanData[i - 1][j].visible = 0;
                    rowspanData[i - 1][j].rowspan = 0;
                }
                else
                    rowspanData[i - 1][j].visible = 1;
                if(i == data.length - 1)
                    obj.visible = 1;
                rowsArray.push(obj)
            }
        }
        rowspanData.push(rowsArray)
    }
    console.log(rowspanData)
    return rowspanData
}
var renderData = rowspanData(data)

</script>
