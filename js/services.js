// Scripts pour la page services

document.addEventListener('DOMContentLoaded', function() {
    // Animation des cartes de service au défilement
    animateServicesOnScroll();
    
    // Gestion des liens d'ancrage
    handleAnchorLinks();
    
    // Initialiser le formulaire de contact pré-rempli
    initServiceContactForms();
});

// Animation des services au scroll
function animateServicesOnScroll() {
    const serviceCards = document.querySelectorAll('.service-card');
    const pricingCards = document.querySelectorAll('.pricing-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les cartes de service
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observer les cartes de prix
    pricingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observer les éléments du portfolio
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Gestion des liens d'ancrage
function handleAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialiser les formulaires de contact pré-remplis
function initServiceContactForms() {
    // Récupérer le service depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    const packageType = urlParams.get('package');
    
    // Si on vient d'un lien de service, pré-remplir le formulaire de contact
    if (service || packageType) {
        // Stocker dans sessionStorage pour la page contact
        if (service) {
            sessionStorage.setItem('selectedService', service);
        }
        if (packageType) {
            sessionStorage.setItem('selectedPackage', packageType);
        }
        
        // Rediriger vers contact.html si on n'y est pas déjà
        if (!window.location.pathname.includes('contact.html')) {
            window.location.href = 'contact.html';
        }
    }
}

// Fonction pour ouvrir WhatsApp avec message pré-rempli
function openWhatsApp(serviceName) {
    const phoneNumber = '213675137284';
    let message = `Bonjour, je suis intéressé par le service : ${serviceName}. Pourriez-vous m'en dire plus ?`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// Fonction pour envoyer un email
function sendEmail(subject, body) {
    const email = 'apolo2211@gmail.com';
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    const mailtoURL = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
    
    window.location.href = mailtoURL;
}

// Ajouter des écouteurs d'événements aux boutons de service
document.querySelectorAll('.service-card .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        const serviceName = this.closest('.service-card').querySelector('h3').textContent;
        
        // Option : demander comment contacter
        if (confirm(`Vous souhaitez plus d'informations sur "${serviceName}".\n\nVoulez-vous:\n1) Nous appeler (annuler)\n2) Envoyer un WhatsApp (OK)`)) {
            openWhatsApp(serviceName);
        }
    });
});