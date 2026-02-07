const symbols = ["🍒", "🍋", "🍇", "💎", "⭐", "7️⃣"];

const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");

const button = document.getElementById("spinBtn");
const resultText = document.getElementById("result");

const balanceText = document.getElementById("balance");
const betInput = document.getElementById("betAmount");
const addMoneyBtn = document.getElementById("addMoney");

const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

let balance = 100;

function updateBalance() {
  balanceText.textContent = balance;
}

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinSlot(slot, delay) {
  let count = 0;
  const interval = setInterval(() => {
    slot.textContent = randomSymbol();
    count++;
    if (count > 15) clearInterval(interval);
  }, delay);
}

addMoneyBtn.addEventListener("click", () => {
  balance += 50;
  updateBalance();
  resultText.textContent = "💵 Dinheiro adicionado!";
});

button.addEventListener("click", () => {
  const bet = parseInt(betInput.value);

  if (!bet || bet <= 0) {
    resultText.textContent = "⚠️ Digite um valor de aposta!";
    return;
  }

  if (bet > balance) {
    resultText.textContent = "❌ Saldo insuficiente!";
    return;
  }

  spinSound.currentTime = 0;
  spinSound.play();

  balance -= bet;
  updateBalance();
  resultText.textContent = "";

  spinSlot(slot1, 50);
  spinSlot(slot2, 70);
  spinSlot(slot3, 90);

  setTimeout(() => {
    const s1 = slot1.textContent;
    const s2 = slot2.textContent;
    const s3 = slot3.textContent;

    if (s1 === s2 && s2 === s3) {
      const win = bet * 5;
      balance += win;
      resultText.textContent = `🔥 JACKPOT! Você ganhou R$ ${win}!`;
      winSound.play();
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
      const win = bet * 2;
      balance += win;
      resultText.textContent = `✨ Duas iguais! Ganhou R$ ${win}!`;
      winSound.play();
    } else {
      resultText.textContent = "😢 Não foi dessa vez!";
      loseSound.play();
    }

    updateBalance();
  }, 1500);
});

updateBalance();
