let paragraphCount = 0;

const button = document.getElementById("add-paragraph");
const addParagraph = function () {
    paragraphCount++;
    const newParagraph = document.createElement("p");
    newParagraph.textContent = `Paragraph #${paragraphCount} added by javascript`;
    const contentContainer = document.getElementById("content-container");
    contentContainer?.append(newParagraph);
};

button?.addEventListener("click", addParagraph);
