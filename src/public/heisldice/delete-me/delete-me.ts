const rollDice = async () => {
    const response = await fetch(`/dice`, { method: "GET" });
    const { dice } = await response.json();

    const diceElements = document.getElementById("dice-container")?.querySelectorAll("li");

    diceElements?.forEach((element, index) => {
        element.textContent = `${dice[index]}`;
    });
};

const button = document.getElementById("dice-roll-button");

// button?.addEventListener("click", (event: MouseEvent) => {
button?.addEventListener("click", (event) => {
    const button = event.target as HTMLButtonElement;
    // const button = event.target;
    if (button && button.id === "dice-roll-button") {
        rollDice();
    }
});
