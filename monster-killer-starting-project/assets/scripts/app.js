const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);


function attackMonster(mode) {
  let maxdamage;
  if (mode == "ATTACK") {
    maxdamage = ATTACK_VALUE;
  } else if (mode == "STRONG_ATTACK") {
    maxdamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxdamage);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won");
  } else if (currentPlayerHealth <= 0 && monsterHealthBar > 0) {
    alert("you lost");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("we have draw");
  }
}

function attackHandler() {
  attackMonster("ATTACK");
}
function StrongattackHandler() {
  attackMonster("STRONG_ATTACK");
}
function healPlayerHandler() {
  increasePlayerHealth(HEAL_VALUE);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", StrongattackHandler);
healBtn.addEventListener("click", healPlayerHandler);
