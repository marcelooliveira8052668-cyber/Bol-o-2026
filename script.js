/* ===================================
   MENU MOBILE
=================================== */

import {
db,
collection,
addDoc
}
from "./firebase.js";
const btnMobile =
document.getElementById("btn-mobile");

const menu =
document.getElementById("menu");

if(btnMobile){

    btnMobile.addEventListener("click", () => {

        if(menu.style.display === "flex"){

            menu.style.display = "none";

        }else{

            menu.style.display = "flex";

            menu.style.flexDirection = "column";

        }

    });

}

/* ===================================
   CONTADOR COPA 2026
=================================== */

const diasElemento =
document.getElementById("dias");

function atualizarContador(){

    const copa =
    new Date("2026-06-11T00:00:00");

    const hoje =
    new Date();

    const diferenca =
    copa - hoje;

    const dias =
    Math.floor(
        diferenca /
        (1000 * 60 * 60 * 24)
    );

    if(diasElemento){

        diasElemento.textContent = dias;

    }

}

atualizarContador();

setInterval(
atualizarContador,
1000
);


/* ===================================
   PARTICIPANTES FIREBASE
=================================== */

const formulario =
document.getElementById(
"form-participante"
);

if(formulario){

formulario.addEventListener(

"submit",

async function(e){

e.preventDefault();

const nome =
document.getElementById("nome").value;

const cidade =
document.getElementById("cidade").value;

const whatsapp =
document.getElementById("whatsapp").value;

try{

await addDoc(

collection(
db,
"participantes"
),

{

nome:nome,
cidade:cidade,
whatsapp:whatsapp,
pontos:0,
dataCadastro:new Date()

}

);

alert(
`${nome} entrou no bolão! 🇧🇷`
);

formulario.reset();

}catch(error){

console.error(error);

alert(
"Erro ao cadastrar participante."
);

}

}

);

}


const botoesPalpite =

document.querySelectorAll(
".jogo button"
);

botoesPalpite.forEach(

(botao,index)=>{

botao.addEventListener(

"click",

()=>{

const inputs =

botao.parentElement
.querySelectorAll("input");

const placarCasa =
inputs[0].value;

const placarFora =
inputs[1].value;

if(

placarCasa === "" ||

placarFora === ""

){

alert(

"Digite os dois placares."

);

return;

}

localStorage.setItem(

`palpite-${index}`,

JSON.stringify({

casa:placarCasa,
fora:placarFora

})

);

alert(

`Palpite salvo:
Brasil ${placarCasa} x ${placarFora}`

);

}

);

}

);

/* ===================================
   VOLTAR AO TOPO
=================================== */

const btnTopo =
document.createElement("button");

btnTopo.innerHTML =
"⬆";

btnTopo.id =
"btn-topo";

document.body.appendChild(
btnTopo
);

btnTopo.style.position =
"fixed";

btnTopo.style.right =
"20px";

btnTopo.style.bottom =
"20px";

btnTopo.style.width =
"60px";

btnTopo.style.height =
"60px";

btnTopo.style.border =
"none";

btnTopo.style.borderRadius =
"50%";

btnTopo.style.background =
"#009c3b";

btnTopo.style.color =
"#fff";

btnTopo.style.fontSize =
"24px";

btnTopo.style.cursor =
"pointer";

btnTopo.style.display =
"none";

btnTopo.style.zIndex =
"999";

window.addEventListener(
"scroll",

()=>{

if(window.scrollY > 500){

btnTopo.style.display =
"block";

}else{

btnTopo.style.display =
"none";

}

}

);

btnTopo.addEventListener(
"click",

()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

}

);

/* ===================================
   ANIMAÇÕES
=================================== */

const elementos =

document.querySelectorAll(

".ano, .jogo, .admin-card, .posicao, .bandeira"

);

const observador =

new IntersectionObserver(

(entries)=>{

entries.forEach(

(entry)=>{

if(entry.isIntersecting){

entry.target.style.opacity =

"1";

entry.target.style.transform =

"translateY(0)";

}

}

);

},

{
threshold:0.1
}

);

elementos.forEach(

(elemento)=>{

elemento.style.opacity =
"0";

elemento.style.transform =
"translateY(40px)";

elemento.style.transition =
".8s";

observador.observe(
elemento
);

}

);

/* ===================================
   MENSAGEM
=================================== */

console.log(

"🇧🇷 Rumo ao Hexa 2026 carregado com sucesso!"

);

console.log(

"⚽ Projeto criado por Marcelo Oliveira"

);

async function cadastrarParticipante(nome, cidade, whatsapp){

  try{

    await setDoc(
  doc(db,"participantes",whatsapp),
  {
    nome,
    cidade,
    whatsapp,
    pontos:0
  }
);
    alert("Participante cadastrado!");

  }catch(erro){

    console.error(erro);

  }

}