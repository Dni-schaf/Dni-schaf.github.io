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
let activeDiv;
let lastDiv = 100000;

let currenttime;
let korrektur = 0;

let currenttimestamp = 0;

let totalMapHeight= 0;
let DayIndex=0;

let divstate = "spacerdiv";

let dayDivHeightsArray = [];

//VARIABLEN FÜR DIE KARTE

const citiesMap = {
    0: ["Cardiff", "Funchal", "Trindade"],
    1: ["Oslo", "Cardiff", "Funchal", "Trindade", "Kapstadt"],
    2: ["Oslo", "Cardiff", "Funchal", "Trindade", "Kapstadt"],
    3: ["Oslo", "Cardiff", "Funchal", "Trindade", "Kapstadt", "Melbourne"],
    4: ["Oslo", "Cardiff", "Funchal", "Trindade", "Kapstadt", "Melbourne", "Lyttelton"],
    5: ["Oslo", "Cardiff", "Funchal", "Trindade", "Kapstadt", "Melbourne", "Lyttelton", "Kerguelen"],
    6: ["Oslo", "Cardiff", "Funchal", "Trindade", "Kapstadt", "Melbourne", "Lyttelton", "Kerguelen"],
    7: ["Oslo", "Cardiff", "Funchal", "Trindade", "Kapstadt", "Melbourne", "Lyttelton", "Kerguelen"],
    8: ["Oslo", "Cardiff", "Funchal", "Trindade", "Kapstadt", "Melbourne", "Lyttelton", "Kerguelen"],
    9: ["Oslo", "Cardiff", "Funchal", "Trindade", "Kapstadt", "Kerguelen", "Melbourne", "Lyttelton"],
    100: ["Oslo", "Cardiff", "Funchal", "Trindade", "Kapstadt", "Kerguelen", "Melbourne", "Lyttelton"]
};

const oceanLabels = {
  Atlantik: {
    text_de: ["Atlantischer", "Ozean"],
    text_en: ["Atlantic ", "Ocean"],
    text_no: ["Atlanter-", "havet"]
  },
  Pazifik: {
    text_de: ["Pazifischer", "Ozean"],
    text_en: ["Pacific ", "Ocean"],
    text_no: ["Stille-", "havet"]
  },
    Indischerozean: {
    text_de: ["Indischer", "Ozean"],
    text_en: ["Indian ", "Ocean"],
    text_no: ["Det indiske ", "hav"]
  }
};

// Objekt für die Antarktis-Beschriftung in verschiedenen Sprachen
const AntarktisLabel = {
  Antaktis: {
    text_de: "Antarktis",
    text_en: "Antarctica",
    text_no: "Antarktis"
  }
};

// Städte-Daten mit verschiedenen Sprachen und Koordinaten
const cities = {
  "Oslo": { 
    "text_de": "Oslo", 
    "text_en": "Oslo", 
    "text_no": "Oslo", 
    "coordinates": [10.7522, 59.9139], 
    "kind": "city" 
  },
  "Cardiff": { 
    "text_de": "Cardiff", 
    "text_en": "Cardiff", 
    "text_no": "Cardiff", 
    "coordinates": [-3.1791, 51.4816], 
    "kind": "city" 
  },
  "Funchal": { 
    "text_de": "Funchal", 
    "text_en": "Funchal", 
    "text_no": "Funchal", 
    "coordinates": [-16.9186, 32.6669], 
    "kind": "city" 
  },
  "Trindade": { 
    "text_de": "Trindade", 
    "text_en": "Trindade", 
    "text_no": "Trindade", 
    "coordinates": [-29.817, -20.5012], 
    "kind": "city" 
  },
  "Kapstadt": { 
    "text_de": "Kapstadt", 
    "text_en": "Cape Town", 
    "text_no": "Cape Town", 
    "coordinates": [18.4241, -33.9249], 
    "kind": "city" 
  },
  "Kerguelen": { 
    "text_de": "Kerguelen", 
    "text_en": "Kerguelen", 
    "text_no": "Kerguelen", 
    "coordinates": [70.2167, -49.352], 
    "kind": "city" 
  },
  "Melbourne": { 
    "text_de": "Melbourne", 
    "text_en": "Melbourne", 
    "text_no": "Melbourne", 
    "coordinates": [144.9631, -37.8136], 
    "kind": "city" 
  },
  "Lyttelton": { 
    "text_de": "Lyttelton", 
    "text_en": "Lyttelton", 
    "text_no": "Lyttelton", 
    "coordinates": [172.7209, -43.601], 
    "kind": "city" 
  },
  "Aequator": { 
    "text_de": "Äquator", 
    "text_en": "equator", 
    "text_no": "ekvator", 
    "coordinates": [165, 0], 
    "kind": "city" 
  }
};