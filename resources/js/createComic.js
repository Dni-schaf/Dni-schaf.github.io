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

// Setze die Breite auf 100% und die Höhe auf 50% der Fensterhöhe
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

          addTextToImage(imgContainer, image.Kapitel, language);

          spacerDiv.appendChild(imgContainer);
      });

      return spacerDiv;
  
  }

// Funktion, um Texte zum Bild hinzuzufügen
function addTextToImage(imageContainer, imageKey, language) {
if (imageTexts[imageKey]) {
  imageTexts[imageKey].forEach(textData => {
      // Erstelle das äußere Div mit der gewünschten Klasse und den Stilen
      const textDiv = document.createElement('div');
      textDiv.className = textData.kind; // Die Klasse "dialog" und "kind" hinzufügen
      textDiv.style.bottom = textData.bottom; // Bottom-Positionierung
      textDiv.style.left = textData.left;
      textDiv.style.width = textData.width;
      textDiv.style.textAlign = textData.textAlign;

      // Erstelle das p-Element mit der gewünschten Klasse
      const pElement = document.createElement('p');
      pElement.className =  textData.color; // Klasse "txtwhite" hinzufügen

      // Erstelle das span-Element mit der gewünschten Klasse und dem Textinhalt
      const spanElement = document.createElement('span');
      spanElement.id = `${imageKey}_${textData.ID}`; // ID im gewünschten Format setzen
      spanElement.className = `highlight ${textData.backgroundColor}`; // Klasse "highlight" und Hintergrundfarbe hinzufügen
      spanElement.innerText = textData[`text_${language}`] || textData[`text_de`]; // Fallback auf Deutsch, falls die Sprache nicht vorhanden ist

      // Füge das span in das p-Element ein
      pElement.appendChild(spanElement);

      // Füge das p-Element in das Div-Element ein
      textDiv.appendChild(pElement);

      // Füge das fertige Div-Element in den Image-Container ein
      imageContainer.appendChild(textDiv);
  });
}
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
          textDiv.style.color = textData.color;
          textDiv.style.backgroundColor = textData.backgroundColor;

          const pElement = document.createElement('p');
          pElement.innerText = textData[`text_${language}`] || textData[`text_de`];

          textDiv.appendChild(pElement);
          dayDiv.appendChild(textDiv);
      });
  }
}

  // Ersten Spacer-div mit Bildern vor dem ersten div einfügen
  container.appendChild(createSpacerDiv(imageSets[0]));

  // Schleife über die Arrays und Erstellung der divs
  for (let i = 0; i < datestartArray.length; i++) {
      const startDate = convertToDate(datestartArray[i]);
      const endDate = convertToDate(dateendArray[i]);

      // Berechnung der Tage zwischen den beiden Daten
      const timeDiff = endDate - startDate;
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

      // Höhe des divs in Pixeln (30px pro Tag)
      const divHeight = daysDiff * 30 + windowHeight;

      // Erstellung und Styling des divs
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day-div';
      // Füge die ID mit dem Timestamp des Startdatums hinzu
      dayDiv.id = `${startDate}`;
      dayDiv.style.height = `${divHeight}px`;
      dayDiv.textContent = `Start: ${datestartArray[i]} - Ende: ${dateendArray[i]} - Tage: ${daysDiff}`;


      // Füge den Text aus speaker hinzu
    addSpeakerTextToDayDiv(dayDiv, `0${i + 1}_Speaker`, language); // Zum Beispiel 01_Speaker, 02_Speaker

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

