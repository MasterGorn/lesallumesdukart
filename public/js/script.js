/********
 * Gestion du LazyLoader
 */

class LazyLoader {
    constructor() {
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        });
        this.imageObserver = new IntersectionObserver(this.handleImageIntersection.bind(this), {
            rootMargin: '50px'
        });
        this.init();
    }

    init() {
        // Observer les images avec attribut loading="lazy"
        document.querySelectorAll('img.lazy').forEach(img => {
            this.imageObserver.observe(img);
        });

        // Observer les divs avec fond lazy
        document.querySelectorAll('.lazyBackground').forEach(div => {
            this.imageObserver.observe(div);
        });
    }

    handleImageIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                if (element.tagName === 'IMG') {
                    // Charger l'image
                    element.src = element.dataset.src;
                    element.classList.remove('lazy');
                } else {
                    // Charger l'image de fond
                    element.style.backgroundImage = `url(${element.dataset.background})`;
                    element.classList.remove('lazyBackground');
                }
                
                observer.unobserve(element);
            }
        });
    }

    handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                this.loadSectionData(element);
                observer.unobserve(element);
            }
        });
    }
}


/********
 * Gestion du SoundManager
 */

class SoundManager {
    constructor() {
        this.isEnabled = false;
        this.sounds = {
            'mapSecrets': new Audio('public/sounds/bowser.mp3'),
            'tips': new Audio('public/sounds/dk.mp3'),
            'championship': new Audio('public/sounds/wario.mp3'),
            'beta': new Audio('public/sounds/yoshi.mp3')
        };
        this.button = document.querySelector('.soundBtn');
        this.preloadSounds();
        this.init();
    }

    init() {
        // Initialiser le volume à 0 pour tous les sons
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0;
        });

        this.button.addEventListener('click', () => this.toggleSound());
        
        // Charger la préférence utilisateur depuis localStorage
        const savedPreference = localStorage.getItem('soundPreference');
        if (savedPreference === 'on') {
            this.enableSound();
        }
    }

    toggleSound() {
        if (this.isEnabled) {
            this.disableSound();
        } else {
            this.enableSound();
        }
    }

    enableSound() {
        this.isEnabled = true;
        this.button.classList.add('active');
        this.button.innerHTML = `
            <i class="fas fa-volume-up"></i>
        `;
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 1;
        });
        localStorage.setItem('soundPreference', 'on');
    }

    disableSound() {
        this.isEnabled = false;
        this.button.classList.remove('active');
        this.button.innerHTML = `
            <i class="fas fa-volume-mute"></i>
        `;
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0;
        });
        localStorage.setItem('soundPreference', 'off');
    }

    playSound(sectionId) {
        if (this.isEnabled && this.sounds[sectionId]) {
            this.sounds[sectionId].currentTime = 0;
            this.sounds[sectionId].play();
        }
    }

    preloadSounds() {
        Object.values(this.sounds).forEach(sound => {
            sound.load();
        });
    }
}


/********
 * Gestion du parallax
 */

class ParallaxManager {
    constructor() {
        this.karts = document.querySelectorAll('.parallaxLayer');
        this.sections = document.querySelectorAll('.sectionContent');
        this.lastSection = null;
        this.animationTimeout = null;
        this.sectionKartMap = {
            'mapSecrets': 0,  
            'tips': 1,        
            'championship': 2,
            'beta': 3,
        };
        this.soundManager = new SoundManager();
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - windowHeight/3;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                const sectionId = section.id;
                if (this.lastSection !== sectionId) {
                    this.triggerAnimation(sectionId);
                    this.lastSection = sectionId;
                }
            }
        });
    }

    triggerAnimation(sectionId) {
        // Nettoyer l'animation précédente
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
            this.karts.forEach(kart => kart.classList.remove('animate'));
        }

        // Animer uniquement le kart correspondant à la section
        const kartIndex = this.sectionKartMap[sectionId];
        if (kartIndex !== undefined) {
            const kart = this.karts[kartIndex];
            kart.classList.add('animate');

            // Nettoyer l'animation après qu'elle soit terminée
            this.animationTimeout = setTimeout(() => {
                kart.classList.remove('animate');
            }, 3000);
        }

        this.soundManager.playSound(sectionId);
    }
}


/********
 * Gestion de la langue
 */

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
            
            try {
                // Commencer avec l'objet de traduction pour la langue courante
                let value = translations[this.currentLang];
                
                // Parcourir la chaîne de clés de manière sécurisée
                for (const k of keys) {
                    if (value === undefined || value === null) {
                        console.warn(`Translation missing for key: ${key} in language: ${this.currentLang}`);
                        return; // Sortir si on ne trouve pas la traduction
                    }
                    value = value[k];
                }
                
                // Vérifier que la valeur finale est une chaîne
                if (typeof value === 'string') {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = value;
                    } else {
                        element.innerHTML = value;
                    }
                } else {
                    console.warn(`Invalid translation type for key: ${key} in language: ${this.currentLang}`);
                }
            } catch (error) {
                console.warn(`Error translating key: ${key}`, error);
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
    let cupBegin = ''
    let cupClose = ''
    let cupImage = ['intro-mushroom-cup','intro-flower-cup','intro-star-cup','intro-special-cup']
    let indexCup = 0

    circuitsData = currentLang === 'fr' ? circuitsDataFR : circuitsDataEN
    container.innerHTML = circuitsData.map((circuit, index) => {
        const circuitTranslation = translations[currentLang]?.mapSecrets?.circuitsData[index] || {};

        if(index%4 === 0) {
            cupBegin = `<div class="cup">
                    <img src="public/images/design/placeholder.webp" data-src="public/images/circuits/${cupImage[indexCup]}.webp" class="cupImage lazy" alt="image de la coupe de Mario Kart 64" />
                    <img src="public/images/design/placeholder.webp" data-src="public/images/circuits/${cupImage[indexCup]}-mobile.webp" class="cupImage mobile lazy" alt="image de la coupe de Mario Kart 64" />
                <div class="cupContent">`
            indexCup++
        } else {
            cupBegin = ''
        }
        if(index%4 === 3) {
            cupClose = `</div></div>`
        } else {
            cupClose = ''
        }

        return `${cupBegin}
        <div class="imagepin">
            <h2 class="circuitTitle"><img class="circuitThumbnail" src="public/images/thumbnails/${circuit.thumbnail}" alt="Miniature de${circuit.alt}" data-i18n="circuitsData.${index}.alt"/>${circuit.alt}</h2>
            <img src="public/images/circuits/${circuit.image}" alt="${circuit.alt}" class="circuitImage" />
            <div class="pins">
                ${generatePins(circuit.pins)}
            </div>
        </div>
        ${cupClose}
    `
    }).join('')

    syncPinsSize()
}

function renderPinPopins() {
    // Créer la popin une seule fois
    const popinHTML = `
        <div class="pin-popin" style="display: none;">
            <div class="pin-popin-content">
                <button class="pin-popin-close">ⓧ</button>
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


// Gestion de la navigation
document.addEventListener('DOMContentLoaded', function() {
    const subNavLinks = document.querySelectorAll('.subNavigationLink');
    const sections = document.querySelectorAll('.sectionContent');
    
    // Gestion du scroll et activation des liens
    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100; // Offset pour la navigation
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                subNavLinks.forEach(link => link.classList.remove('active'));
                subNavLinks[index].classList.add('active');
            }
        });
    }
    
    // Écouteur de scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Scroll fluide pour les ancres
    subNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Précharger les ressources critiques
    const criticalResources = [
        'public/images/design/placeholder.webp'
    ]
    criticalResources.forEach(resource => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = resource;
        document.head.appendChild(preloadLink);
    })

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

    const parallaxManager = new ParallaxManager();
    new LazyLoader();
});