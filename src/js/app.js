// Création du bouton qui permet de remonter en haut de la page.
let button = document.getElementById("button");

button.addEventListener("click", function () {
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
});


let quote = document.getElementsByClassName("quote");
let quoteContener = document.getElementById("quote_contener");
let submitContener = document.getElementById("submit_contener");
let pElement = document.createElement("p");

// On ajoute une écoute du click sur les éléments qui ont pour class "quote".
// On ajoute à l'intérieur la fonction qui permet de mettre la phrase sélectionnée dans le conteneur en bas de la page.
// Si le conteneur est vide on ajoute la phrase sélectionnée, si une phrase est déjà dedans, on l'a remplace.
Array.from(quote).forEach(function(quote) {
    quote.addEventListener('click', function() {
        submitContener.style.display = 'flex';
        if (quoteContener.innerHTML == "") {
            pElement.textContent = this.textContent;
            quoteContener.appendChild(pElement);
        } else {
            pElement.textContent = this.textContent;
        }
    });
});