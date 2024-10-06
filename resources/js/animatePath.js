 //variablen erst befüllen nach laden der seite
 window.onload = function() {
    // Alle Spacer-Divs und Day-Divs holen
    const spacers = document.querySelectorAll('.spacer-div');
    const days = document.querySelectorAll('.day-div');

    // Sicherstellen, dass die Anzahl der Spacer und Days übereinstimmt
    const maxLength = Math.max(spacers.length, days.length);

    // Berechne die Y-Position relativ zum Dokument (top-Wert) für jedes Div
    for (let i = 0; i < maxLength; i++) {
       if (i < spacers.length) {
           // Position des Spacer-Divs relativ zum Dokumentanfang
           const spacerPosition = spacers[i].getBoundingClientRect().top + window.scrollY;
           positionsArray.push(spacerPosition);
       }
       if (i < days.length) {
           // Position des Day-Divs relativ zum Dokumentanfang
           const dayPosition = days[i].getBoundingClientRect().top + window.scrollY;
           positionsArray.push(dayPosition);
       }
    }
    // ich weiß nicht warum er behauptet das die nicht verwendet werden, sie sind wichtig wenn sie weg sind geht die animation nicht
    const { dayDivHeightsArray, spacerDivHeightsArray, marginDivHeightsArray} = getDivHeights();

};


function setPathprogress(datecount, timestempArr, team, totalLength, timeLength){
    let scrolltop= document.documentElement.scrollTop;

    const startDate = timestampstartArray[DayIndex];
    const endDate = timestampendArray[DayIndex];

    // setzt aktuelle scrollposition ins verhältnis um so das aktuelle datum festzulegen
    let scrollposition = scrolltop - korrektur;
    currenttimestamp =((endDate-startDate) * (scrollposition ))/dayDivHeightsArray[DayIndex];
    currenttime = currenttimestamp+startDate;
    konverter();

    //das div ermitteln indem wir gerade sind
    for (let i = 0; i < positionsArray.length; i++) {
        if (scrolltop >= positionsArray[i] && (i + 1 >= positionsArray.length || scrolltop < positionsArray[i + 1])) {
            activeDiv = i;
                 
            if (activeDiv != lastDiv) {
                lastDiv = activeDiv;
                divstate = "spacerdiv";
                DayIndex = (activeDiv-1)/2;
                let SpacerIndex = activeDiv/2;

                

                //Korrektur der scrollposition damit die höhe der spacerdivs rausgerechnet werden
                let korrekturSpacer = sumArrayUpToIndex(spacerDivHeightsArray, SpacerIndex);
                let korrekturmargin = sumArrayUpToIndex(marginDivHeightsArray, SpacerIndex-1);
                let korrekturMap = sumArrayUpToIndex(dayDivHeightsArray, DayIndex-1);
                korrektur = korrekturMap + korrekturSpacer + korrekturmargin;

                //Wenn wir in einem daydiv sind dann geht es hier weiter
                if (datestartArray[DayIndex] !== undefined) {
                    divstate = "daydiv";
                    console.log(datestartArray[DayIndex]);


                    // Schleife zum Sichtbarmachen der DIVs (basierend auf der Klasse)
                    citiesMap[100].forEach(function(cityClass) {
    // Wählt alle Elemente mit der entsprechenden Klasse aus
    const elements = document.querySelectorAll('.' + cityClass);
  
    elements.forEach(function(element) {
      element.style.visibility = 'hidden';  // Div sichtbar machen
    });
  });

                    // Zugriff auf das entsprechende Array
let arrayname = citiesMap[DayIndex];

// Schleife zum Sichtbarmachen der DIVs (basierend auf der Klasse)
arrayname.forEach(function(cityClass) {
    // Wählt alle Elemente mit der entsprechenden Klasse aus
    const elements = document.querySelectorAll('.' + cityClass);
  
    elements.forEach(function(element) {
      element.style.visibility = 'visible';  // Div sichtbar machen
    });
  });
                }                
            }      
    break;
        }
    }

    // für alle nicht spacer divs wird diese funktion ausgelösst also für daydiv und margin div
    if(divstate!="spacerdiv"){

        //alle linine durchgehen und entweder füllen oder unsichtbar durch offset
        for (let i=0; i<datecount; i++){
            let IDteam = team + i;
       
            // das erste if damit die linie nicht weiter gezeichnet wird wenn datum nicht mehr im zeitraum ist
            if (currenttime < endDate){
            // schauen wer größer ist wird versteckt wer kleiner ist wird eingeblendet
                if (currenttime/1000>=timestempArr[i+1]){
                    d3.select("#"+IDteam).attr("stroke-dashoffset", 0);
                }else{
                    d3.select("#"+IDteam).attr("stroke-dashoffset", totalLength[i]);
                };
            }else{}
       
            //auswählen des abschnittest in dem wir grad mitten drin sind
            if (currenttime/1000>timestempArr[i] && currenttime/1000<timestempArr[i+1]&& currenttime < endDate) {
                //setzt länger des aktuellen abschnitt ins verhältnis zur relativen timestemp zeit und verändert das offset
                let dashoffset = totalLength[i]*((currenttime/1000)-timestempArr[i])/timeLength[i];
                d3.select("#"+team+i).attr("stroke-dashoffset", totalLength[i]-dashoffset);
            }else{
            };
        };  
    };
};


// achtet auf die scroll bewegung und löst das pfad zeichnen aus
window.addEventListener('scroll', function() {
    setPathprogress(datecountAmundsen, timestempArrAmundsen, "Amundsen", totalLengthAmundsen, timeLengthAmundsen);
    setPathprogress(datecountScott, timestempArrScott, "Scott", totalLengthScott, timeLengthScott);
});
