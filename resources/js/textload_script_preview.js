

function loadTexts(language, txtSrc) {

    sitelanguage = language;
    console.log (sitelanguage);
    txtSrc.forEach(item => {
        const chapterId = item.Kapitel;
        const text = item[language];
        const element = document.getElementById(chapterId);
        if (element) {
            element.textContent = text;
        }    
   });
}

function toggleLanguage(language) {
    // Ändern der Sprache und Neu laden der Texte
    loadTexts(language);
}

// Initiales Laden der Texte (in der Standardsprache)
loadTexts("de", previewTxt); 