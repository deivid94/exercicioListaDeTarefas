const inputTarefa = document.querySelector('.input-nova-tarefa');
const btnTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas');



function criarLi (){
    const li = document.createElement('li')
    return li
}

inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        if (!inputTarefa === '')
        return
        criarTarefa(inputTarefa.value);
    }
});

function limpaInput(){
    inputTarefa.value='';
    inputTarefa.focus();
}

function criarTarefa(textoInput){
    const li = criarLi();
    li.innerText = textoInput;
    tarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefa()
}

function criaBotaoApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar)
}
//pegar click no botao adicionar evento
btnTarefa.addEventListener('click', function(){
    if (!inputTarefa === '')
    return
    criarTarefa(inputTarefa.value);
})

document.addEventListener('click', function(e){
    const el = e.target;
    if (el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefa();
    }
})

function salvarTarefa(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJson = JSON.stringify(listaDeTarefas);
   localStorage.setItem('tarefas', tarefasJson);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas);
    for (let tarefa of listaDeTarefas){
        criarTarefa(tarefa);
    }
}

adicionaTarefasSalvas();
