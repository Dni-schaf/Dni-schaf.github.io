//array in dem alle timestamps liegen
function fillTimestampArr (datecount, dataset){
    let timestempArr = [];
        for (let i=0; i<datecount; i++){
            timestempArr.push(dataset[i].timestamp);
        };
        return timestempArr;
};

// welches ist das erste datum in beiden datensätzen und welches das letzte
function getMaxtimestamp () {
    if (MaxtimestampScott > MaxtimestampAmundsen) {
        return MaxtimestampScott;
    }else{
        return MaxtimestampAmundsen;
    };
};

function getMintimestamp () {
    if (MintimestampScott < MintimestampAmundsen) {
      return MintimestampScott;
    }else{
      return MintimestampAmundsen;
    };
};

// befüllt die array mit der länge der zeitabschnitte von datum zu datum beider teams
function filltime(datecount, dataset) {
    //Arrays werden befüllt
    let timeLength = [];
    for (let i=0; i<datecount-1; i++){ 
      let time = dataset[i+1].timestamp - dataset[i].timestamp;
      timeLength.push(time);
    };
    return timeLength;
};

// befüllt die array mit der länge der pfadabschnitte von datum zu datum beider teams
function fillLength(datecount, team) {
   let totalLength = [];
   for (let i=0; i<datecount-1; i++){
     let IDteam = team + i;
     let length = d3.select("#"+IDteam).node().getTotalLength();
     totalLength.push(length);
   };
   return totalLength;
};

 //linien werden über dashoffset unsichtbar gemacht  
function hidelines (datecount, team, totalLength){
    for (let i=0; i<datecount-1; i++){
        let IDteam = team + i;
        d3.select("#"+IDteam).attr("stroke-dasharray", totalLength[i]);
        d3.select("#"+IDteam).attr("stroke-dashoffset", totalLength[i]);
    }; 
};

// Funktion, um die Höhen aller day-divs, spacer-div und Margindivs zu speichern. diese brauch es für die varibale korrektur. damit currentime richtig berechnet wird
//margin div ist am ende eines daydivs und unsichtbar damit die pfadanimation nicht vom comic bild verdeckt wird
function getDivHeights() {

    // Hole alle day-div und spacer-div Elemente
    const dayDivs = document.querySelectorAll('.day-div');
    const spacerDivs = document.querySelectorAll('.spacer-div');
    const marginDivs = document.querySelectorAll('.margin');

    // Iteriere über die day-divs und speichere die Höhe
    dayDivHeightsArray = Array.from(dayDivs).map(div => div.offsetHeight);
    spacerDivHeightsArray = Array.from(spacerDivs).map(div => div.offsetHeight);
    marginDivHeightsArray = Array.from(marginDivs).map(div => div.offsetHeight);

return { dayDivHeightsArray, spacerDivHeightsArray, marginDivHeightsArray };
}

// konvertiert timestamp zur Datum
function konverter(){
    let date = new Date(currenttime);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let datum = document.getElementById("datumsanzeige");
    datum.innerHTML = day + ". " + month + ". " + year;
}; 

function sumArrayUpToIndex(array, index) {
    let sum = 0;
    for (let i = 0; i <= index; i++) {
        sum += array[i];
    }
    return sum;
}
   