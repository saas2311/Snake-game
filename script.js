const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

const tamanho = 20;
const quantidade = canvas.width / tamanho;

let cobra = [{ x: 10, y: 10 }];

let direcao = "right";

let comida = {
  x: 15,
  y: 15,
};

let pontuacao = 0;

function desenharFundo() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function desenharCobra() {
  cobra.forEach((parte, index) => {
    ctx.fillStyle = index === 0 ? "#00ff88" : "#00cc66";

    ctx.fillRect(
      parte.x * tamanho,
      parte.y * tamanho,
      tamanho - 2,
      tamanho - 2,
    );
  });
}

function desenharComida() {
  ctx.fillStyle = "#ff4444";

  ctx.fillRect(
    comida.x * tamanho,
    comida.y * tamanho,
    tamanho - 2,
    tamanho - 2,
  );
}

function moverCobra() {
  const cabeca = { ...cobra[0] };

  if (direcao === "right") cabeca.x++;
  if (direcao === "left") cabeca.x--;
  if (direcao === "up") cabeca.y--;
  if (direcao === "down") cabeca.y++;

  cobra.unshift(cabeca);

  if (cabeca.x === comida.x && cabeca.y === comida.y) {
    pontuacao++;

    scoreText.textContent = pontuacao;

    gerarComida();
  } else {
    cobra.pop();
  }
}

function gerarComida() {
  let novaComida;
  let posicaoValida = false;

  while (!posicaoValida) {
    novaComida = {
      x: Math.floor(Math.random() * quantidade),
      y: Math.floor(Math.random() * quantidade),
    };

    posicaoValida = true;

    for (let parte of cobra) {
      if (parte.x === novaComida.x && parte.y === novaComida.y) {
        posicaoValida = false;
        break;
      }
    }
  }

  comida = novaComida;
}

function verificarColisao() {
  const cabeca = cobra[0];

  if (
    cabeca.x < 0 ||
    cabeca.y < 0 ||
    cabeca.x >= quantidade ||
    cabeca.y >= quantidade
  ) {
    throw new Error("A cobra bateu na parede!");
  }

  for (let i = 1; i < cobra.length; i++) {
    if (cabeca.x === cobra[i].x && cabeca.y === cobra[i].y) {
      throw new Error("A cobra bateu nela mesma!");
    }
  }
}

function reiniciarJogo() {
  alert("Game Over! Pontuação: " + pontuacao);

  cobra = [{ x: 10, y: 10 }];

  direcao = "right";

  pontuacao = 0;

  scoreText.textContent = pontuacao;

  gerarComida();
}

function atualizarJogo() {
  try {
    desenharFundo();

    moverCobra();

    verificarColisao();

    desenharComida();

    desenharCobra();
  } catch (erro) {
    console.error(erro.message);

    reiniciarJogo();
  }
}

document.addEventListener("keydown", (evento) => {
  const tecla = evento.key;

  if (tecla === "ArrowUp" && direcao !== "down") {
    direcao = "up";
  }

  if (tecla === "ArrowDown" && direcao !== "up") {
    direcao = "down";
  }

  if (tecla === "ArrowLeft" && direcao !== "right") {
    direcao = "left";
  }

  if (tecla === "ArrowRight" && direcao !== "left") {
    direcao = "right";
  }
});

gerarComida();

setInterval(atualizarJogo, 200);
