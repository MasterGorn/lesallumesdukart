
/********
 * Gestion de la légende
 */

document.addEventListener('DOMContentLoaded', function() {
    const legendToggle = document.querySelector('.legendToggle');
    const legend = document.querySelector('.legend');
    
    legendToggle.addEventListener('click', function() {
        legend.classList.toggle('active');
        legendToggle.classList.toggle('active');
        
        // Change le texte du bouton
        const toggleText = legendToggle.querySelector('.toggleText');
        if (legend.classList.contains('active')) {
            toggleText.textContent = 'Masquer la légende';
        } else {
            toggleText.textContent = 'Afficher la légende';
        }
    });
});

/********
 * Gestion de la taille des cartes
 */

document.addEventListener('DOMContentLoaded', function() {
    const sizes = [
        { name: 'xs', width: 300, percent: '60%' },
        { name: 'sm', width: 400, percent: '80%' },
        { name: 'md', width: 500, percent: '100%' },
        { name: 'lg', width: 600, percent: '120%' },
        { name: 'xl', width: 700, percent: '140%' }
    ];
    
    let currentSizeIndex = 2; // Commence à 'md' (100%)
    
    const decreaseBtn = document.querySelector('[data-action="decrease"]');
    const increaseBtn = document.querySelector('[data-action="increase"]');
    const sizeIndicator = document.querySelector('.sizeIndicator');
    const imagePins = document.querySelectorAll('.imagepin');
    
    function updateSize() {
        // Mettre à jour l'indicateur
        sizeIndicator.textContent = sizes[currentSizeIndex].percent;
        
        // Mettre à jour les boutons
        decreaseBtn.disabled = currentSizeIndex === 0;
        increaseBtn.disabled = currentSizeIndex === sizes.length - 1;
        
        // Mettre à jour la taille des cartes
        imagePins.forEach(pin => {
            // Retirer toutes les classes de taille
            sizes.forEach(size => pin.classList.remove(`size-${size.name}`));
            // Ajouter la classe de taille actuelle
            pin.classList.add(`size-${sizes[currentSizeIndex].name}`);
        });
    }
    
    decreaseBtn.addEventListener('click', () => {
        if (currentSizeIndex > 0) {
            currentSizeIndex--;
            updateSize();
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        if (currentSizeIndex < sizes.length - 1) {
            currentSizeIndex++;
            updateSize();
        }
    });
    
    // Initialisation
    updateSize();
});

/********
 * Création des maps avec les points d'intérêts et les popins
 */

function generatePins(pins) {
    return pins.map(pin => {
        const dataAttributes = pin.title ? 
            `data-title="${pin.title}" data-description="${pin.description}" data-video="${pin.video}" data-mode="${pin.mode}" data-gain="${pin.gain}" data-difficulty="${pin.difficulty}"` : '';
        const spanContent = pin.text ? `<span>${pin.text}</span>` : '';
        return `<a href="#" class="pin pin-1 ${pin.type}" style="top: ${pin.top}; left: ${pin.left};" ${dataAttributes}>${spanContent}</a>`;
    }).join('');
}

function renderCircuits() {
    const container = document.getElementById('mapsContainer');
    container.innerHTML = circuitsData.map(circuit => `
        <div class="imagepin">
            <h2 class="circuitTitle"><img class="circuitThumbnail" src="public/images/thumbnails/${circuit.thumbnail}" alt="Miniature de${circuit.alt}" />${circuit.alt}</h2>
            <img src="public/images/circuits/${circuit.image}" alt="${circuit.alt}" />
            <div class="pins">
                ${generatePins(circuit.pins)}
            </div>
        </div>
    `).join('');
}

// Appeler la fonction au chargement
renderCircuits();

function initPinPopins() {
    // Créer la popin une seule fois
    const popinHTML = `
        <div class="pin-popin" style="display: none;">
            <div class="pin-popin-content">
                <h3 class="pinPopinTitle"></h3>
                <div class="pinPopinVideo"></div>
                <div class="pinPopinInfos">
                    <span class="pinPopinMode"></span>
                    <span class="pinPopinGain stars positive"></span>
                    <span class="pinPopinLevel stars"></span>
                    <span class="pinPopinItem"></span>
                </div>
                <p class="pinPopinDescription"></p>
                <button class="pin-popin-close">Fermer</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popinHTML);

    const popin = document.querySelector('.pin-popin');
    const popinTitle = popin.querySelector('.pinPopinTitle');
    const popinVideo = popin.querySelector('.pinPopinVideo');
    const popinMode = popin.querySelector('.pinPopinMode');
    const popinGain = popin.querySelector('.pinPopinGain');
    const popinLevel = popin.querySelector('.pinPopinLevel');
    const popinDescription = popin.querySelector('.pinPopinDescription');
    const closeButton = popin.querySelector('.pin-popin-close');

    // Gestionnaire pour tous les pins
    document.querySelectorAll('.pin').forEach(pin => {
        pin.addEventListener('click', (e) => {
            e.preventDefault();
            const title = pin.dataset.title;
            const description = pin.dataset.description;
            const video = pin.dataset.video;
            const mode = pin.dataset.mode;
            const gain = parseInt(pin.getAttribute('data-gain')) || 0;
            const difficulty = parseInt(pin.getAttribute('data-difficulty')) || 0;
            popinTitle.textContent = title;
            popinDescription.textContent = description;
            popinMode.innerHTML = `<div class="title">Mode</div> ${mode}`;
            popinGain.innerHTML = `<div class="title">Gain</div> ${createStarRating(gain).outerHTML}`;
            popinLevel.innerHTML = `<div class="title">Difficulté</div> ${createStarRating(difficulty).outerHTML}`;
            popinVideo.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video}?si=1234567890" class="videoIframe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
            popin.style.display = 'flex';
        });
    });

    // Fermeture de la popin
    closeButton.addEventListener('click', () => {
        popin.style.display = 'none';
    });

    // Fermeture en cliquant en dehors
    popin.addEventListener('click', (e) => {
        if (e.target === popin) {
            popin.style.display = 'none';
        }
    });
}

function createStarRating(difficulty) {
    const maxStars = 5;
    const starsContainer = document.createElement('div');
    starsContainer.className = 'bar';
    
    for (let i = 1; i <= maxStars; i++) {
        const star = document.createElement('span');
        star.className = `star ${i <= difficulty ? '' : 'starEmpty'}`;
        starsContainer.appendChild(star);
    }
    
    return starsContainer;
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', initPinPopins);
