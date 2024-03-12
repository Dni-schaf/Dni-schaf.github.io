var textArray = {
    cook: "Es war so gut wie nichts über den südlichsten Teil der Erde bekannt, ehe der Brite James Cook während seiner zweiten großen Expedition weit nach Süden steuerte, um den geheimnisvollen »Südkontinent« zu finden oder zu beweisen, dass er nicht existiert. Doch wegen einer dicken Eisdecke - dem Packeisgürtel - kamen die zwei Schiffe nicht weiter als bis zum 71° 10 südlichen Breitengrad. Doch eins war klar - der Südpol liegt unter Schnee und Eis.",
    bellinghaus: "Der deutschbaltische Fabian Gottlieb von Bellingshausen führte zwei Schiffe während der russische Expedition nach Süden. Sie umsegelten die Antarktis südlicher als Cook zuvor und widerlegten Cooks Annahme, dass es so weit im Süden kein Land gäbe.",
    ross: "Der Brite James Clark Ross unternahm zwei Expeditionen, um die Geheimnisse des Südkontinents zu lüften. Es gelang ihm mit seinen Segelschiffen HMS Erebus und HMS Terror den Packeisgürtel zu durchbrechen. Nach ihm ist das Rossschelfeis benannt, das er entdeckte. Es wird eine wichtige Rolle für die Entdeckung des Kontinents spielen.",
    gerlach: "Der Zweiter Offizier dieser belgischen Expedition war der damals noch unbekannte Roald Amundsen. Ebenfalls bekannt werden wird der Schiffsarzt Frederick Cook. Cook wird 1908 behaupten als erster Mensch am Nordpol gewesen zu sein. Der Belgier Adrien de Gerlache überwinterte mit seiner Expedition in ihrem Schiff Belgica südlicher als je jemand zuvor.",
    borchgrevink: "1898-1900 Borchgrevinks-Expedition Offiziell wurde diese Expedition als britische Expedition bezeichnet, geleitet wurde sie jedoch vom Norweger Carsten Egeberg Borchgrevink. Es war die erste Expedition, bei der Teilnehmer auf dem antarktischen Festland überwinterten. Weitere Pionierleistungen waren das erstmalige Betreten des Ross-Schelfeises sowie der Gebrauch von Hunden und Schlitten als Transportmittel in der Antarktis. Es war der Beginn des goldenen Zeitalters der Antarktisforschung.",
    scott: "Bereits diese britische Expedition wurde von Robert Falcon Scott geleitet. Sie verbrachten zwei Winter auf dem eingefrorenen Forschungsschiff Discovery. Neben vielen Experimenten stellten Scott und seine zwei Begleiter Shackleton und Watson einen neuen Rekord bei der Annäherung an den Südpol auf.",
    shackleton: "Ernest Shackleton leitete nach der Expedition mit Scott seine eigene Expedition. Er überwinterte mit seinem Team in einer kleinen Hütte. Shackleton erreichte mit drei Kameraden fast den Südpol. Bei 88° 23' S - etwa 180 km vom Pol entfernt - mussten sie umdrehen. Doch sie entdeckten unter anderem den Beardmore-Gletscher - den Weg, der die Briten zum Südpol bringen sollte. Ein weiterer Erfolg war das Erreichen des magnetischen Südpols."
  };

  var dateArray = {
    cook: "1772-1775",
    bellinghaus: "1820-21",
    ross: "1840-41 und 1841-43",
    gerlach: "1897-1899",
    borchgrevink: "1898-1900",
    scott: "1901-1904",
    shackleton: "1907-1909"
  };

  var nameArray = {
    cook: "Cook-Expedition",
    bellinghaus: "Bellingshausen-Expedition",
    ross: "Ross-Expeditionen",
    gerlach: "De Gerlaches-Expedition",
    borchgrevink: "Borchgrevinks-Expedition",
    scott: "Discovery-Expedition",
    shackleton: "Nimrod-Expedition"
  };

function changeImage(imageName) {
    var svgImage = document.getElementById('svgImage');
    svgImage.src = '../resources/images/' + imageName;
    //png bild aufrufen
    var pngImage = imageName.replace('.svg', '.png')
    var sidebarImage = document.getElementById('sidebarImage');
    sidebarImage.src = '../resources/images/' + pngImage;
    // svgImage.alt = imageName.replace('.svg', '');  Optional: Setze den alternativen Text des Bildes auf den Dateinamen ohne Erweiterung
    var sidebarText = document.getElementById('sidebarText');
    sidebarDate.textContent = dateArray[imageName.replace('.svg', '')];
    sidebarH1.textContent = nameArray[imageName.replace('.svg', '')];
    sidebarText.textContent = textArray[imageName.replace('.svg', '')];
}

changeImage("cook.svg")

  
 