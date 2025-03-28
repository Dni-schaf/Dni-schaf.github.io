 // Öffnen und Schließen des Overlays
 const menuButton = document.getElementById('menuButton');
 const menuOverlay = document.getElementById('menuOverlay');
 const closeMenu = document.getElementById('closeMenu');
 

 
 // Sprachwechsel und Aktualisierung der Texte
 const languageButtons = document.querySelectorAll('.language-button');
 
 languageButtons.forEach(button => {
     button.addEventListener('click', (event) => {
         const selectedLanguage = event.target.getAttribute('data-lang');
         changeLanguage(selectedLanguage);
         menuOverlay.style.display = 'none'; // Overlay schließen nach Sprachauswahl
     });
 });
 
 // Funktion, um die Sprache zu ändern
 function changeLanguage(lang) {
     // Setze die Sprache in localStorage, um sie beim Seitenwechsel zu behalten
     localStorage.setItem('language', lang);
     language = lang;
     // Aktualisiere die Texte auf der Seite
     addAllOceanLabels();
     addAntarcticLabel();
     addCityLabel();
     updateAllTexts(language);
 }
 
 
 document.addEventListener('DOMContentLoaded', () => {
     // Hole die gespeicherte Sprache oder setze auf 'de' als Standard
     const savedLanguage = localStorage.getItem('language') || 'de';
     language = savedLanguage;  // Aktualisiere die globale Variable language
     changeLanguage(savedLanguage);  // Wende die Sprache an
     console.log(savedLanguage);
 });
 