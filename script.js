const dialog = document.querySelector(".story-dialog");
const dialogCover = document.querySelector(".dialog-cover");
const dialogTitle = document.querySelector("#dialog-title");
const dialogAudience = document.querySelector("[data-dialog-audience]");
const dialogPages = document.querySelector("[data-dialog-pages]");
const dialogSummary = document.querySelector("[data-dialog-summary]");
const dialogThemes = document.querySelector("[data-dialog-themes]");
const dialogPdf = document.querySelector("[data-dialog-pdf]");
const closeDialogButton = document.querySelector("[data-close-dialog]");

function openStoryDialog(card) {
  const story = card.dataset;
  const isArabic = card.closest("[lang='ar']") !== null;

  dialog.dir = isArabic ? "rtl" : "ltr";
  dialog.lang = isArabic ? "ar" : "en";
  dialogCover.src = story.cover;
  dialogCover.alt = story.title;
  dialogTitle.textContent = story.title;
  dialogAudience.textContent = story.audience;
  dialogPages.textContent = story.pages;
  dialogSummary.textContent = story.summary;
  dialogPdf.href = story.pdf;
  dialogPdf.textContent = isArabic ? "افتحي القصة" : "Open PDF";

  dialogThemes.replaceChildren();
  story.themes.split(",").forEach((theme) => {
    const tag = document.createElement("span");
    tag.textContent = theme.trim();
    dialogThemes.append(tag);
  });

  dialog.showModal();
}

document.querySelectorAll("[data-open-story]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("[data-title]");
    openStoryDialog(card);
  });
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
