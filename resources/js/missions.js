var language = sitelanguage;

  const textArray =
  [
      {
          "mission": "cook",
          "de": "Es war so gut wie nichts über den südlichsten Teil der Erde bekannt, ehe der Brite James Cook während seiner zweiten großen Expedition weit nach Süden steuerte, um den geheimnisvollen »Südkontinent« zu finden oder zu beweisen, dass er nicht existiert. Doch wegen einer dicken Eisdecke - dem Packeisgürtel - kamen die zwei Schiffe nicht weiter als bis zum 71° 10 südlichen Breitengrad. Doch eins war klar - der Südpol liegt unter Schnee und Eis.",
          "en": "Almost nothing was known about the southernmost part of the earth before the British James Cook headed far south during his second major expedition to find the mysterious »Southern Continent« or to prove that it did not exist. But because of a thick ice cover - the pack ice belt - the two ships could not get further than 71° 10 degrees south latitude. But one thing was clear - the South Pole is covered by snow and ice.",
          "no": "Nesten ingenting var kjent om den sørligste delen av jorden før briten James Cook dro langt sørover under sin andre store ekspedisjon for å finne det mystiske «sørlige kontinentet» eller bevise at det ikke eksisterte. Men på grunn av et tykt isdekke - pakisbeltet - kunne de to skipene ikke komme lenger enn 71° 10 grader sørlig breddegrad. Men en ting var klart - Sydpolen er dekket av snø og is."
      },
      {
          "mission": "bellinghaus",
          "de": "Der deutschbaltische Fabian Gottlieb von Bellingshausen führte zwei Schiffe während der russische Expedition nach Süden. Sie umsegelten die Antarktis südlicher als Cook zuvor und widerlegten Cooks Annahme, dass es so weit im Süden kein Land gäbe.",
          "en": "The Baltic German Fabian Gottlieb von Bellingshausen led two ships during the Russian expedition south. They circumnavigated Antarctica further south than Cook had before, disproving Cook's assumption that there was no land that far south.",
          "no": "Den baltiske tyskeren Fabian Gottlieb von Bellingshausen ledet to skip under den russiske ekspedisjonen sørover. De omseilte Antarktis lenger sør enn Cook hadde før, og motbeviste Cooks antakelse om at det ikke var noe land så langt sør."
      },
      {
          "mission": "ross",
          "de": "Der Brite James Clark Ross unternahm zwei Expeditionen, um die Geheimnisse des Südkontinents zu lüften. Es gelang ihm mit seinen Segelschiffen HMS Erebus und HMS Terror den Packeisgürtel zu durchbrechen. Nach ihm ist das Rossschelfeis benannt, das er entdeckte. Es wird eine wichtige Rolle für die Entdeckung des Kontinents spielen.",
          "en": "The Briton James Clark Ross undertook two expeditions to uncover the secrets of the southern continent. He managed to break through the pack ice belt with his sailing ships HMS Erebus and HMS Terror. The Ross Ice Shelf, which he discovered, is named after him. It will play an important role in the discovery of the continent.",
          "no": "Briten James Clark Ross foretok to ekspedisjoner for å avdekke hemmelighetene til det sørlige kontinentet. Han klarte å bryte gjennom pakisbeltet med seilskutene HMS Erebus og HMS Terror. Ross Ice Shelf, som han oppdaget, er oppkalt etter ham. Det vil spille en viktig rolle i oppdagelsen av kontinentet."
      },
      {
          "mission": "gerlach",
          "de": "Der Zweiter Offizier dieser belgischen Expedition war der damals noch unbekannte Roald Amundsen. Ebenfalls bekannt werden wird der Schiffsarzt Frederick Cook. Cook wird 1908 behaupten als erster Mensch am Nordpol gewesen zu sein. Der Belgier Adrien de Gerlache überwinterte mit seiner Expedition in ihrem Schiff Belgica südlicher als je jemand zuvor.",
          "en": "The second officer of this Belgian expedition was Roald Amundsen, who was still unknown at the time. The ship's doctor Frederick Cook will also be known. In 1908 Cook will claim to have been the first person to be at the North Pole. The Belgian Adrien de Gerlache wintered further south with his expedition in their ship Belgica than anyone had ever done before.",
          "no": "Den andre offiseren for denne belgiske ekspedisjonen var Roald Amundsen, som fortsatt var ukjent på den tiden. Skipslegen Frederick Cook vil også være kjent. I 1908 vil Cook hevde å ha vært den første personen som var på Nordpolen. Belgieren Adrien de Gerlache overvintret lenger sør med sin ekspedisjon i deres skip Belgica enn noen noen gang hadde gjort før."
      },
      {
          "mission": "borchgrevink",
          "de": "Offiziell wurde diese Expedition als britische Expedition bezeichnet, geleitet wurde sie jedoch vom Norweger Carsten Egeberg Borchgrevink. Es war die erste Expedition, bei der Teilnehmer auf dem antarktischen Festland überwinterten. Weitere Pionierleistungen waren das erstmalige Betreten des Ross-Schelfeises sowie der Gebrauch von Hunden und Schlitten als Transportmittel in der Antarktis. Es war der Beginn des goldenen Zeitalters der Antarktisforschung.",
          "en": "Officially this expedition was called a British expedition, but it was led by the Norwegian Carsten Egeberg Borchgrevink. It was the first expedition in which participants wintered on the Antarctic mainland. Other pioneering achievements included setting foot on the Ross Ice Shelf for the first time and using dogs and sleds as a means of transport in Antarctica. It was the beginning of the golden age of Antarctic exploration.Borchgrevinks-expedition",
          "no": "Offisielt ble denne ekspedisjonen kalt en britisk ekspedisjon, men den ble ledet av nordmannen Carsten Egeberg Borchgrevink. Det var den første ekspedisjonen der deltakerne overvintret på det antarktiske fastlandet. Andre banebrytende prestasjoner inkluderte å sette foten på Ross Ice Shelf for første gang og bruke hunder og sleder som transportmiddel i Antarktis. Det var begynnelsen på gullalderen for utforskning av Antarktis.Borchgrevinks-ekspedisjon"
      },
      {
          "mission": "scott",
          "de": "Bereits diese britische Expedition wurde von Robert Falcon Scott geleitet. Sie verbrachten zwei Winter auf dem eingefrorenen Forschungsschiff Discovery. Neben vielen Experimenten stellten Scott und seine zwei Begleiter Shackleton und Watson einen neuen Rekord bei der Annäherung an den Südpol auf.",
          "en": "Bereits diese Britischen Expedition wurde von Robert Falcon Scott led. Sie spent two winters auf dem eingefrorenen Forschungsschiff Discovery. Besides many experiments, Scott and his two companions, Shackleton and Watson, set a new record in approaching the South Pole.",
          "no": "Denne britiske ekspedisjonen ble allerede ledet av Robert Falcon Scott. De tilbrakte to vintre på det frosne forskningsskipet Discovery. Blant mange eksperimenter satte Scott og hans to følgesvenner, Shackleton og Watson, ny rekord når de nærmet seg Sydpolen."
      },
      {
          "mission": "shackleton",
          "de": "Ernest Shackleton leitete nach der Expedition mit Scott seine eigene Expedition. Er überwinterte mit seinem Team in einer kleinen Hütte. Shackleton erreichte mit drei Kameraden fast den Südpol. Bei 88° 23' S - etwa 180 km vom Pol entfernt - mussten sie umdrehen. Doch sie entdeckten unter anderem den Beardmore-Gletscher - den Weg, der die Briten zum Südpol bringen sollte. Ein weiterer Erfolg war das Erreichen des magnetischen Südpols.",
          "en": "Ernest Shackleton led nach der Expedition mit Scott his own Expedition. Is overwintered with his team in an einer kleinen Hütte. Shackleton erreichte mit drei Kamaraden fast den Südpol. Bei 88° 23' S - about 180 km from the Pole entfernt - mussten sie umdrehen. Doch sie entdeckten unter anderem the Beardmore Glacier - the Way that the Britons were supposed to bring to the South Pole. A further success was the achievement of the magnetic Südpol.",
          "no": "Ernest Shackleton ledet sin egen ekspedisjon med Scott etter ekspedisjonen. Han og teamet hans tilbrakte vinteren i en liten hytte. Shackleton nådde nesten Sydpolen med tre kamerater. Ved 88° 23' S - ca 180 km fra polet - måtte de snu. Men den ødelegger også blant annet Beardmore-breen - stien som skulle ta britene til Sydpolen. En annen suksess var å nå den magnetiske sørpolen."
      },
  ];
  
  var dateArray = {
    cook: "1772-1775",
    bellinghaus: "1820-21",
    ross: "1840-41 und 1841-43",
    gerlach: "1897-1899",
    borchgrevink: "1898-1900",
    scott: "1901-1904",
    shackleton: "1907-1909"
  };

  const nameArray =
[
    {
        "mission": "cook",
        "de": "Cook-Expedition",
        "en": "Cook-expedition",
        "no": "Cook-ekspedisjon"
    },
    {
        "mission": "bellinghaus",
        "de": "Bellinghaus-Expedition",
        "en": "Bellinghaus-expedition",
        "no": "Bellinghaus-ekspedisjon"
    },
    {
        "mission": "ross",
        "de": "Ross-Expedition",
        "en": "Ross-expedition",
        "no": "Ross-ekspedisjon"
    },
    {
        "mission": "gerlach",
        "de": "De Gerlaches-Expedition",
        "en": "De Gerlaches-expedition",
        "no": "De Gerlaches-ekspedisjon"
    },
    {
        "mission": "borchgrevink",
        "de": "Borchgrevinks-Expedition",
        "en": "Borchgrevinks-expedition",
        "no": "Borchgrevinks-ekspedisjon"
    },
    {
        "mission": "scott",
        "de": "Scotts-Expedition",
        "en": "Scotts-expedition",
        "no": "Scotts-ekspedisjon"
    },
    {
        "mission": "shackleton",
        "de": "Shackletons-Expedition",
        "en": "Shackletons-expedition",
        "no": "Shackletons-ekspedisjon"
    },
];

function changeImage(imageName) {
    console.log (language);
    var svgImage = document.getElementById('svgImage');
    svgImage.src = '../resources/images/' + imageName;
    //png bild aufrufen
    var pngImage = imageName.replace('.svg', '.png')
    var sidebarImage = document.getElementById('sidebarImage');
    sidebarImage.src = '../resources/images/' + pngImage;
    // svgImage.alt = imageName.replace('.svg', '');  Optional: Setze den alternativen Text des Bildes auf den Dateinamen ohne Erweiterung
    //var sidebarText = document.getElementById('sidebarText');
    sidebarDate.textContent = dateArray[imageName.replace('.svg', '')];
    //sidebarH1.textContent = nameArray[imageName.replace('.svg', '')];
    //sidebarText.textContent = textArray[imageName.replace('.svg', '')];

    // Texte aus der Textquelle ziehen
    var missionText = textArray.find(item => item.mission === imageName.replace('.svg', ''));

    // Je nach Sprache den entsprechenden Text auswählen
    var missionTextContent = missionText[language] || missionText['en']; // Fallback auf Englisch, wenn die Sprache nicht gefunden wird

    // Texte in die entsprechenden Sidebar-Elemente einfügen
    var sidebarText = document.getElementById('sidebarText');
    sidebarText.textContent = missionTextContent;

    // Texte aus der Textquelle ziehen
    var missionname = nameArray.find(item => item.mission === imageName.replace('.svg', ''));

    // Je nach Sprache den entsprechenden Text auswählen
    var missionNameContent = missionname[language] || missionname['en']; // Fallback auf Englisch, wenn die Sprache nicht gefunden wird

    // Texte in die entsprechenden Sidebar-Elemente einfügen
    var sidebarText = document.getElementById('sidebarText');
    sidebarH3.textContent = missionNameContent;
};

window.onload = function() {
    changeImage("cook.svg")
    console.log (language);
};


  
 