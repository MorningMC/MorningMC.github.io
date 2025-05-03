// Automatically expand the first <details> element on the page
document.addEventListener("DOMContentLoaded", () => {
    const detailsList = document.querySelectorAll("details");
    if (detailsList.length > 0) {
        detailsList[0].open = true; // Open the first <details> element
    }
});