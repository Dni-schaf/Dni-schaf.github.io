document.addEventListener("DOMContentLoaded", function () {
   
    const languageButtons = document.querySelectorAll(".language-button");



    // Funktion zum Ändern der Sprache
    function changeLanguage(language) {
        localStorage.setItem("selectedLanguage", language); // Speichert die Sprache im localStorage
        updateAllTexts(language); // Aktualisiert alle Texte auf der Seite
    }

    // Klick-Event für die Sprachbuttons
    languageButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLanguage = this.getAttribute("data-lang");
            changeLanguage(selectedLanguage);
        });
    });


    // Prüfe, ob eine Sprache gespeichert wurde, und setze sie beim Laden der Seite
    const savedLanguage = localStorage.getItem("selectedLanguage") || "de"; // Standard: Deutsch
    changeLanguage(savedLanguage);
});
