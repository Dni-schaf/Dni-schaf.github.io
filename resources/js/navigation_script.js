document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menuButton');
    const navigationPlaceholder = document.getElementById('navigationPlaceholder');

    // Navigation aus der externen Datei laden
    fetch('navigation.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Navigation konnte nicht geladen werden: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            navigationPlaceholder.innerHTML = data;

            // Event-Listener hinzufügen
            const menuOverlay = document.getElementById('menuOverlay');
            const closeMenuButton = document.getElementById('closeMenuButton');
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


            menuButton.addEventListener('click', () => {
                menuOverlay.classList.remove('hidden');
            });

            closeMenuButton.addEventListener('click', () => {
                menuOverlay.classList.add('hidden');
            });
        })
        .catch(error => console.error('Fehler beim Laden der Navigation:', error));
});
