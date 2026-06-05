import {
    db,
    doc,
    setDoc,
    getDoc,
    collection,
    getDocs
} from "./firebase.js";

/* ===================================
   MENU MOBILE
=================================== */

const btnMobile = document.getElementById("btn-mobile");
const menu = document.getElementById("menu");

if (btnMobile && menu) {

    btnMobile.addEventListener("click", () => {

        menu.classList.toggle("ativo");

    });

}

/* ===================================
   CONTADOR COPA 2026
=================================== */

const diasElemento = document.getElementById("dias");

function atualizarContador() {

    const copa = new Date("2026-06-14T16:02:00");
    const hoje = new Date();

    const diferenca = copa - hoje;

    const dias = Math.max(
        0,
        Math.floor(diferenca / (1000 * 60 * 60 * 24))
    );

    if (diasElemento) {

        diasElemento.textContent = dias;

    }

}

atualizarContador();

setInterval(
    atualizarContador,
    60000
);

/* ===================================
   PARTICIPANTES FIREBASE
=================================== */

async function atualizarParticipantes(){

    const lista =
    document.getElementById(
        "lista-participantes"
    );

    const total =
    document.getElementById(
        "participantes"
    );

    if(!lista) return;

    lista.innerHTML = "";

    const snapshot =
    await getDocs(
        collection(db,"participantes")
    );

    total.textContent =
    snapshot.size;

    snapshot.forEach((item)=>{

        const participante =
        item.data();

        const p =
        document.createElement("p");

        p.textContent =
        `${participante.nome} - ${participante.cidade}`;

        lista.appendChild(p);

    });



        console.error(
            "Erro ao carregar participantes:",
            erro
        );

    }



const formulario =
    document.getElementById(
        "form-participante"
    );

if (formulario) {

    formulario.addEventListener(
        "submit",

        async (e) => {

            e.preventDefault();

            const nome =
                document.getElementById("nome")
                    .value.trim();

            const cidade =
                document.getElementById("cidade")
                    .value.trim();

            const whatsapp =
                document.getElementById("whatsapp")
                    .value.trim();

            if (
                !nome ||
                !cidade ||
                !whatsapp
            ) {

                alert(
                    "Preencha todos os campos."
                );

                return;

            }

            try {

                const participanteRef =
                    doc(
                        db,
                        "participantes",
                        whatsapp
                    );

                const participanteExiste =
                    await getDoc(
                        participanteRef
                    );

                if (
                    participanteExiste.exists()
                ) {

                    alert(
                        "Esse WhatsApp já está cadastrado."
                    );

                    return;

                }

                await setDoc(
                    participanteRef,
                    {
                        nome,
                        cidade,
                        whatsapp,
                        pontos: 0,
                        dataCadastro:
                            new Date()
                    }
                );

                alert(
                    `${nome} entrou no bolão! 🇧🇷`
                );

                formulario.reset();

                atualizarParticipantes();

            } catch (erro) {

                console.error(erro);

                alert(
                    "Erro ao cadastrar participante."
                );

            }

        }

    );

}

atualizarParticipantes();

/* ===================================
   BOTÃO VOLTAR AO TOPO
=================================== */

const btnTopo =
    document.createElement("button");

btnTopo.innerHTML = "⬆";
btnTopo.id = "btn-topo";

document.body.appendChild(btnTopo);

Object.assign(
    btnTopo.style,
    {
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "60px",
        height: "60px",
        border: "none",
        borderRadius: "50%",
        background: "#009c3b",
        color: "#fff",
        fontSize: "24px",
        cursor: "pointer",
        display: "none",
        zIndex: "999"
    }
);

window.addEventListener(
    "scroll",

    () => {

        btnTopo.style.display =
            window.scrollY > 500
                ? "block"
                : "none";

    }
);

btnTopo.addEventListener(
    "click",

    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
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

        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.1
        }

    );

elementos.forEach((elemento) => {

    elemento.style.opacity = "0";
    elemento.style.transform =
        "translateY(40px)";
    elemento.style.transition =
        "0.8s";

    observador.observe(
        elemento
    );

});

/* ===================================
   PALPITES
=================================== */

function palpiteEncerrado(
    dataJogo
) {

    const agora = new Date();

    return (
        agora >
        new Date(dataJogo)
    );

}

const botoesPalpite =
    document.querySelectorAll(
        ".jogo button"
    );

botoesPalpite.forEach((botao) => {

    botao.addEventListener(
        "click",

        () => {

            const jogo =
                botao.closest(
                    ".jogo"
                );

            if (!jogo) return;

            const inputs =
                jogo.querySelectorAll(
                    "input"
                );

            if (
                inputs.length < 2
            ) return;

            const placarBrasil =
                inputs[0].value;

            const placarAdversario =
                inputs[1].value;

            if (
                placarBrasil === "" ||
                placarAdversario === ""
            ) {

                alert(
                    "Digite os dois placares."
                );

                return;

            }

            alert(
                `✅ Palpite salvo!\n\nBrasil ${placarBrasil} x ${placarAdversario}`
            );

        }

    );

});

/* ===================================
   CONSOLE
=================================== */

console.log(
    "🇧🇷 Rumo ao Hexa 2026 carregado com sucesso!"
);

console.log(
    "⚽ Projeto criado por Marcelo Oliveira"
);