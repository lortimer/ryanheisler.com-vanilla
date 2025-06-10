const diceRollButtonId = "dice-roll-button";

const rollDice = async (): Promise<number[]> => {
    const response = await fetch(`/dice`, { method: "GET" });
    const { dice } = await response.json();

    const diceElements = document.getElementById("dice-container")?.querySelectorAll("li");

    diceElements?.forEach((element, index) => {
        element.textContent = `${dice[index]}`;
    });

    return dice;
};

const addLogEntry = (message: string) => {
    const entries = document.getElementById("log-entries");

    const newEntry = document.createElement("p");

    entries?.insertBefore(newEntry, entries?.childNodes[0]);

    newEntry.textContent = message;
};

const button = document.getElementById(diceRollButtonId);

button?.addEventListener("click", async (event: MouseEvent) => {
    const button = event.target as HTMLButtonElement;
    if (button && button.id === diceRollButtonId) {
        const dice = await rollDice();

        let message = `You rolled ${dice[0]}, ${dice[1]}, ${dice[2]}, ${dice[3]}, ${dice[4]}`;
        addLogEntry(message);
    }
});
