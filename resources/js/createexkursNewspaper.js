   
   function getText(entry) {
  return entry[`text_${currentLang}`] || ""; // Fallback
}
   
   function createExkurseNewspaper() {
      const excursNewspaper = document.getElementById("01a_TN_06");

      if (!excursNewspaper) {
        console.error("Element mit ID '01a_TN_06' nicht gefunden!");
        return;
      }

        // ❗ Vorher alle alten Inhalte von DIESER Funktion entfernen
  const existingWrapper = document.getElementById("newspaper-wrapper");
  if (existingWrapper) {
    existingWrapper.remove();
  }

  // ❗ Neuer Wrapper
  const newspaperwrapper = document.createElement("div");
  newspaperwrapper.id = "newspaper-wrapper";

      

      const newsticker = document.createElement("div");
      newsticker.classList.add("newsticker");

      const tickertext1 = document.createElement("div");
      tickertext1.classList.add("ticker-text");
      tickertext1.textContent = getText(newspaperTexts.tickertext1);

      const tickertext2 = document.createElement("div");
      tickertext2.classList.add("ticker-text");
      tickertext2.textContent = getText(newspaperTexts.tickertext2);

      const tickertext3 = document.createElement("div");
      tickertext3.classList.add("ticker-text");
      tickertext3.textContent = getText(newspaperTexts.tickertext3);

      newsticker.appendChild(tickertext1);
      newsticker.appendChild(tickertext2);
      newsticker.appendChild(tickertext3);
      newspaperwrapper.appendChild(newsticker);

      const titel = document.createElement("div");
      titel.id = "titel";
      titel.textContent = getText(newspaperTexts.title);
      newspaperwrapper.appendChild(titel);

      const date = document.createElement("div");
      date.classList.add("newspaperdate");

      const number = document.createElement("div");
      number.classList.add("date-text", "number");
      number.textContent = getText(newspaperTexts.number);

      const datetext = document.createElement("div");
      datetext.classList.add("date-text");
      datetext.textContent = getText(newspaperTexts.date);

      const price = document.createElement("div");
      price.classList.add("date-text", "price");
      price.textContent = getText(newspaperTexts.price);

      date.appendChild(number);
      date.appendChild(datetext);
      date.appendChild(price);
      newspaperwrapper.appendChild(date);

      const intro = document.createElement("div");
      intro.classList.add("intro");

      const introtext = document.createElement("div");
      introtext.classList.add("intro-text");

      // Drei einzelne <p>-Elemente mit eigenen Klassen
      const p1 = document.createElement("p");
      p1.classList.add("intro-paragraph-1");
      p1.textContent = getText(newspaperTexts.p1);

      const p2 = document.createElement("p");
      p2.classList.add("intro-paragraph-2");
      p2.textContent = getText(newspaperTexts.p2);

      const p3 = document.createElement("p");
      p3.classList.add("intro-paragraph-3");
      p3.textContent = getText(newspaperTexts.p3);

      // Die <p>-Elemente in das introtext-Div einfügen
      introtext.appendChild(p1);
      introtext.appendChild(p2);
      introtext.appendChild(p3);

      // Bild-Container wie bisher
      const introimage = document.createElement("div");
      introimage.classList.add("intro-image");

      // Alles zusammensetzen
      intro.appendChild(introtext);
      intro.appendChild(introimage);
      newspaperwrapper.appendChild(intro);

      const newspaper = document.createElement("div");
      newspaper.classList.add("newspaper");

      const columnarea = document.createElement("div");
      columnarea.classList.add("column-area");

      const flowtext = document.createElement("div");
      flowtext.classList.add("flow-text");

      // Drei einzelne <p>-Elemente mit eigenen Klassen
      const p4 = document.createElement("p");
      p4.classList.add("subheadline");
      p4.textContent = getText(newspaperTexts.p4.subheadline);

      const p5 = document.createElement("p");
      p5.classList.add("content");
      p5.textContent = getText(newspaperTexts.p4.content);

      const p6 = document.createElement("p");
      p6.classList.add("subheadline");
      p6.textContent = getText(newspaperTexts.p6.subheadline);

      const p7 = document.createElement("p");
      p7.classList.add("content");
      p7.textContent = getText(newspaperTexts.p6.content);

      const p8 = document.createElement("p");
      p8.classList.add("subheadline");
      p8.textContent = getText(newspaperTexts.p8.subheadline);

      const p9 = document.createElement("p");
      p9.classList.add("content");
      p9.textContent = getText(newspaperTexts.p8.content);

      const p10 = document.createElement("p");
      p10.classList.add("subheadline");
      p10.textContent = getText(newspaperTexts.p10.subheadline);

      const p11 = document.createElement("p");
      p11.classList.add("content");
      p11.textContent = getText(newspaperTexts.p10.content);

      flowtext.appendChild(p4);
      flowtext.appendChild(p5);
      flowtext.appendChild(p6);
      flowtext.appendChild(p7);
      flowtext.appendChild(p8);
      flowtext.appendChild(p9);
      flowtext.appendChild(p10);
      flowtext.appendChild(p11);

      columnarea.appendChild(flowtext);
      newspaper.appendChild(columnarea);

      newspaperwrapper.appendChild(newspaper);

      excursNewspaper.appendChild(newspaperwrapper); // <-- erst am Ende einfügen

      const part4 = document.createElement("div");
      part4.classList.add("part4");

      const part4text = document.createElement("div");
      part4text.classList.add("part4-text");

      // Drei einzelne <p>-Elemente mit eigenen Klassen
      const p12 = document.createElement("p");
      p12.classList.add("subheadline");
      p12.textContent = getText(newspaperTexts.part4.subheadline);

      const p13 = document.createElement("p");
      p13.classList.add("content");
      p13.textContent = getText(newspaperTexts.part4.content);

      // Die <p>-Elemente in das introtext-Div einfügen
      part4text.appendChild(p12);
      part4text.appendChild(p13);

      // Bild-Container wie bisher
      const part4image = document.createElement("div");
      part4image.classList.add("part4-image");

      // Alles zusammensetzen
      part4.appendChild(part4image);
      part4.appendChild(part4text);
      newspaperwrapper.appendChild(part4);

    }

    function updateNewspaper(language) {
  // Optional: prüfen, ob das Kapitel den Newspaper-Excurs überhaupt braucht
  const container = document.getElementById("01a_TN_06");
  if (!container) return;

  // Setze aktuelle Sprache
  currentLang = language;

  // Newspaper neu erzeugen
  createExkurseNewspaper(); // Diese nutzt dann currentLang für Textauswahl
}

    // Warten, bis die Seite komplett geladen ist
    document.addEventListener("DOMContentLoaded", createExkurseNewspaper);