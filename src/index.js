const button = document.querySelector("#add-paragraph");
const addParagraph = function () {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = "added by javascript";
    document.querySelector("#content-container").append(newParagraph);
};

button.addEventListener("click", addParagraph);
