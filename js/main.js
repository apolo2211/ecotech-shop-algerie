// ==========================================================================
// ECO TECH SHOP - MAIN JAVASCRIPT
// ==========================================================================

// Configuration
const CONFIG = {
    siteName: "EcoTech Shop Algérie",
    siteUrl: "https://apolo2211.github.io/ecotech-shop-algerie",
    apiUrl: "",
    currency: "DA",
    whatsapp: "+213675137284",
    email: "apolo2211@gmail.com"
};

// Produits réels (à remplacer par une API plus tard)
const PRODUCTS = [
    {
        id: 1,
        name: "Chargeur Solaire Anker 21W",
        slug: "chargeur-solaire-anker-21w",
        category: "chargeurs",
        price: 129.99,
        oldPrice: 159.99,
        image: "assets/images/produits/chargeur-solaire.jpg",
        images: [
            "assets/images/produits/chargeur-solaire-1.jpg",
            "assets/images/produits/chargeur-solaire-2.jpg",
            "assets/images/produits/chargeur-solaire-3.jpg"
        ],
        badge: "BESTSELLER",
        description: "Chargeur solaire portable Anker PowerPort Solar 21W avec technologie PowerIQ. Idéal pour les voyages et le camping.",
        features: [
            "Puissance : 21W",
            "Waterproof IPX4",
            "2 ports USB",
            "Pliable et portable",
            "Garantie 18 mois"
        ],
        specifications: {
            marque: "Anker",
            poids: "350g",
            dimensions: "18.5 x 10 x 2.5 cm",
            capacité: "21W",
            couleur: "Noir"
        },
        stock: 15,
        rating: 4.8,
        reviews: 42,
        tags: ["solaire", "chargeur", "anker", "portable"]
    },
    {
        id: 2,
        name: "Écouteurs Bluetooth Tribit",
        slug: "ecouteurs-bluetooth-tribit",
        category: "audio",
        price: 59.99,
        oldPrice: 79.99,
        image: "assets/images/produits/ecouteurs-bambou.jpg",
        badge: "NOUVEAU",
        description: "Écouteurs sans fil Tribit FlyBuds 3 avec boitier en bambou naturel. Son haute qualité et autonomie de 40h.",
        features: [
            "Réduction de bruit active",
            "Boitier en bambou",
            "Bluetooth 5.2",
            "IPX8 waterproof",
            "Autonomie 40h"
        ],
        stock: 8,
        rating: 4.5,
        reviews: 23,
        tags: ["écouteurs", "bluetooth", "bambou", "audio"]
    },
    {
        id: 3,
        name: "Coque iPhone Pela",
        slug: "coque-iphone-pela",
        category: "accessoires",
        price: 34.99,
        image: "assets/images/produits/coque-algue.jpg",
        badge: "ÉCOLO",
        description: "Coque biodégradable Pela Case pour iPhone. Fabriquée à partir de matériaux compostables et recyclés.",
        features: [
            "100% compostable",
            "Protection chocs MIL-STD-810G",
            "Design écologique",
            "Compatibilité sans fil",
            "Garantie 1 an"
        ],
        stock: 25,
        rating: 4.7,
        reviews: 56,
        tags: ["coque", "iphone", "écologique", "biodégradable"]
    },
    {
        id: 4,
        name: "Power Bank RAVPower 10000mAh",
        slug: "power-bank-ravpower",
        category: "chargeurs",
        price: 45.99,
        image: "assets/images/produits/powerbank-eco.jpg",
        description: "Batterie externe RAVPower avec coque en plastique recyclé. Charge rapide Power Delivery 18W.",
        features: [
            "Capacité 10000mAh",
            "USB-C Power Delivery",
            "Coque recyclée",
            "Double sortie USB",
            "Compact et léger"
        ],
        stock: 12,
        rating: 4.4,
        reviews: 31,
        tags: ["powerbank", "batterie", "recyclé", "usb-c"]
    },
    {
        id: 5,
        name: "Enceinte UE Wonderboom 3",
        slug: "enceinte-ue-wonderboom",
        category: "audio",
        price: 89.99,
        oldPrice: 109.99,
        image: "assets/images/produits/enceinte-liege.jpg",
        badge: "PROMO",
        description: "Enceinte Bluetooth Ultimate Ears Wonderboom 3 avec 31% de plastique recyclé. Son puissant 360°.",
        features: [
            "IP67 waterproof",
            "14h autonomie",
            "31% plastique recyclé",
            "Son 360°",
            "Flotte sur l'eau"
        ],
        stock: 6,
        rating: 4.9,
        reviews: 47,
        tags: ["enceinte", "bluetooth", "waterproof", "recyclé"]
    },
    {
        id: 6,
        name: "Lampe Solaire Goal Zero",
        slug: "lampe-solaire-goal-zero",
        category: "maison",
        price: 39.99,
        image: "assets/images/produits/lampe-solaire.jpg",
        description: "Lampe LED Goal Zero Crush Light Chroma. Rechargeable à l'énergie solaire, parfaite pour camping.",
        features: [
            "Énergie solaire",
            "300 lumens",
            "Portable et légère",
            "5h de charge",
            "4 modes d'éclairage"
        ],
        stock: 18,
        rating: 4.6,
        reviews: 29,
        tags: ["lampe", "solaire", "led", "camping"]
    }
];

// Panier
let cart = JSON.parse(localStorage.getItem('ecotech-cart')) || [];

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log(`${CONFIG.siteName} - Initialisation`);
    
    // Initialiser les composants
    initMobileMenu();
    initCart();
    initNotifications();
    initBackToTop();
    initScrollAnimations();
    initProductGrid();
    initForms();
    initTrustElements();
    
    // Mettre à jour l'affichage
    updateCartDisplay();
    updateTrustBadges();
    
    console.log('Site initialisé avec succès');
});

// ==========================================================================
// FONCTIONS D'INITIALISATION
// ==========================================================================

/**
 * Initialise le menu mobile
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (toggle && navMenu) {
        toggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Fermer en cliquant en dehors
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-toggle')) {
                navMenu.classList.remove('active');
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

/**
 * Initialise le panier
 */
function initCart() {
    // Restaurer le panier depuis localStorage
    updateCartDisplay();
    
    // Écouter les événements d'ajout au panier
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-add-cart')) {
            const productId = parseInt(e.target.closest('.product-card').dataset.id);
            addToCart(productId);
        }
    });
}

/**
 * Initialise les notifications
 */
function initNotifications() {
    const closeBtn = document.querySelector('.close-notification');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            this.closest('.trust-notification').style.display = 'none';
        });
    }
    
    // Notification automatique après 5 secondes
    setTimeout(() => {
        showNotification('🎉 Bienvenue sur EcoTech Shop Algérie !');
    }, 5000);
}

/**
 * Initialise le bouton "Retour en haut"
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialise les animations au scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.reveal-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    }
}

/**
 * Initialise la grille de produits
 */
function initProductGrid() {
    const container = document.getElementById('featuredProducts');
    if (container) {
        renderProducts(PRODUCTS.slice(0, 4), container);
    }
    
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        renderProducts(PRODUCTS, productsGrid);
    }
}

/**
 * Initialise les formulaires
 */
function initForms() {
    // Formulaire newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeNewsletter(email);
        });
    }
    
    // Formulaire contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitContactForm(this);
        });
    }
}

/**
 * Initialise les éléments de confiance
 */
function initTrustElements() {
    updateTrustCounters();
    initProductRatings();
}

// ==========================================================================
// FONCTIONS DU PANIER
// ==========================================================================

/**
 * Ajoute un produit au panier
 */
function addToCart(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartDisplay();
    
    // Animation
    const btn = event?.target?.closest('.btn-add-cart');
    if (btn) {
        btn.classList.add('add-to-cart-animation');
        setTimeout(() => btn.classList.remove('add-to-cart-animation'), 300);
    }
    
    // Notification
    showNotification(`✅ ${product.name} ajouté au panier`);
}

/**
 * Retire un produit du panier
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    showNotification('🗑️ Produit retiré du panier');
}

/**
 * Met à jour la quantité d'un produit
 */
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        saveCart();
        updateCartDisplay();
    }
}

/**
 * Sauvegarde le panier dans localStorage
 */
function saveCart() {
    localStorage.setItem('ecotech-cart', JSON.stringify(cart));
}

/**
 * Calcule le total du panier
 */
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Calcule le nombre d'articles dans le panier
 */
function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Met à jour l'affichage du panier
 */
function updateCartDisplay() {
    // Mettre à jour le compteur
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalCount = getCartCount();
    
    cartCountElements.forEach(el => {
        el.textContent = totalCount;
        el.style.display = totalCount > 0 ? 'flex' : 'none';
    });
    
    // Mettre à jour le total dans le header si présent
    const cartTotalElement = document.querySelector('.cart-total');
    if (cartTotalElement) {
        cartTotalElement.textContent = formatPrice(getCartTotal());
    }
    
    // Si on est sur la page panier, mettre à jour la liste
    if (document.getElementById('cartItems')) {
        renderCartItems();
        updateCartSummary();
    }
}

// ==========================================================================
// FONCTIONS D'AFFICHAGE
// ==========================================================================

/**
 * Affiche une liste de produits
 */
function renderProducts(products, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

/**
 * Crée une carte produit
 */
function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'product-card animate-fade-in';
    div.dataset.id = product.id;
    
    const badge = product.badge ? 
        `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : '';
    
    const oldPrice = product.oldPrice ? 
        `<div class="old-price">${formatPrice(product.oldPrice)}</div>` : '';
    
    const ratingStars = createRatingStars(product.rating);
    
    div.innerHTML = `
        <div class="product-image">
            ${badge}
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-content">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            
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
    div.querySelector('.btn-add-cart').addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product.id);
    });
    
    div.querySelector('.btn-wishlist').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(product.id);
    });
    
    div.addEventListener('click', () => {
        window.location.href = `produit-detail.html?id=${product.id}`;
    });
    
    return div;
}

/**
 * Affiche les articles du panier
 */
function renderCartItems() {
    const container = document.getElementById('cartItems');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Votre panier est vide</h3>
                <p>Ajoutez des produits pour continuer vos achats</p>
                <a href="produits.html" class="btn btn-primary">Découvrir nos produits</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateQuantity(${item.id}, this.value)">
                <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

/**
 * Met à jour le résumé du panier
 */
function updateCartSummary() {
    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 10; // Frais de port gratuits > 100DA
    const total = subtotal + shipping;
    
    document.getElementById('cartSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('cartShipping').textContent = formatPrice(shipping);
    document.getElementById('cartTotal').textContent = formatPrice(total);
}

// ==========================================================================
// FONCTIONS UTILITAIRES
// ==========================================================================

/**
 * Formate un prix
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
 * Affiche une notification
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

/**
 * Crée des étoiles de notation
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
 * Retourne le nom de la catégorie
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
 * Inscription newsletter
 */
function subscribeNewsletter(email) {
    // Simulation d'envoi
    console.log('Inscription newsletter:', email);
    
    // Sauvegarder dans localStorage
    let subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers')) || [];
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
    }
    
    showNotification('✅ Merci pour votre inscription à la newsletter !', 'success');
    
    // Réinitialiser le formulaire
    const form = document.getElementById('newsletterForm');
    if (form) form.reset();
}

/**
 * Soumission formulaire contact
 */
function submitContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validation
    if (!data.name || !data.email || !data.message) {
        showNotification('⚠️ Veuillez remplir tous les champs obligatoires', 'warning');
        return;
    }
    
    // Simulation d'envoi
    console.log('Formulaire contact:', data);
    
    // Sauvegarder dans localStorage
    let contacts = JSON.parse(localStorage.getItem('contact-messages')) || [];
    contacts.push({
        ...data,
        date: new Date().toISOString(),
        ip: 'localhost'
    });
    localStorage.setItem('contact-messages', JSON.stringify(contacts));
    
    showNotification('✅ Votre message a été envoyé avec succès !', 'success');
    form.reset();
}

/**
 * Met à jour les compteurs de confiance
 */
function updateTrustCounters() {
    // Clients satisfaits
    const clientCount = document.getElementById('clientCount');
    if (clientCount) {
        animateCounter(clientCount, 2500, 2000);
    }
    
    // Produits vendus
    const productCount = document.getElementById('productCount');
    if (productCount) {
        animateCounter(productCount, 1500, 2000);
    }
    
    // Avis positifs
    const reviewCount = document.getElementById('reviewCount');
    if (reviewCount) {
        animateCounter(reviewCount, 98, 2000);
    }
}

/**
 * Anime un compteur
 */
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.id === 'reviewCount' ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.id === 'reviewCount' ? '%' : '+');
        }
    }, 16);
}

/**
 * Initialise les notations produits
 */
function initProductRatings() {
    // À implémenter avec des données réelles
}

/**
 * Ajoute/retire des favoris
 */
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        wishlist.push(productId);
        showNotification('❤️ Ajouté aux favoris');
    } else {
        wishlist.splice(index, 1);
        showNotification('💔 Retiré des favoris');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

/**
 * Met à jour les badges de confiance
 */
function updateTrustBadges() {
    const badges = document.querySelectorAll('.trust-badge');
    badges.forEach(badge => {
        badge.classList.add('animate-pulse');
        setTimeout(() => badge.classList.remove('animate-pulse'), 1000);
    });
}

/**
 * Partage sur les réseaux sociaux
 */
function shareOnSocial(platform, url, text) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

/**
 * Vérifie la disponibilité du produit
 */
function checkStock(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return { available: false, message: 'Produit non trouvé' };
    
    if (product.stock > 10) {
        return { available: true, message: 'En stock' };
    } else if (product.stock > 0) {
        return { available: true, message: `Plus que ${product.stock} disponible(s)` };
    } else {
        return { available: false, message: 'Rupture de stock' };
    }
}

// ==========================================================================
// FONCTIONS GLOBALES (accessibles depuis HTML)
// ==========================================================================

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.formatPrice = formatPrice;
window.shareOnSocial = shareOnSocial;

// Initialisation finale
console.log('Scripts chargés avec succès');