// Get the modal

let prompt = document.querySelector(".prompt");
window.addEventListener("click", function (event) {
  if (event.target == prompt) {
    prompt.style.display = "none";
  }
});
async function closeBtn() {
  document.querySelector(".closebtn").addEventListener("click", () => {
    let div = this.parentElement;
    // Set the opacity of div to 0 (transparent)
    div.style.opacity = "0";
    // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
    setTimeout(function () {
      div.style.display = "none";
    }, 600);
  });
}

export { closeBtn };
