/********
 * Gestion de la langue
 */

const translations = {
    fr: {
        legend: {
            show: "Afficher la légende",
            hide: "Masquer la légende",
            difficulty: {
                titleDifficulty: "Difficulté",
                veryEasy: "Très facile",
                easy: "Facile",
                medium: "Moyen",
                hard: "Difficile",
                veryHard: "Très difficile"
            },
            gain: {
                titleGain: "Gain",
                veryLittle: "Une mini portion",
                little: "⅛ de tour",
                medium: "¼ de tour",
                aLot: "½ tour",
                reallyALot: "1 tour"
            },
            mode: {
                titleMode: "Modes",
                time: "Time Trial",
                GrandPrix: "Grand Prix",
                Multiplayers: "Multijoueurs",
            }
        },
        size: {
            decrease: "Réduire",
            increase: "Agrandir"
        },
        circuitsData: circuitsDataFR,
        footer: {
            copyright: {
                year: "2025 Les Allumés du Kart. © ",
                company: "Culture Games",
                rights: ". - Tous droits réservés.",
                nintendo: "Les personnages et éléments des jeux de ce site sont les propriétés de la société Nintendo."
            }
        }
    },
    en: {
        legend: {
            show: "Show legend",
            hide: "Hide legend",
            difficulty: {
                titleDifficulty: "Difficulty",
                veryEasy: "Very easy",
                easy: "Easy",
                medium: "Medium",
                hard: "Hard",
                veryHard: "Very hard"
            },
            gain: {
                titleGain: "Gain",
                veryLittle: "A tiny portion",
                little: "⅛ of a lap",
                medium: "¼ of a lap",
                aLot: "½ of a lap",
                reallyALot: "1 lap"
            },
            mode: {
                titleMode: "Modes",
                time: "Time Trial",
                GrandPrix: "Grand Prix",
                Multiplayers: "Multiplayers",
            }
        },
        size: {
            decrease: "Decrease",
            increase: "Increase"
        },
        circuitsData: circuitsDataEN,
        footer: {
            copyright: {
                year: "2025 The Kart Fanatics. © ",
                company: "Culture Games",
                rights: ". - All rights reserved.",
                nintendo: "The characters and elements of the games on this site are the properties of the Nintendo company."
            }
        }
    }
}

class LanguageManager {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.init();
    }

    detectLanguage() {
        // Vérifie d'abord le localStorage
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) return savedLang;

        // Sinon utilise la langue du navigateur
        const browserLang = navigator.language.split('-')[0];
        return translations[browserLang] ? browserLang : 'en';
    }

    init() {
        this.translate();
        this.addLanguageSwitch();
    }

    translate() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = translations[this.currentLang];
            
            for (const k of keys) {
                value = value[k];
            }
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        })
    }

    addLanguageSwitch() {
        const switchHtml = `
            <div class="langSwitch">
                <button class="langBtn fr ${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr">FR</button>
                <button class="langBtn en ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', switchHtml);

        document.querySelectorAll('.langBtn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentLang = btn.dataset.lang;
                localStorage.setItem('preferredLanguage', this.currentLang);
                this.translate();
                
                document.querySelectorAll('.langBtn').forEach(b => {
                    b.classList.toggle('active', b === btn);
                });
            });
        });
    }
}


/********
 * Gestion de la légende
 */

document.addEventListener('DOMContentLoaded', function() {
    const legendToggle = document.querySelector('.legendToggle');
    const legend = document.querySelector('.legend');
    
    legendToggle.addEventListener('click', function() {
        legend.classList.toggle('active');
        legendToggle.classList.toggle('active');
    });
});

/********
 * Gestion de la taille des cartes
 */

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

function updateSize() {
    // Mettre à jour l'indicateur
    const sizeIndicator = document.querySelector('.sizeIndicator');
    sizeIndicator.textContent = sizes[currentSizeIndex].percent;
    
    // Mettre à jour les boutons
    decreaseBtn.disabled = currentSizeIndex === 0;
    increaseBtn.disabled = currentSizeIndex === sizes.length - 1;

    let imagePins = document.querySelectorAll('.imagepin')

    // Mettre à jour la taille des cartes
    imagePins.forEach(pin => {
        // Retirer toutes les classes de taille
        sizes.forEach(size => pin.classList.remove(`size-${size.name}`));
        // Ajouter la classe de taille actuelle
        pin.classList.add(`size-${sizes[currentSizeIndex].name}`);
    });

    syncPinsSize()
}

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

// Fonction pour synchroniser la taille des pins avec l'image
function syncPinsSize() {
    const imagePins = document.querySelectorAll('.imagepin');
    
    imagePins.forEach(container => {
        const img = container.querySelector('.circuitImage');
        const pinsDiv = container.querySelector('.pins');
        
        // Synchronise la taille initiale et les marges
        function updatePinsSize() {
            const rect = img.getBoundingClientRect();
            const computedStyles = window.getComputedStyle(img);
            console.log("rect", rect)
            pinsDiv.style.width = rect.width + 'px';
            pinsDiv.style.height = rect.height + 'px';
            pinsDiv.style.marginLeft = computedStyles.marginLeft;
            pinsDiv.style.marginTop = computedStyles.marginTop;
        }

        // Gérer le chargement initial de l'image
        if (img.complete) {
            updatePinsSize();
        } else {
            img.addEventListener('load', updatePinsSize);
        }
        
        // Crée un ResizeObserver pour surveiller les changements de taille de l'image
        const observer = new ResizeObserver(updatePinsSize);
        observer.observe(img);
        // Observer les changements de style
        const mutationObserver = new MutationObserver(updatePinsSize);
        mutationObserver.observe(img, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    });
}

function renderCircuits() {
    const container = document.getElementById('mapsContainer')
    const currentLang = window.languageManager.currentLang

    //console.log("currentLang", currentLang)
    circuitsData = currentLang === 'fr' ? circuitsDataFR : circuitsDataEN
    container.innerHTML = circuitsData.map((circuit, index) => {
        const circuitTranslation = translations[currentLang].circuitsData[index] || {};
console.log("circuitTranslation", circuitTranslation)
        return `
        <div class="imagepin">
            <h2 class="circuitTitle"><img class="circuitThumbnail" src="public/images/thumbnails/${circuit.thumbnail}" alt="Miniature de${circuit.alt}" data-i18n="circuitsData.${index}.alt"/>${circuit.alt}</h2>
            <img src="public/images/circuits/${circuit.image}" alt="${circuit.alt}" class="circuitImage" />
            <div class="pins">
                ${generatePins(circuit.pins)}
            </div>
        </div>
    `
    }).join('')

    syncPinsSize()
}

function renderPinPopins() {
    // Créer la popin une seule fois
    const popinHTML = `
        <div class="pin-popin" style="display: none;">
            <div class="pin-popin-content">
                <button class="pin-popin-close">Fermer</button>
                <h3 class="pinPopinTitle"></h3>
                <div class="pinPopinVideo"></div>
                <div class="pinPopinInfos">
                    <span class="pinPopinMode"></span>
                    <span class="pinPopinGain stars positive"></span>
                    <span class="pinPopinLevel stars"></span>
                </div>
                <p class="pinPopinDescription"></p>
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
            popinDescription.innerHTML = description;
            popinMode.innerHTML = `<div class="title">Mode</div> ${mode}`;
            popinGain.innerHTML = `<div class="title">Gain</div> ${createStarRating(gain).outerHTML}`;
            popinLevel.innerHTML = `<div class="title">Difficulté</div> ${createStarRating(difficulty).outerHTML}`;
            popinVideo.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video}?si=1234567890" class="videoIframe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
            popin.style.display = 'flex';
        });
    });

    // Fermeture de la popin
    closeButton.addEventListener('click', () => {
        popin.style.display = 'none'
    });

    // Fermeture en cliquant en dehors
    popin.addEventListener('click', (e) => {
        if (e.target === popin) {
            popin.style.display = 'none'
        }
    });
}

function createStarRating(difficulty) {
    const maxStars = 5;
    const starsContainer = document.createElement('div')
    starsContainer.className = 'bar'
    
    for (let i = 1; i <= maxStars; i++) {
        const star = document.createElement('span')
        star.className = `star ${i <= difficulty ? '' : 'starEmpty'}`
        starsContainer.appendChild(star)
    }
    
    return starsContainer;
}


// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager()
    renderCircuits()
    renderPinPopins()
    updateSize()

    document.querySelectorAll('.langBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            renderCircuits()
            renderPinPopins()
            updateSize()
        });
    });

    // Écouteurs d'événements pour la synchronisation des pins
    document.addEventListener('DOMContentLoaded', syncPinsSize);
    window.addEventListener('resize', syncPinsSize);
});