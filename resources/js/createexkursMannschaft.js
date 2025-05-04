// Excurs headline erstellen und einfügen
const excursMannschaft = document.getElementById("excursMannschaft");

const headline = document.createElement("p");
headline.classList.add("excursheadline");
headline.textContent = "Wie sind die beiden Mannschaften aufgestellt?"; // <-- Optionaler Text
excursMannschaft.appendChild(headline);


// Introtext erstellen und einfügen
const introDiv = document.createElement("div");
introDiv.classList.add("excursIntroText");
introDiv.textContent = "Dies ist ein Einleitungstext zum Exkurs. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen.Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen. Hier kannst du eine Einführung oder Erklärung unterbringen.";

excursMannschaft.appendChild(introDiv);


// Container für die Buttons
const buttonWrapper = document.createElement("div");
buttonWrapper.classList.add("excursButtonWrapper");

// Button 1
const button1 = document.createElement("button");
button1.classList.add("excursButton", "excursButton1");
button1.textContent = "Mannschaften vergleichen";

// Button 2
const button2 = document.createElement("button");
button2.classList.add("excursButton", "excursButton2");
button2.textContent = "Exkurs überspringen";

// Buttons zum Wrapper hinzufügen
buttonWrapper.appendChild(button1);
buttonWrapper.appendChild(button2);

// Button-Wrapper unter den Intro-Text setzen
excursMannschaft.appendChild(buttonWrapper);


//Excurs inneres gestalten
const excursContainer = document.getElementById("excursContainer");

// Schließen-Button erstellen
const closeButton = document.createElement("button");
closeButton.textContent = "✕";
closeButton.classList.add("excursCloseButton");



// Schließen-Button oben rechts einfügen
excursContainer.appendChild(closeButton);





// EXCURS ÖFFNEN

button1.addEventListener("click", () => {
    console.log("klick");
    document.querySelector('.excursContainer').style.display = 'block';
    document.body.style.overflow = "hidden";
  });


// Klick-Event: Container ausblenden
closeButton.addEventListener("click", () => {
    excursContainer.style.display = "none";
    document.body.style.overflow = "auto"; // Oder "scroll", je nach Design
});