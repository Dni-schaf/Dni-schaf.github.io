let language = "de";

// VARIABLEN FÜR DIE KARTE UND DIE PFADE

// datecount = wie viele Einträge sind im Datensatz
const datecountScott = Object.keys(Scott).length;
const datecountAmundsen = Object.keys(Amundsen).length;

//array in dem alle timestamps der route liegen
let timestempArrScott = fillTimestampArr(datecountScott, Scott);
let timestempArrAmundsen = fillTimestampArr(datecountAmundsen, Amundsen);
  
// ermittel den ersten und den letzten tag des datensatzes pro team und dann insgesammt
let MaxtimestampScott = Math.max(...timestempArrScott);
let MaxtimestampAmundsen = Math.max(...timestempArrAmundsen);
  
let Maxtimestamp = getMaxtimestamp();

let MintimestampScott = Math.min(...timestempArrScott);
let MintimestampAmundsen = Math.min(...timestempArrAmundsen);

let Mintimestamp = getMintimestamp();

// wie lang ist die dauer vom ersten bis zum letzten tag --> timestampdelta
let timestampdelta = (Maxtimestamp) - (Mintimestamp);

let timeLengthScott = filltime(datecountScott, Scott);
let timeLengthAmundsen = filltime(datecountAmundsen, Amundsen);


//VARIABLEN FÜR DEN COMIC
const datestartArray = ["15.06.1910", "09.08.1910", "09.09.1910", "10.09.1910", "12.10.1910", "02.11.1910", "24.11.1910", "25.11.1910", "30.11.1910", "03.12.1910", "04.12.1910", "05.12.1910"];
const dateendArray =   ["09.08.1910", "06.09.1910", "10.09.1910", "11.10.1910", "01.11.1910", "24.11.1910", "25.11.1910", "30.11.1910", "03.12.1910", "04.12.1910", "05.12.1910", "04.03.1911"];

const colors = ["#FFCCCC", "#FFCC99", "#FFFF99", "#CCFFCC", "#99CCFF", "#CCCCFF", "#FF99CC", "#FF6666", "#FF9966", "#FFFF66", "#99FF99", "#66CCFF", "#CC99FF", "#FF66CC"];


//VARIABLEN FÜR DIE PFADANIMATION

let positionsArray = [];
let activeDiv = null;
let lastDiv = 0;

let currenttime;
let korrektur = 0;

let currenttimestamp = 0;

let totalMapHeight= 0;
let DayIndex=0;

let divstate = "spacerdiv";

const citiesMap = {
    0: ["Cardiff", "Funchal", "Trindade", "Kapstadt"],
    1: ["Oslo", "Cardiff", "Funchal", "Kapstadt"],
    2: ["Oslo", "Cardiff", "Funchal", "Kapstadt"],
    3: ["Oslo", "Cardiff", "Kapstadt", "Melbourne"],
    4: ["Oslo", "Cardiff", "Melbourne", "Lyttelton"],
    5: ["Oslo", "Cardiff", "Lyttelton", "Kerguelen"],
    6: ["Oslo", "Cardiff", "Lyttelton", "Kerguelen"],
    7: ["Oslo", "Cardiff", "Lyttelton", "Kerguelen"],
    8: ["Oslo", "Cardiff", "Lyttelton", "Kerguelen"],
    9: ["Oslo", "Cardiff"],
    100: ["Oslo", "Cardiff", "Funchal", "Trindade", "Kapstadt", "Kerguelen", "Melbourne", "Lyttelton"]
  };