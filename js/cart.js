// Gestion du panier d'achat
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('ecotech-cart')) || [];
        this.init();
    }
    
    init() {
        // Initialiser les écouteurs d'événements si on est sur la page panier
        if (document.getElementById('cart-page')) {
            this.loadCartItems();
            this.initEventListeners();
        }
    }
    
    // Charger les articles du panier
    loadCartItems() {
        const container = document.getElementById('cart-items');
        const emptyCart = document.getElementById('empty-cart');
        const cartContent = document.getElementById('cart-content');
        
        if (this.items.length === 0) {
            emptyCart.style.display = 'block';
            cartContent.style.display = 'none';
            return;
        }
        
        emptyCart.style.display = 'none';
        cartContent.style.display = 'block';
        
        container.innerHTML = '';
        let total = 0;
        
        this.items.forEach((item, index) => {
            const itemElement = this.createCartItem(item, index);
            container.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        
        // Mettre à jour le total
        document.getElementById('cart-total').textContent = total.toFixed(2);
        document.getElementById('cart-subtotal').textContent = total.toFixed(2);
        
        // Mettre à jour le compteur dans le header
        this.updateHeaderCart();
    }
    
    // Créer un élément d'article du panier
    createCartItem(item, index) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.dataset.index = index;
        
        div.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">${item.price.toFixed(2)}€</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" data-action="decrease">-</button>
                <input type="number" value="${item.quantity}" min="1" max="99" class="quantity-input">
                <button class="quantity-btn" data-action="increase">+</button>
            </div>
            <div class="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}€
            </div>
            <button class="cart-item-remove">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        return div;
    }
    
    // Initialiser les écouteurs d'événements
    initEventListeners() {
        // Gestion des quantités
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quantity-btn')) {
                const btn = e.target.closest('.quantity-btn');
                const action = btn.dataset.action;
                const itemDiv = btn.closest('.cart-item');
                const index = parseInt(itemDiv.dataset.index);
                
                this.updateQuantity(index, action);
            }
            
            // Supprimer un article
            if (e.target.closest('.cart-item-remove')) {
                const btn = e.target.closest('.cart-item-remove');
                const itemDiv = btn.closest('.cart-item');
                const index = parseInt(itemDiv.dataset.index);
                
                this.removeItem(index);
            }
        });
        
        // Champs de quantité manuels
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const input = e.target;
                const value = parseInt(input.value);
                const itemDiv = input.closest('.cart-item');
                const index = parseInt(itemDiv.dataset.index);
                
                if (value >= 1 && value <= 99) {
                    this.items[index].quantity = value;
                    this.saveCart();
                    this.loadCartItems();
                }
            }
        });
        
        // Continuer les achats
        const continueBtn = document.getElementById('continue-shopping');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                window.location.href = 'produits.html';
            });
        }
        
        // Passer à la caisse
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.items.length > 0) {
                    window.location.href = 'checkout.html';
                }
            });
        }
    }
    
    // Mettre à jour la quantité d'un article
    updateQuantity(index, action) {
        if (action === 'increase') {
            this.items[index].quantity += 1;
        } else if (action === 'decrease' && this.items[index].quantity > 1) {
            this.items[index].quantity -= 1;
        }
        
        this.saveCart();
        this.loadCartItems();
    }
    
    // Supprimer un article
    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
        this.loadCartItems();
        
        // Notification
        showNotification('Article supprimé du panier');
    }
    
    // Sauvegarder le panier
    saveCart() {
        localStorage.setItem('ecotech-cart', JSON.stringify(this.items));
        this.updateHeaderCart();
    }
    
    // Mettre à jour le compteur dans le header
    updateHeaderCart() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    // Vider le panier
    clearCart() {
        this.items = [];
        this.saveCart();
        this.loadCartItems();
    }
    
    // Obtenir le total du panier
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    // Obtenir le nombre d'articles
    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Initialiser le panier
let cart;
document.addEventListener('DOMContentLoaded', function() {
    cart = new Cart();
});

// Fonctions globales pour les boutons "Ajouter au panier"
function addToCart(productId) {
    // Cette fonction est déjà définie dans main.js
    // Elle appelle cart.addItem() indirectement via localStorage
    event.stopPropagation();
    
    // Récupérer le panier depuis localStorage
    let cartItems = JSON.parse(localStorage.getItem('ecotech-cart')) || [];
    
    // Trouver le produit (à partir des données globales products)
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Vérifier si le produit est déjà dans le panier
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('ecotech-cart', JSON.stringify(cartItems));
    
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