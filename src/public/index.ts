const button = document.getElementById("add-paragraph");
const addParagraph = function () {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = "added by javascript";
    const contentContainer = document.getElementById("content-container");
    contentContainer?.append(newParagraph);
};

button?.addEventListener("click", addParagraph);
