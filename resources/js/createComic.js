// Funktion, die das Datumsformat "tt.mm.jjjj" in ein Date-Objekt konvertiert
function convertToDate(dateString) {
  const [day, month, year] = dateString.split('.');
  return new Date(`${year}-${month}-${day}`).getTime();
}

const timestampstartArray = datestartArray.map(convertToDate);
const timestampendArray = dateendArray.map(convertToDate);

// Container für die divs
const container = document.getElementById('container');



// Höhe des Browserfensters
const windowHeight = window.innerHeight;

// Funktion, um ein Margin-div zu erstellen
function createMarginDiv() {
  const marginDiv = document.createElement('div');
  marginDiv.className = 'margin';

// Setze die Breite auf 100% und die Höhe auf 100% der Fensterhöhe
  marginDiv.style.width = '100%';
  marginDiv.style.height = `${windowHeight}px`;

  return marginDiv;
}

// Funktion, um ein Spacer-div zu erstellen und Bilder hinzuzufügen
function createSpacerDiv(images) {
  const spacerDiv = document.createElement('div');
  spacerDiv.className = 'spacer-div';

  images.forEach(image => {
    const imgContainer = document.createElement('div');
    imgContainer.style.position = 'relative';
    imgContainer.className = 'image-container';
    imgContainer.id = image.Kapitel;

    const img = document.createElement('img');
    img.src = `../resources/images/${image.Kapitel}.svg`;
    img.style.width = '100%';
    imgContainer.appendChild(img);

        // Erstellen des Gitterbildes
        //const gridImg = document.createElement('img');
        //gridImg.src = '../resources/images/grid.png'; // Pfad zum Gitterbild
        //gridImg.style.position = 'absolute';
        //gridImg.style.top = 0;
        //gridImg.style.left = 0;
        //gridImg.style.width = '100%';
        //gridImg.style.height = '100%';
        //gridImg.style.pointerEvents = 'none'; // Gitterbild soll keine Mausinteraktionen beeinflussen
        //imgContainer.appendChild(gridImg);

    spacerDiv.appendChild(imgContainer);
  });

  return spacerDiv;
}

function updateTexts(language) {
  // Hole alle image-container
  const imageContainers = document.querySelectorAll('.image-container');

  // Gehe durch alle image-container und füge den entsprechenden Text hinzu
  imageContainers.forEach(container => {
    const imageKey = container.id; // Verwende die ID des Containers als Schlüssel

    // Leere zuerst den alten Text (falls vorhanden)
    const existingTexts = container.querySelectorAll('.text-container');
    existingTexts.forEach(textDiv => textDiv.remove());

    // Jetzt neuen Text in der richtigen Sprache hinzufügen
    if (imageTexts[imageKey]) {
      imageTexts[imageKey].forEach(textData => {
        const textDiv = document.createElement('div');
        textDiv.className = 'text-container' + ' ' + textData.kind; // Für einfaches Entfernen in Zukunft
        textDiv.style.bottom = textData.bottom;
        textDiv.style.left = textData.left;
        textDiv.style.width = textData.width;
        textDiv.style.textAlign = textData.textAlign;

        const pElement = document.createElement('p');
        pElement.className = textData.color; // Farbe setzen
        pElement.style.fontSize = textData.Fontsize;

        const spanElement = document.createElement('span');
        spanElement.className = `highlight ${textData.backgroundColor}`; // Hintergrundfarbe setzen
        spanElement.innerText = textData[`text_${language}`] || textData[`text_de`]; // Text basierend auf der Sprache

        pElement.appendChild(spanElement);
        textDiv.appendChild(pElement);
        container.appendChild(textDiv); // Füge den Text in den image-container ein
      });
    }
  });
}


// Funktion, um Texte zum day-div hinzuzufügen
function addSpeakerTextToDayDiv(dayDiv, speakerKey, language) {
  if (speaker[speakerKey]) {
    speaker[speakerKey].forEach(textData => {
      const textDiv = document.createElement('div');
      textDiv.className = textData.kind;
      textDiv.style.top = textData.top;
      textDiv.style.left = textData.left;
      textDiv.style.width = textData.width;
      textDiv.style.textAlign = textData.textAlign;
      textDiv.style.backgroundColor = textData.backgroundColor;

      const pElement = document.createElement('p');
      pElement.innerText = textData[`text_${language}`] || textData[`text_de`];

      textDiv.appendChild(pElement);
      dayDiv.appendChild(textDiv);
    });
  }
}

function createAllDivs() {
  container.innerHTML = ''; // Leert den Container komplett (alte divs raus)
  dayDivHeightsArray = []; // Wichtig: Reset für neue Höhenberechnung
  
// Ersten Spacer-div mit Bildern vor dem ersten div einfügen
container.appendChild(createSpacerDiv(imageSets[0]));

// Schleife über die Arrays und Erstellung der day-divs
for (let i = 0; i < datestartArray.length; i++) {
  const startDate = convertToDate(datestartArray[i]);
  const endDate = convertToDate(dateendArray[i]);

  // Berechnung der Tage zwischen den beiden Daten
  const timeDiff = endDate - startDate;
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

  // Höhe des divs in Pixeln (30px pro Tag)
  const divHeight = daysDiff * 30 + windowHeight;

  // Füge die berechnete Höhe zum dayDivHeightsArray hinzu
  dayDivHeightsArray.push(divHeight);

  // Erstellung und Styling des divs
  const dayDiv = document.createElement('div');
  dayDiv.className = 'day-div';
  // Füge die ID mit dem Timestamp des Startdatums hinzu
  dayDiv.id = `${startDate}`;
  dayDiv.style.height = `${divHeight}px`;
  dayDiv.textContent = `Start: ${datestartArray[i]} - Ende: ${dateendArray[i]} - Tage: ${daysDiff}`;
 
  // Hinzufügen des divs und eines Spacer-divs mit Bildern zum Container
  container.appendChild(dayDiv);

  // Füge ein margin-div zwischen day-div und spacer-div hinzu
  const marginDiv = createMarginDiv();
  container.appendChild(marginDiv);

  // Füge weitere Bildsätze hinzu, wenn vorhanden 
  if (i < imageSets.length - 1) {
    container.appendChild(createSpacerDiv(imageSets[i + 1]));
  }
}

document.getElementById('container').appendChild(createSpacerDiv(imageSets, language));

// Funktion, um Texte aus einem Image-Container zu entfernen
function removeTextsFromImageContainer(imageContainer) {
  const textElements = imageContainer.querySelectorAll('div'); // Gezieltes Entfernen von Text-Divs
  textElements.forEach(textElement => textElement.remove());  // Nur die Texte entfernen
}

//addSpeakerTextToDayDiv(dayDiv, `0${i + 1}_Speaker`, language); // Zum Beispiel 01_Speaker, 02_Speaker
// Funktion, um alle Texte zu aktualisieren, wenn die Sprache geändert wird
window.updateAllTexts = function() {
  const language = localStorage.getItem("selectedLanguage") || "de";
  const chapterPrefix = String(window.chapter); 

  document.querySelectorAll('.day-div').forEach((dayDiv, index) => {
    // Leere vorhandene Texte
    dayDiv.querySelectorAll('div').forEach(div => div.remove());

    // Berechne den speakerKey, z. B. "01a_Speaker"
    const suffix = String.fromCharCode(97 + index); // 97 = 'a', 98 = 'b', ...
    const speakerKey = `${chapterPrefix}${suffix}_Speaker`;

    // Nur wenn dieser Key auch existiert:
    if (speaker[speakerKey]) {
      addSpeakerTextToDayDiv(dayDiv, speakerKey, language);
    }
  });

  updateTexts(language); // Bildtexte wie gehabt
}


updateAllTexts();

}

createAllDivs();

let resizeTimeoutComic;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeoutComic);
  resizeTimeoutComic = setTimeout(() => {
    createAllDivs();            // baue Container neu
    updateLayoutData();         // baue Positionsdaten neu
    createExkurseMannschaftIntro ();
    createExkurseMannschaftContent();
    setPathprogress(datecountAmundsen, timestempArrAmundsen, "Amundsen", totalLengthAmundsen, timeLengthAmundsen);
    setPathprogress(datecountScott, timestempArrScott, "Scott", totalLengthScott, timeLengthScott);
  }, 200);
});