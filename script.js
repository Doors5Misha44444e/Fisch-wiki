
const enchantments = [
    { name: "Swift", rarity: "common", desc: "Збільшує швидкість закидання вудки на 10%", chance: "25%" },
    { name: "Lucky", rarity: "uncommon", desc: "Підвищує шанс спіймати рідкісну рибу на 5%", chance: "15%" },
    { name: "Quantum", rarity: "legendary", desc: "Невеликий шанс подвоїти улов", chance: "2%" },
    { name: "Resilient", rarity: "rare", desc: "Вудка має менший шанс зламатися", chance: "8%" },
    { name: "Magnetic", rarity: "uncommon", desc: "Притягує рибу швидше до гачка", chance: "12%" },
    { name: "Fortune", rarity: "epic", desc: "Збільшує кількість монет за рибу на 15%", chance: "5%" },
    { name: "Steady", rarity: "common", desc: "Зменшує хитання вудки при витягуванні", chance: "20%" },
    { name: "Aquatic", rarity: "rare", desc: "Краще працює в глибокій воді", chance: "7%" },
    { name: "Precision", rarity: "uncommon", desc: "Підвищує точність закидання", chance: "14%" },
    { name: "Endurance", rarity: "common", desc: "Збільшує витривалість при боротьбі з рибою", chance: "18%" },
    { name: "Mystic", rarity: "epic", desc: "Шанс знайти магічні предмети", chance: "4%" },
    { name: "Abyssal", rarity: "legendary", desc: "Дозволяє ловити глибоководних істот", chance: "1.5%" },
    { name: "Temporal", rarity: "mythic", desc: "Сповільнює час при критичних моментах", chance: "0.5%" },
    { name: "Celestial", rarity: "mythic", desc: "Притягує небесних риб вночі", chance: "0.3%" },
    { name: "Phantom", rarity: "legendary", desc: "Шанс спіймати примарну рибу", chance: "1.8%" },
    { name: "Thunderstrike", rarity: "epic", desc: "Блискавка оглушує велику рибу", chance: "3.5%" },
    { name: "Frostbite", rarity: "rare", desc: "Заморожує воду навколо гачка", chance: "6%" },
    { name: "Blazing", rarity: "rare", desc: "Вогняний ефект приваблює рідкісну рибу", chance: "5.5%" },
    { name: "Venomous", rarity: "epic", desc: "Отруює рибу для легшого лову", chance: "4.5%" },
    { name: "Ethereal", rarity: "mythic", desc: "Проходить крізь перешкоди під водою", chance: "0.2%" }
];

const exaltedEnchantments = [
    { name: "Divine Luck", rarity: "exalted", desc: "Неймовірно підвищує шанс на легендарний улов. Найбажаніший чар у грі!", chance: "0.01%" },
    { name: "Omega Swift", rarity: "exalted", desc: "Максимальна швидкість усіх дій з вудкою", chance: "0.008%" },
    { name: "Eternal Fortune", rarity: "exalted", desc: "Подвоює всі нагороди назавжди", chance: "0.005%" },
    { name: "Primordial", rarity: "exalted", desc: "Дозволяє ловити древніх істот", chance: "0.007%" },
    { name: "Infinite Quantum", rarity: "exalted", desc: "Кожен улов може множитися нескінченно", chance: "0.003%" }
];


let clickCount = 0;


document.addEventListener('DOMContentLoaded', () => {
    renderEnchantments();
    renderExaltedEnchantments();
    updateStats();
    initSmoothScroll();
    initScrollButton();
    initRelicClick();
    initSearchInput();
    initCardClicks();
});


function renderEnchantments() {
    const grid = document.getElementById('enchantments-grid');
    if (grid) {
        grid.innerHTML = enchantments.map(ench => createEnchantCard(ench)).join('');
    }
}

function renderExaltedEnchantments() {
    const grid = document.getElementById('exalted-grid');
    if (grid) {
        grid.innerHTML = exaltedEnchantments.map(ench => createEnchantCard(ench)).join('');
    }
}

function createEnchantCard(ench) {
    return `
        <div class="enchant-card" data-name="${ench.name.toLowerCase()}">
            <div class="enchant-name">✦ ${ench.name}</div>
            <span class="enchant-rarity rarity-${ench.rarity}">${ench.rarity.toUpperCase()}</span>
            <p class="enchant-desc">${ench.desc}</p>
            <div class="enchant-chance">📊 Шанс випадіння: ${ench.chance}</div>
        </div>
    `;
}


function updateStats() {
    const totalEnchantsEl = document.getElementById('total-enchants');
    const exaltedCountEl = document.getElementById('exalted-count');
    
    if (totalEnchantsEl) {
        totalEnchantsEl.textContent = enchantments.length;
    }
    if (exaltedCountEl) {
        exaltedCountEl.textContent = exaltedEnchantments.length;
    }
}


function initSearchInput() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const allCards = document.querySelectorAll('.enchant-card');
            
            allCards.forEach(card => {
                const name = card.dataset.name;
                if (name.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }
}


function initRelicClick() {
    const relicCard = document.getElementById('merlin-relic');
    if (relicCard) {
        relicCard.addEventListener('click', showRandomEnchant);
    }
}


function showRandomEnchant() {
    clickCount++;
    const clickCounter = document.getElementById('click-counter');
    if (clickCounter) {
        clickCounter.textContent = clickCount;
    }
    
    const allEnchants = [...enchantments, ...exaltedEnchantments];
    const randomEnch = allEnchants[Math.floor(Math.random() * allEnchants.length)];
    
    const display = document.getElementById('random-enchant');
    if (display) {
        display.innerHTML = `
            <div>
                <strong style="color: aqua;">✨ ${randomEnch.name}</strong> 
                <span class="enchant-rarity rarity-${randomEnch.rarity}" style="margin-left: 10px;">${randomEnch.rarity.toUpperCase()}</span>
                <br><small>${randomEnch.desc}</small>
            </div>
        `;
        
     
        display.style.transform = 'scale(1.05)';
        setTimeout(() => {
            display.style.transform = 'scale(1)';
        }, 200);
    }
}


function initSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function initScrollButton() {
    const scrollBtn = document.getElementById('scroll-top');
    
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', scrollToTop);
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


function initCardClicks() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.enchant-card')) {
            clickCount++;
            const clickCounter = document.getElementById('click-counter');
            if (clickCounter) {
                clickCounter.textContent = clickCount;
            }
        }
    });
}
