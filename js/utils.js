export { timerId };

export function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

export function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#displayText").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#displayText").innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    document.querySelector("#displayText").innerHTML = "Player 1 Wins!";
  } else if (player.health < enemy.health) {
    document.querySelector("#displayText").innerHTML = "Player 2 Wins!";
  }
}

let TIMER = 60;
let timerId;

export function decreaseTimer({ player, enemy }) {
  if (TIMER > 0) {
    timerId = setTimeout(
      decreaseTimer.bind(undefined, { player: player, enemy: enemy }),
      1000
    );
    TIMER--;
    document.querySelector("#timer").innerHTML = TIMER;
  }

  if (TIMER === 0) {
    determineWinner({ player: player, enemy: enemy, timerId: timerId });
  }
}
