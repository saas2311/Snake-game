const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tamanho = 20;
const linhas = 20;
const colunas = 20;

canvas.width = colunas * tamanho;
canvas.height = linhas * tamanho;

let cobra = [{ x: 10, y: 7 }];
let direcao = { x: 1, y: 0 };
let comida = spawnFood();
let vivo = true;
let pontuacao = 0;

function spawnFood() {
  return {
    x: Math.floor(Math.random() * colunas),
    y: Math.floor(Math.random() * linhas),
  };
}

// teclado
document.addEventListener("keydown", (e) => {
  try {
    if (e.key === "ArrowUp" && direcao.y !== 1) direcao = { x: 0, y: -1 };
    if (e.key === "ArrowDown" && direcao.y !== -1) direcao = { x: 0, y: 1 };
    if (e.key === "ArrowLeft" && direcao.x !== 1) direcao = { x: -1, y: 0 };
    if (e.key === "ArrowRight" && direcao.x !== -1) direcao = { x: 1, y: 0 };
  } catch (erro) {
    console.log("Erro no input:", erro.message);
  }
});

function atualizar() {
  try {
    const novaCabeca = {
      x: cobra[0].x + direcao.x,
      y: cobra[0].y + direcao.y,
    };

    // colisões
    if (
      novaCabeca.x < 0 ||
      novaCabeca.x >= colunas ||
      novaCabeca.y < 0 ||
      novaCabeca.y >= linhas
    ) {
      vivo = false;
    }

    if (cobra.some((seg) => seg.x === novaCabeca.x && seg.y === novaCabeca.y)) {
      vivo = false;
    }

    cobra.unshift(novaCabeca);

    if (novaCabeca.x === comida.x && novaCabeca.y === comida.y) {
      pontuacao++;
      comida = spawnFood();
    } else {
      cobra.pop();
    }
  } catch (erro) {
    console.log("Erro ao atualizar:", erro.message);
    vivo = false;
  }
}

function desenhar() {
  try {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // comida
    ctx.fillStyle = "red";
    ctx.fillRect(comida.x * tamanho, comida.y * tamanho, tamanho, tamanho);

    // cobra
    ctx.fillStyle = "lime";
    cobra.forEach((seg, i) => {
      ctx.fillRect(seg.x * tamanho, seg.y * tamanho, tamanho, tamanho);
    });

    document.getElementById("score").innerText = "Pontuação: " + pontuacao;
  } catch (erro) {
    console.log("Erro ao desenhar:", erro.message);
  }
}

function loop() {
  try {
    if (!vivo) {
      alert("Game Over! Pontuação: " + pontuacao);
      document.location.reload();
      return;
    }

    atualizar();
    desenhar();
  } catch (erro) {
    console.log("Erro no loop:", erro.message);
  }
}

// velocidade
setInterval(loop, 200);
