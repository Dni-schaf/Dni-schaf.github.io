// script.js
const draggable = document.getElementById('draggable');
const movingBox = document.getElementById('moving-box');
const imageBox = document.getElementById('imagebox');
const textbox = document.getElementById('textbox');
const triggers = document.querySelectorAll('.trigger');
const svgIcon = document.getElementById('svg-icon');


let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Texte als Objekt definieren
const triggerTexts = {
    trigger1: "Das ist Trigger 1",
    trigger2: "Das ist Trigger 2",
    trigger3: "Das ist Trigger 3"
};

// Funktion wird aufgerufen, wenn das Dragging beginnt
function startDragging(event) {
    isDragging = true;

    svgIcon.src = '../resources/images/icon2.svg';

    const rect = draggable.getBoundingClientRect();

    if (event.type === 'mousedown') {
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
    } else if (event.type === 'touchstart') {
        const touch = event.touches[0];
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
    }

    event.preventDefault();
}

// Funktion wird aufgerufen, wenn das Dragging endet
function stopDragging() {
    isDragging = false;
    svgIcon.src = '../resources/images/icon1.svg';
}

// Funktion zur Überprüfung der Überschneidung
function checkTriggerOverlap(draggableRect, triggerRect) {
    return !(
        draggableRect.right < triggerRect.left ||
        draggableRect.left > triggerRect.right ||
        draggableRect.bottom < triggerRect.top ||
        draggableRect.top > triggerRect.bottom
    );
}

// Funktion wird aufgerufen, wenn die Maus oder der Finger bewegt wird
function drag(event) {
    if (isDragging) {
        let clientX, clientY;

        if (event.type === 'mousemove') {
            clientX = event.clientX;
            clientY = event.clientY;
        } else if (event.type === 'touchmove') {
            const touch = event.touches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        }

        const newLeft = clientX - offsetX;
        const newTop = clientY - offsetY;

        moveElements(newLeft, newTop);

        event.preventDefault();
    }
}

function moveElements(newLeft, newTop) {
        // Begrenzung innerhalb der contentbox
        const contentbox = document.getElementById('contentbox');
        const contentboxRect = contentbox.getBoundingClientRect();
        const draggableRect = draggable.getBoundingClientRect();

        // Überprüfen, ob die Grenzen überschritten werden
        if (newLeft >= 0 && (newLeft + draggableRect.width) <= contentboxRect.width) {
            draggable.style.left = `${newLeft}px`;
            movingBox.style.left = `${newLeft}px`; // Verschiebe das grüne div synchron
            
            // Bewege das imageBox 4 mal schneller gegenläufig
            imageBox.style.left = `-${3.7 * newLeft}px`;
        }
        if (newTop >= 0 && (newTop + draggableRect.height) <= contentboxRect.height) {
            draggable.style.top = `${newTop}px`;
            movingBox.style.top = `${newTop}px`; // Verschiebe das grüne div synchron
            
            // Bewege das imageBox 4 mal schneller gegenläufig
            imageBox.style.top = `-${4.2 * newTop}px`;
        }

        // Überprüfe die Überlappung mit den Triggern
        const draggableRectNew = draggable.getBoundingClientRect();
        let isOverlapping = false; // Flag für Überlappung

        triggers.forEach(trigger => {
            const triggerRect = trigger.getBoundingClientRect();
            if (checkTriggerOverlap(draggableRectNew, triggerRect)) {
                textbox.innerText = triggerTexts[trigger.id] || "";
                isOverlapping = true; // Setze Flag auf true bei Überlappung
            }
        });

        // Zeige oder verstecke die Textbox basierend auf dem Überlappungsstatus
        if (isOverlapping) {
            textbox.style.display = 'block';
        } else {
            textbox.style.display = 'none';
        }

    }


// Initiale Positionierung der Elemente bei Seitenladezeit
window.addEventListener('load', () => {
    // Setze die Startposition auf die Mitte der contentbox
    const contentbox = document.getElementById('contentbox');
    const contentboxRect = contentbox.getBoundingClientRect();
    const initialLeft = (contentboxRect.width - draggable.offsetWidth) / 2;
    const initialTop = (contentboxRect.height - draggable.offsetHeight) / 2;

    moveElements(initialLeft, initialTop);
});

// Event-Listener für Maus-Ereignisse
draggable.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

// Event-Listener für Touch-Ereignisse
draggable.addEventListener('touchstart', startDragging);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', stopDragging);
