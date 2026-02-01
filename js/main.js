// Données des produits (simulées - en production, viendraient d'une API)
const products = [
    {
        id: 1,
        name: "Chargeur Solaire Portable 20W",
        category: "chargeurs",
        price: 39.99,
        oldPrice: 49.99,
        image: "assets/images/produits/chargeur-solaire.jpg",
        badge: "BESTSELLER",
        description: "Rechargez votre téléphone avec l'énergie du soleil. Autonomie complète en 2 heures d'exposition."
    },
    {
        id: 2,
        name: "Écouteurs Bluetooth en Bambou",
        category: "audio",
        price: 79.99,
        oldPrice: 99.99,
        image: "assets/images/produits/ecouteurs-bambou.jpg",
        badge: "NOUVEAU",
        description: "Écouteurs sans fil avec coques en bambou naturel. Son haute qualité, fabrication durable."
    },
    {
        id: 3,
        name: "Coque iPhone en Algue Recyclée",
        category: "accessoires",
        price: 24.99,
        oldPrice: 29.99,
        image: "assets/images/produits/coque-algue.jpg",
        badge: "ÉCOLO",
        description: "Coque protectrice fabriquée à partir d'algues des océans. Design unique et 100% biodégradable."
    },
    {
        id: 4,
        name: "Lampe Connectée Solaire",
        category: "maison",
        price: 49.99,
        oldPrice: 59.99,
        image: "assets/images/produits/lampe-solaire.jpg",
        badge: "PROMO",
        description: "Lampe d'ambiance rechargeable à l'énergie solaire. Contrôlable via smartphone."
    },
    {
        id: 5,
        name: "Power Bank 10.000mAh Éco",
        category: "chargeurs",
        price: 29.99,
        image: "assets/images/produits/powerbank-eco.jpg",
        description: "Batterie externe avec coque en plastique recyclé. Compatible avec tous les appareils USB."
    },
    {
        id: 6,
        name: "Enceinte Portable en Liège",
        category: "audio",
        price: 89.99,
        image: "assets/images/produits/enceinte-liege.jpg",
        badge: "LIMITED",
        description: "Enceinte Bluetooth avec enveloppe en liège naturel. Son puissant et design unique."
    }
];

// Initialisation du site
document.addEventListener('DOMContentLoaded', function() {
    // Charger les produits phares sur la page d'accueil
    if (document.getElementById('featured-products')) {
        loadFeaturedProducts();
    }
    
    // Gestion du menu mobile
    initMobileMenu();
    
    // Gestion du formulaire newsletter
    initNewsletter();
    
    // Mettre à jour le compteur du panier
    updateCartCount();
});

// Charger les produits phares
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    
    // Sélectionner 4 produits au hasard (ou les 4 premiers)
    const featured = products.slice(0, 4);
    
    featured.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Créer une carte produit
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    const badge = product.badge ? 
        `<div class="product-badge">${product.badge}</div>` : '';
    
    const oldPrice = product.oldPrice ? 
        `<span class="product-old-price">${product.oldPrice.toFixed(2)}€</span>` : '';
    
    card.innerHTML = `
        <div class="product-image">
            ${badge}
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-content">
            <div class="product-category">${formatCategory(product.category)}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <div class="product-price">
                    ${oldPrice}
                    <span>${product.price.toFixed(2)}€</span>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>
        </div>
    `;
    
    // Rendre la carte cliquable pour voir le détail
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.add-to-cart')) {
            window.location.href = `produit-detail.html?id=${product.id}`;
        }
    });
    
    return card;
}

// Formater le nom de catégorie
function formatCategory(category) {
    const categories = {
        'chargeurs': 'Chargeurs Solaires',
        'audio': 'Audio Écoresponsable',
        'accessoires': 'Accessoires Recyclés',
        'maison': 'Maison Connectée'
    };
    
    return categories[category] || category;
}

// Menu mobile
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            this.innerHTML = nav.style.display === 'flex' ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
        
        // Ajuster le menu sur le redimensionnement
        window.addEventListener('resize', function() {
            if (window.innerWidth > 576) {
                nav.style.display = '';
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Newsletter
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Ici, normalement, on enverrait les données à un serveur
            console.log('Inscription newsletter:', email);
            
            // Message de succès
            alert('Merci ! Vous êtes maintenant inscrit à notre newsletter.');
            this.reset();
        });
    }
}

// Fonction pour ajouter au panier
function addToCart(productId) {
    // Empêcher la propagation de l'événement
    event.stopPropagation();
    
    // Récupérer le panier depuis localStorage
    let cart = JSON.parse(localStorage.getItem('ecotech-cart')) || [];
    
    // Trouver le produit
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Vérifier si le produit est déjà dans le panier
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('ecotech-cart', JSON.stringify(cart));
    
    // Mettre à jour le compteur
    updateCartCount();
    
    // Animation feedback
    const btn = event.target.closest('.add-to-cart');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.backgroundColor = 'var(--success-color)';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-cart-plus"></i>';
            btn.style.backgroundColor = '';
        }, 1000);
    }
    
    // Notification
    showNotification(`${product.name} ajouté au panier !`);
}

// Mettre à jour le compteur du panier
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (!cartCount) return;
    
    const cart = JSON.parse(localStorage.getItem('ecotech-cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Afficher une notification
function showNotification(message) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--success-color);
        color: white;
        padding: 15px 25px;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Ajouter les animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Fonction utilitaire pour récupérer les paramètres d'URL
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        if (pair.length === 2) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }
    
    return params;
}