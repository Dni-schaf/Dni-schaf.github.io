export function showLoader() {
    // Bilder für die Ladeanimation per Preload priorisieren
    const preloadRose1 = document.createElement("link");
    preloadRose1.rel = "preload";
    preloadRose1.href = "../resources/images/rose1.svg";
    preloadRose1.as = "image";
    document.head.appendChild(preloadRose1);

    const preloadRose2 = document.createElement("link");
    preloadRose2.rel = "preload";
    preloadRose2.href = "../resources/images/rose2.svg";
    preloadRose2.as = "image";
    document.head.appendChild(preloadRose2);

    const imgRose1 = new Image();
imgRose1.src = "../resources/images/rose1.svg";

const imgRose2 = new Image();
imgRose2.src = "../resources/images/rose2.svg";

    // CSS-Datei einfügen
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../resources/js/loader.css"; // Falls nötig, Pfad anpassen!
    document.head.appendChild(link);


    // Ladeanimation ins DOM einfügen
    const loaderHTML = `
        <div id="loader-container">
            <div id="windrosebox">
                <div id="windrose"></div>
            </div>
            <div id="progress">0%</div>
        </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", loaderHTML);

    // Ladeanimation starten
    startLoadingAnimation();
}

function startLoadingAnimation() {
    const windrose = document.getElementById('windrose');
    const windrosebox = document.getElementById('windrosebox');
    const progressText = document.getElementById('progress');
    const loaderContainer = document.getElementById('loader-container');

    let rotationDegree = 0;
    let loadingProgress = 0;

    function randomRotation() {
        if (loadingProgress < 99) {
            rotationDegree += (Math.random() * 120 - 60);
            windrose.style.transform = `rotate(${rotationDegree}deg)`;
        } else if (loadingProgress >= 99) {
            windrose.style.transition = "transform 2s ease-out";
            windrose.style.transform = 'rotate(0deg)';
        }
    }

    function updateProgress(percent) {
        loadingProgress = percent;
        progressText.textContent = `${Math.floor(loadingProgress)}%`;
        randomRotation();
    }

    function fadeOutLoader() {
        setTimeout(() => {
            windrose.style.transition = "opacity 1s ease-out";
            windrosebox.style.transition = "opacity 1s ease-out";
            progressText.style.transition = "opacity 1s ease-out";
            loaderContainer.style.transition = "opacity 1s ease-out";

            windrose.style.opacity = 0;
            windrosebox.style.opacity = 0;
            progressText.style.opacity = 0;
            loaderContainer.style.opacity = 0;

            setTimeout(() => {
                loaderContainer.style.display = 'none';
                autoScroll();
            }, 1000);
        }, 500);
    }

    function autoScroll() {
        const scrollStep = 10;
        const scrollInterval = setInterval(() => {
            if (window.scrollY < window.innerHeight / 2) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 16);
    }

    // **Echter Ladefortschritt**
    document.addEventListener("readystatechange", () => {
        if (document.readyState === "interactive") {
            updateProgress(50); // Erste Hälfte geladen
        }
    });

    window.addEventListener("load", () => {
        updateProgress(100); // Komplett geladen
        fadeOutLoader();
    });
}
