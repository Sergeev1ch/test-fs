var fs = require('fs');

var input = fs.createReadStream('line.txt');
const result = []
const N = 10

function addToArray(string) {
    if(result.length < N){
        result.push(string)
    }else if(result.length >= N){
        result.shift()
        result.push(string)
    }
}

async function readLines(input){
    var remaining = '';
    for await (const chunk of input) {
        remaining += chunk;
        var index = remaining.indexOf('\n'); //находит переход строки
        while (index > 0) { //
            var line = remaining.substring(0, index); //извелекает от 0 до перехода
            remaining = remaining.substring(index + 1);
            addToArray(line)
            index = remaining.indexOf('\n'); //обновляет индекс перехода
        }
        if(remaining.length > 0){ //eсли переходов больше нет
            addToArray(remaining) //добавляет последнюю строку
        }
    }
    result.map(item => {
        console.log(item)
    })
}

readLines(input);