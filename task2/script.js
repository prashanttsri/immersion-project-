const addPluses = document.querySelectorAll(".add-plus");

addPluses.forEach((plus) => {
  plus.addEventListener("click", () => {
    plus.style.display = "none"; // hide the plus symbol

    const textarea = document.createElement("textarea");
    const notesContainer = plus.parentElement.querySelector(".notes");

    textarea.placeholder = "Write your note here...";
    notesContainer.innerHTML = ""; // clear anything inside
    notesContainer.appendChild(textarea);
    textarea.focus();

    textarea.addEventListener("blur", () => {
      if (textarea.value.trim() !== "") {
        const note = document.createElement("div");
        note.className = "note";
        note.innerText = textarea.value;
        note.addEventListener("dblclick", () => {
          note.remove();
          plus.style.display = "block";
        });
        notesContainer.innerHTML = "";
        notesContainer.appendChild(note);
      } else {
        textarea.remove();
        plus.style.display = "block";
      }
    });

    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        textarea.blur();
      }
    });
  });
});
