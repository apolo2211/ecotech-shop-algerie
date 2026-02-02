// ==========================================================================
// CATALOGUE PRODUITS - GESTION DES FILTRES ET TRI
// ==========================================================================

// Configuration
const CATALOGUE_CONFIG = {
    itemsPerPage: 9,
    currentPage: 1,
    currentCategory: 'all',
    currentSort: 'default',
    currentPriceRange: [0, 500],
    currentEcoLabels: []
};

// Données des produits (si non déjà dans main.js)
const ALL_PRODUCTS = [
    {
        id: 1,
        name: "Chargeur Solaire Anker 21W",
        category: "chargeurs",
        price: 129.99,
        oldPrice: 159.99,
        image: "assets/images/produits/chargeur-solaire.jpg",
        description: "Chargeur solaire portable Anker PowerPort Solar 21W avec technologie PowerIQ.",
        features: ["21W", "Waterproof IPX4", "2 ports USB"],
        ecoLabels: ["recycled", "solar"],
        stock: 15,
        rating: 4.8,
        reviews: 42
    },
    {
        id: 2,
        name: "Écouteurs Bluetooth Tribit",
        category: "audio",
        price: 59.99,
        oldPrice: 79.99,
        image: "assets/images/produits/ecouteurs-bambou.jpg",
        description: "Écouteurs sans fil Tribit FlyBuds 3 avec boitier en bambou naturel.",
        features: ["Réduction de bruit", "Boitier bambou", "Bluetooth 5.2"],
        ecoLabels: ["recycled", "biodegradable"],
        stock: 8,
        rating: 4.5,
        reviews: 23
    },
    {
        id: 3,
        name: "Coque iPhone Pela",
        category: "accessoires",
        price: 34.99,
        image: "assets/images/produits/coque-algue.jpg",
        description: "Coque biodégradable Pela Case pour iPhone en matériaux compostables.",
        features: ["100% compostable", "Protection chocs", "Design écologique"],
        ecoLabels: ["biodegradable", "recycled"],
        stock: 25,
        rating: 4.7,
        reviews: 56
    },
    {
        id: 4,
        name: "Power Bank RAVPower 10000mAh",
        category: "chargeurs",
        price: 45.99,
        image: "assets/images/produits/powerbank-eco.jpg",
        description: "Batterie externe RAVPower avec coque en plastique recyclé.",
        features: ["10000mAh", "USB-C PD", "Coque recyclée"],
        ecoLabels: ["recycled"],
        stock: 12,
        rating: 4.4,
        reviews: 31
    },
    {
        id: 5,
        name: "Enceinte UE Wonderboom 3",
        category: "audio",
        price: 89.99,
        oldPrice: 109.99,
        image: "assets/images/produits/enceinte-liege.jpg",
        description: "Enceinte Bluetooth Ultimate Ears Wonderboom 3 avec 31% de plastique recyclé.",
        features: ["IP67 waterproof", "14h autonomie", "31% recyclé"],
        ecoLabels: ["recycled"],
        stock: 6,
        rating: 4.9,
        reviews: 47
    },
    {
        id: 6,
        name: "Lampe Solaire Goal Zero",
        category: "maison",
        price: 39.99,
        image: "assets/images/produits/lampe-solaire.jpg",
        description: "Lampe LED Goal Zero Crush Light Chroma rechargeable à l'énergie solaire.",
        features: ["Énergie solaire", "300 lumens", "Portable"],
        ecoLabels: ["solar", "reparable"],
        stock: 18,
        rating: 4.6,
        reviews: 29
    },
    {
        id: 7,
        name: "Chargeur Solaire X-DRAGON 28W",
        category: "chargeurs",
        price: 49.99,
        image: "assets/images/produits/chargeur-solaire2.jpg",
        description: "Chargeur solaire pliable X-DRAGON 28W avec triple sortie USB.",
        features: ["28W haute puissance", "Triple sortie", "Pliable"],
        ecoLabels: ["solar", "recycled"],
        stock: 10,
        rating: 4.3,
        reviews: 18
    },
    {
        id: 8,
        name: "Écouteurs Sony Écologiques",
        category: "audio",
        price: 99.99,
        image: "assets/images/produits/ecouteurs-sony.jpg",
        description: "Écouteurs Sony avec coques en plastique recyclé des océans.",
        features: ["Plastique océan recyclé", "Noise cancelling", "30h autonomie"],
        ecoLabels: ["recycled", "reparable"],
        stock: 7,
        rating: 4.7,
        reviews: 34
    },
    {
        id: 9,
        name: "Support Smartphone en Bois",
        category: "accessoires",
        price: 19.99,
        image: "assets/images/produits/support-bois.jpg",
        description: "Support pour smartphone en bois massif certifié FSC.",
        features: ["Bois certifié FSC", "Design minimaliste", "Universel"],
        ecoLabels: ["biodegradable"],
        stock: 30,
        rating: 4.2,
        reviews: 21
    },
    {
        id: 10,
        name: "Smart Plug Éco-Energie",
        category: "maison",
        price: 29.99,
        image: "assets/images/produits/smart-plug.jpg",
        description: "Prise connectée avec monitoring de consommation énergétique.",
        features: ["Monitoring énergie", "Programmable", "Wi-Fi"],
        ecoLabels: ["recycled", "reparable"],
        stock: 22,
        rating: 4.5,
        reviews: 39
    },
    {
        id: 11,
        name: "Câble USB en Fibre Naturelle",
        category: "accessoires",
        price: 14.99,
        image: "assets/images/produits/cable-fibre.jpg",
        description: "Câble USB-C en fibre de lin naturel avec connecteurs recyclés.",
        features: ["Fibre de lin", "Connecteurs recyclés", "1.8m"],
        ecoLabels: ["biodegradable", "recycled"],
        stock: 45,
        rating: 4.0,
        reviews: 15
    },
    {
        id: 12,
        name: "Station Météo Solaire",
        category: "maison",
        price: 69.99,
        image: "assets/images/produits/station-meteo.jpg",
        description: "Station météo connectée fonctionnant à l'énergie solaire.",
        features: ["Énergie solaire", "5 capteurs", "App mobile"],
        ecoLabels: ["solar", "recycled"],
        stock: 9,
        rating: 4.8,
        reviews: 27
    }
];

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Catalogue - Initialisation');
    
    // Vérifier si on est sur la page catalogue
    if (document.getElementById('productsGrid')) {
        initCatalogue();
    }
});

// ==========================================================================
// FONCTIONS D'INITIALISATION
// ==========================================================================

/**
 * Initialise le catalogue
 */
function initCatalogue() {
    // Récupérer les paramètres d'URL
    loadUrlParams();
    
    // Initialiser les filtres
    initFilters();
    
    // Initialiser le tri
    initSort();
    
    // Initialiser la pagination
    initPagination();
    
    // Afficher les produits
    renderFilteredProducts();
    
    // Mettre à jour les compteurs
    updateProductCount();
    
    console.log('Catalogue initialisé');
}

/**
 * Charge les paramètres depuis l'URL
 */
function loadUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Catégorie
    const category = urlParams.get('category') || urlParams.get('cat');
    if (category) {
        CATALOGUE_CONFIG.currentCategory = category;
        
        // Activer le filtre correspondant
        const filterLink = document.querySelector(`[data-category="${category}"]`);
        if (filterLink) {
            filterLink.classList.add('active');
        }
    }
    
    // Tri
    const sort = urlParams.get('sort');
    if (sort) {
        CATALOGUE_CONFIG.currentSort = sort;
        const sortSelect = document.getElementById('sort');
        if (sortSelect) {
            sortSelect.value = sort;
        }
    }
    
    // Page
    const page = urlParams.get('page');
    if (page) {
        CATALOGUE_CONFIG.currentPage = parseInt(page);
    }
}

/**
 * Initialise les filtres
 */
function initFilters() {
    // Filtres par catégorie
    document.querySelectorAll('.filter-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer l'actif de tous les liens
            document.querySelectorAll('.filter-link').forEach(l => l.classList.remove('active'));
            
            // Activer le lien cliqué
            this.classList.add('active');
            
            // Mettre à jour la catégorie
            CATALOGUE_CONFIG.currentCategory = this.dataset.category;
            CATALOGUE_CONFIG.currentPage = 1;
            
            // Mettre à jour l'URL
            updateUrl();
            
            // Re-rendre les produits
            renderFilteredProducts();
            updateProductCount();
        });
    });
    
    // Filtre par prix
    const priceSlider = document.getElementById('priceRange');
    if (priceSlider) {
        const maxPriceDisplay = document.getElementById('maxPrice');
        
        priceSlider.addEventListener('input', function() {
            CATALOGUE_CONFIG.currentPriceRange[1] = parseInt(this.value);
            
            if (maxPriceDisplay) {
                maxPriceDisplay.textContent = this.value + '€';
            }
            
            CATALOGUE_CONFIG.currentPage = 1;
            renderFilteredProducts();
            updateProductCount();
        });
    }
    
    // Filtres éco-labels
    document.querySelectorAll('input[name="eco-label"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const value = this.value;
            
            if (this.checked) {
                if (!CATALOGUE_CONFIG.currentEcoLabels.includes(value)) {
                    CATALOGUE_CONFIG.currentEcoLabels.push(value);
                }
            } else {
                const index = CATALOGUE_CONFIG.currentEcoLabels.indexOf(value);
                if (index > -1) {
                    CATALOGUE_CONFIG.currentEcoLabels.splice(index, 1);
                }
            }
            
            CATALOGUE_CONFIG.currentPage = 1;
            renderFilteredProducts();
            updateProductCount();
        });
    });
    
    // Bouton réinitialiser
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetFilters();
        });
    }
}

/**
 * Initialise le tri
 */
function initSort() {
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            CATALOGUE_CONFIG.currentSort = this.value;
            CATALOGUE_CONFIG.currentPage = 1;
            
            // Mettre à jour l'URL
            updateUrl();
            
            renderFilteredProducts();
        });
    }
}

/**
 * Initialise la pagination
 */
function initPagination() {
    const prevBtn = document.querySelector('.pagination-btn:first-child');
    const nextBtn = document.querySelector('.pagination-btn:last-child');
    const pagesSpan = document.querySelector('.pagination-pages');
    
    if (prevBtn && nextBtn && pagesSpan) {
        prevBtn.addEventListener('click', function() {
            if (CATALOGUE_CONFIG.currentPage > 1) {
                CATALOGUE_CONFIG.currentPage--;
                updateUrl();
                renderFilteredProducts();
                updatePaginationButtons();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const filteredProducts = getFilteredProducts();
            const totalPages = Math.ceil(filteredProducts.length / CATALOGUE_CONFIG.itemsPerPage);
            
            if (CATALOGUE_CONFIG.currentPage < totalPages) {
                CATALOGUE_CONFIG.currentPage++;
                updateUrl();
                renderFilteredProducts();
                updatePaginationButtons();
            }
        });
    }
}

// ==========================================================================
// FONCTIONS DE FILTRAGE ET TRI
// ==========================================================================

/**
 * Récupère les produits filtrés
 */
function getFilteredProducts() {
    let filtered = [...ALL_PRODUCTS];
    
    // Filtre par catégorie
    if (CATALOGUE_CONFIG.currentCategory !== 'all') {
        filtered = filtered.filter(product => 
            product.category === CATALOGUE_CONFIG.currentCategory
        );
    }
    
    // Filtre par prix
    filtered = filtered.filter(product => 
        product.price >= CATALOGUE_CONFIG.currentPriceRange[0] &&
        product.price <= CATALOGUE_CONFIG.currentPriceRange[1]
    );
    
    // Filtre par éco-labels
    if (CATALOGUE_CONFIG.currentEcoLabels.length > 0) {
        filtered = filtered.filter(product => {
            // Vérifie si le produit a au moins un des labels sélectionnés
            return CATALOGUE_CONFIG.currentEcoLabels.some(label => 
                product.ecoLabels && product.ecoLabels.includes(label)
            );
        });
    }
    
    // Tri
    filtered = sortProducts(filtered, CATALOGUE_CONFIG.currentSort);
    
    return filtered;
}

/**
 * Trie les produits selon le critère sélectionné
 */
function sortProducts(products, sortType) {
    const sorted = [...products];
    
    switch (sortType) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
            
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
            
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
            
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
            
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
            
        default:
            return sorted;
    }
}

// ==========================================================================
// FONCTIONS D'AFFICHAGE
// ==========================================================================

/**
 * Affiche les produits filtrés
 */
function renderFilteredProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    // Récupérer les produits filtrés
    const filteredProducts = getFilteredProducts();
    
    // Calculer la pagination
    const startIndex = (CATALOGUE_CONFIG.currentPage - 1) * CATALOGUE_CONFIG.itemsPerPage;
    const endIndex = startIndex + CATALOGUE_CONFIG.itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Afficher "aucun produit"
    if (paginatedProducts.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>Aucun produit trouvé</h3>
                <p>Essayez de modifier vos critères de recherche</p>
                <button class="btn btn-primary" onclick="resetFilters()">
                    Réinitialiser les filtres
                </button>
            </div>
        `;
        
        // Masquer la pagination
        const pagination = document.querySelector('.pagination');
        if (pagination) {
            pagination.style.display = 'none';
        }
        
        return;
    }
    
    // Afficher les produits
    container.innerHTML = '';
    paginatedProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
    
    // Mettre à jour la pagination
    updatePagination();
}

/**
 * Crée une carte produit pour le catalogue
 */
function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'product-card animate-fade-in';
    div.dataset.id = product.id;
    div.dataset.category = product.category;
    
    const badge = product.oldPrice ? 
        `<div class="product-badge sale">PROMO</div>` : '';
    
    const oldPrice = product.oldPrice ? 
        `<div class="old-price">${formatPrice(product.oldPrice)}</div>` : '';
    
    const ratingStars = createRatingStars(product.rating);
    
    // Éco-labels badges
    const ecoLabelsHTML = product.ecoLabels && product.ecoLabels.length > 0 ? 
        `<div class="eco-labels">
            ${product.ecoLabels.map(label => 
                `<span class="eco-label ${label}">${getEcoLabelText(label)}</span>`
            ).join('')}
        </div>` : '';
    
    div.innerHTML = `
        <div class="product-image">
            ${badge}
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-content">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            
            ${ecoLabelsHTML}
            
            <div class="product-features">
                ${product.features.slice(0, 2).map(feature => 
                    `<li><i class="fas fa-check"></i> ${feature}</li>`
                ).join('')}
            </div>
            
            <div class="product-rating">
                ${ratingStars}
                <span class="rating-count">(${product.reviews})</span>
            </div>
            
            <div class="product-footer">
                <div class="product-price">
                    ${oldPrice}
                    <div class="current-price">${formatPrice(product.price)}</div>
                </div>
                <div class="product-actions">
                    <button class="btn-wishlist" title="Ajouter aux favoris">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="btn-add-cart" title="Ajouter au panier">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Événements
    const addCartBtn = div.querySelector('.btn-add-cart');
    if (addCartBtn) {
        addCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product.id);
        });
    }
    
    const wishlistBtn = div.querySelector('.btn-wishlist');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
        });
    }
    
    div.addEventListener('click', () => {
        window.location.href = `produit-detail.html?id=${product.id}`;
    });
    
    return div;
}

/**
 * Met à jour le compteur de produits
 */
function updateProductCount() {
    const countElement = document.getElementById('productsCount');
    if (!countElement) return;
    
    const filteredProducts = getFilteredProducts();
    countElement.textContent = filteredProducts.length;
}

/**
 * Met à jour la pagination
 */
function updatePagination() {
    const filteredProducts = getFilteredProducts();
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / CATALOGUE_CONFIG.itemsPerPage);
    
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;
    
    // Afficher/masquer la pagination
    pagination.style.display = totalPages > 1 ? 'flex' : 'none';
    
    // Mettre à jour les boutons
    updatePaginationButtons();
    
    // Mettre à jour l'affichage des pages
    const pagesSpan = document.querySelector('.pagination-pages');
    if (pagesSpan) {
        pagesSpan.textContent = `Page ${CATALOGUE_CONFIG.currentPage} sur ${totalPages}`;
    }
}

/**
 * Met à jour l'état des boutons de pagination
 */
function updatePaginationButtons() {
    const filteredProducts = getFilteredProducts();
    const totalPages = Math.ceil(filteredProducts.length / CATALOGUE_CONFIG.itemsPerPage);
    
    const prevBtn = document.querySelector('.pagination-btn:first-child');
    const nextBtn = document.querySelector('.pagination-btn:last-child');
    
    if (prevBtn) {
        prevBtn.disabled = CATALOGUE_CONFIG.currentPage <= 1;
        prevBtn.classList.toggle('disabled', CATALOGUE_CONFIG.currentPage <= 1);
    }
    
    if (nextBtn) {
        nextBtn.disabled = CATALOGUE_CONFIG.currentPage >= totalPages;
        nextBtn.classList.toggle('disabled', CATALOGUE_CONFIG.currentPage >= totalPages);
    }
}

// ==========================================================================
// FONCTIONS UTILITAIRES
// ==========================================================================

/**
 * Réinitialise tous les filtres
 */
function resetFilters() {
    // Réinitialiser la configuration
    CATALOGUE_CONFIG.currentCategory = 'all';
    CATALOGUE_CONFIG.currentSort = 'default';
    CATALOGUE_CONFIG.currentPriceRange = [0, 500];
    CATALOGUE_CONFIG.currentEcoLabels = [];
    CATALOGUE_CONFIG.currentPage = 1;
    
    // Réinitialiser l'interface
    document.querySelectorAll('.filter-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.category === 'all') {
            link.classList.add('active');
        }
    });
    
    const priceSlider = document.getElementById('priceRange');
    if (priceSlider) {
        priceSlider.value = 500;
    }
    
    const maxPriceDisplay = document.getElementById('maxPrice');
    if (maxPriceDisplay) {
        maxPriceDisplay.textContent = '500€';
    }
    
    document.querySelectorAll('input[name="eco-label"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.value = 'default';
    }
    
    // Mettre à jour l'URL
    updateUrl();
    
    // Re-rendre les produits
    renderFilteredProducts();
    updateProductCount();
    
    // Notification
    showNotification('Filtres réinitialisés', 'info');
}

/**
 * Met à jour l'URL avec les paramètres actuels
 */
function updateUrl() {
    const params = new URLSearchParams();
    
    if (CATALOGUE_CONFIG.currentCategory !== 'all') {
        params.set('category', CATALOGUE_CONFIG.currentCategory);
    }
    
    if (CATALOGUE_CONFIG.currentSort !== 'default') {
        params.set('sort', CATALOGUE_CONFIG.currentSort);
    }
    
    if (CATALOGUE_CONFIG.currentPage > 1) {
        params.set('page', CATALOGUE_CONFIG.currentPage);
    }
    
    const newUrl = params.toString() ? `produits.html?${params.toString()}` : 'produits.html';
    
    // Mettre à jour l'URL sans recharger la page
    window.history.replaceState({}, '', newUrl);
}

/**
 * Retourne le texte d'un éco-label
 */
function getEcoLabelText(label) {
    const labels = {
        'recycled': '♻️ Recyclé',
        'biodegradable': '🌱 Biodégradable',
        'solar': '☀️ Solaire',
        'reparable': '🔧 Réparable'
    };
    return labels[label] || label;
}

/**
 * Formate un prix (identique à main.js)
 */
function formatPrice(price) {
    return new Intl.NumberFormat('fr-DZ', {
        style: 'currency',
        currency: 'DZD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price).replace('DZD', 'DA');
}

/**
 * Crée des étoiles de notation (identique à main.js)
 */
function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return `<div class="stars">${stars}</div>`;
}

/**
 * Retourne le nom de la catégorie (identique à main.js)
 */
function getCategoryName(category) {
    const categories = {
        'chargeurs': 'Chargeurs Solaires',
        'audio': 'Audio Écologique',
        'accessoires': 'Accessoires Tech',
        'maison': 'Maison Connectée'
    };
    return categories[category] || category;
}

/**
 * Affiche une notification (identique à main.js)
 */
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Fermer au clic
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutToast 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Fermer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutToast 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ==========================================================================
// FONCTIONS GLOBALES POUR HTML
// ==========================================================================

// Ces fonctions doivent être accessibles depuis les attributs onclick dans le HTML
window.resetFilters = resetFilters;

// Exposer certaines fonctions si besoin
window.updateUrl = updateUrl;

// Si addToCart n'est pas défini dans ce fichier, on le déclare
if (typeof addToCart === 'undefined') {
    window.addToCart = function(productId) {
        console.log('Ajout au panier:', productId);
        showNotification('Produit ajouté au panier', 'success');
    };
}

// Si toggleWishlist n'est pas défini
if (typeof toggleWishlist === 'undefined') {
    window.toggleWishlist = function(productId) {
        console.log('Toggle wishlist:', productId);
        showNotification('Ajouté aux favoris', 'success');
    };
}

// ==========================================================================
// STYLES CSS DYNAMIQUES POUR LE CATALOGUE
// ==========================================================================

// Ajouter des styles spécifiques au catalogue
const catalogueStyles = document.createElement('style');
catalogueStyles.textContent = `
    /* Filtres */
    .filters {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        margin-bottom: 20px;
    }
    
    .filter-group {
        margin-bottom: 25px;
        padding-bottom: 25px;
        border-bottom: 1px solid #eee;
    }
    
    .filter-group:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
    }
    
    .filter-group h3 {
        font-size: 1.1rem;
        margin-bottom: 15px;
        color: #333;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .filter-group h3 i {
        color: #1A936F;
    }
    
    .filter-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .filter-list li {
        margin-bottom: 8px;
    }
    
    .filter-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px;
        color: #555;
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    
    .filter-link:hover {
        background: #f5f5f5;
        color: #1A936F;
        padding-left: 20px;
    }
    
    .filter-link.active {
        background: #1A936F;
        color: white;
        font-weight: 500;
    }
    
    .filter-link .count {
        font-size: 0.85rem;
        color: #888;
        background: #f0f0f0;
        padding: 2px 8px;
        border-radius: 12px;
    }
    
    .filter-link.active .count {
        background: rgba(255,255,255,0.2);
        color: white;
    }
    
    /* Range de prix */
    .price-range {
        padding: 0 10px;
    }
    
    .price-slider {
        width: 100%;
        height: 6px;
        background: #ddd;
        border-radius: 3px;
        outline: none;
        -webkit-appearance: none;
    }
    
    .price-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        background: #1A936F;
        border-radius: 50%;
        cursor: pointer;
    }
    
    .price-values {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        font-size: 0.9rem;
        color: #666;
    }
    
    /* Éco-labels */
    .eco-labels-filter {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        padding: 8px;
        border-radius: 6px;
        transition: background 0.3s ease;
    }
    
    .checkbox-label:hover {
        background: #f5f5f5;
    }
    
    .checkbox-label input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: #1A936F;
    }
    
    /* Header des produits */
    .products-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    .products-count {
        font-size: 1.1rem;
        color: #333;
    }
    
    .products-count span {
        font-weight: 700;
        color: #1A936F;
    }
    
    .sort-by {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .sort-by label {
        font-size: 0.9rem;
        color: #666;
    }
    
    .sort-by select {
        padding: 8px 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: white;
        color: #333;
        font-size: 0.9rem;
        cursor: pointer;
        outline: none;
    }
    
    .sort-by select:focus {
        border-color: #1A936F;
    }
    
    /* Pagination */
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-top: 40px;
        padding: 20px;
    }
    
    .pagination-btn {
        padding: 10px 25px;
        background: #1A936F;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .pagination-btn:hover:not(:disabled) {
        background: #147a5c;
        transform: translateY(-2px);
    }
    
    .pagination-btn:disabled {
        background: #ccc;
        cursor: not-allowed;
        transform: none;
    }
    
    .pagination-pages {
        color: #666;
        font-size: 0.9rem;
    }
    
    /* Aucun produit */
    .no-products {
        text-align: center;
        padding: 60px 20px;
        grid-column: 1 / -1;
    }
    
    .no-products i {
        font-size: 4rem;
        color: #ddd;
        margin-bottom: 20px;
    }
    
    .no-products h3 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 10px;
    }
    
    .no-products p {
        color: #666;
        margin-bottom: 30px;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
    }
    
    /* Éco-labels produits */
    .eco-labels {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin: 10px 0;
    }
    
    .eco-label {
        font-size: 0.7rem;
        padding: 3px 8px;
        border-radius: 12px;
        font-weight: 500;
    }
    
    .eco-label.recycled {
        background: #e3f2fd;
        color: #1976d2;
    }
    
    .eco-label.biodegradable {
        background: #e8f5e9;
        color: #388e3c;
    }
    
    .eco-label.solar {
        background: #fff3e0;
        color: #f57c00;
    }
    
    .eco-label.reparable {
        background: #f3e5f5;
        color: #7b1fa2;
    }
    
    /* Layout catalogue */
    .catalogue-content {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: 30px;
    }
    
    @media (max-width: 992px) {
        .catalogue-content {
            grid-template-columns: 1fr;
        }
        
        .filters {
            margin-bottom: 30px;
        }
        
        .products-header {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
        }
        
        .sort-by {
            justify-content: flex-end;
        }
    }
    
    @media (max-width: 576px) {
        .catalogue-content {
            gap: 20px;
        }
        
        .products-header {
            padding: 15px;
        }
        
        .sort-by {
            flex-direction: column;
            align-items: stretch;
        }
        
        .pagination {
            flex-direction: column;
            gap: 15px;
        }
    }
`;

document.head.appendChild(catalogueStyles);

console.log('Catalogue.js chargé avec succès');