const altura = 20;
const largura = 20;

let cobra = [{ x: 10, y: 7 }];
let direcao = { x: 1, y: 0 };
let comida = spawnFood();
let vivo = true;
let pontuacao = 0;

function spawnFood() {
  return {
    x: Math.floor(Math.random() * altura),
    y: Math.floor(Math.random() * largura),
  };
}
