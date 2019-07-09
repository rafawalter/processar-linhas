const INPUT_FILE = "in/numeros.txt"
const OUTPUT_FILE = "out/mensagens-node.txt"

const lineReader = require('line-reader');
lineReader.eachLine(INPUT_FILE, function(line) {
    obterDados(line)
        .then(json => extrairInformacoes(json))
        .then(informacoes => escreverNoArquivo(informacoes))
        // .then(resultado => console.log(resultado))
})


const fetch = require('node-fetch');
function obterDados(numero) {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${numero}`;

    return fetch(url, {
        method: 'GET',
        // headers: {'Content-Type': 'application/json'},
        // body: '{}'
    }).then(response => {
        return response.json();
    }).catch(err => {console.log(err);});
}


function extrairInformacoes(json) {
    return {
        postId: json[0].postId,
        length: json.length,
        mensagens: json.map( post => post.body )
    };
}



const fs = require('fs')
const output = fs.createWriteStream(OUTPUT_FILE, {
    flags: 'w' // 'a' means appending (old data will be preserved)
})
function escreverNoArquivo(informacoes) {
    output.write(`####################### ${informacoes.postId}\n`)
    output.write(`${informacoes.length}\n`)
    output.write(`"${informacoes.mensagens}"\n`)
}

