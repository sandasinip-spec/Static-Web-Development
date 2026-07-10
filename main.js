/*TOAST*/
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}


/*NAV SCROLL*/
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

/*MOBILE MENU*/
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        icon.className = navMenu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
}

/*SCROLL REVEAL*/
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
}

/*CURSOR GLOW*/
const cursorGlow = document.getElementById('glowCursor');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let glowActive = false;
    document.addEventListener('mousemove', (e) => {
        if (!glowActive) {
            cursorGlow.classList.add('active');
            glowActive = true;
        }
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
        glowActive = false;
    });
}

/*SMOOTH SCROLL (same-page anchors only)*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/*INDEX PAGE — FLOATING BEANS*/
const heroDeco = document.getElementById('heroDeco');
if (heroDeco) {
    const beanSVG = `<svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="16" rx="10" ry="15" fill="#C8956C"/><path d="M12 2C12 2 8 12 8 16C8 20 12 30 12 30" stroke="#191919" stroke-width="2" stroke-linecap="round"/></svg>`;
    for (let i = 0; i < 12; i++) {
        const bean = document.createElement('div');
        bean.className = 'bean';
        bean.innerHTML = beanSVG;
        bean.style.left = Math.random() * 100 + '%';
        bean.style.animationDuration = (15 + Math.random() * 25) + 's';
        bean.style.animationDelay = -(Math.random() * 30) + 's';
        bean.style.transform = `scale(${0.5 + Math.random() * 1.2}) rotate(${Math.random() * 360}deg)`;
        heroDeco.appendChild(bean);
    }
}

/*ABOUT PAGE — ANIMATED COUNTERS*/
const statsSection = document.querySelector('.stat');
if (statsSection) {
    function animateCounter(el, target, suffix) {
        const duration = 2000;
        const start = performance.now();
        const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target).toLocaleString() + (suffix || '');
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(document.getElementById('statbeans'), 12000, '+');
                animateCounter(document.getElementById('statcups'), 380000, '+');
                animateCounter(document.getElementById('farms'), 14);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}

/*MENU PAGE — DATA + RENDER*/
const menuGrid = document.getElementById('menuGrid');
if (menuGrid) {
    const menuData = {
        espresso: [
            { name: 'Classic Espresso', desc: 'Rich, full-bodied double shot with a golden crema.', price: '$3.50', img: { src: "images/classicespresso.webp" } },
            { name: 'Oat Milk Latte', desc: 'Silky oat milk steamed to perfection over a double shot.', price: '$5.50', img: { src: "images/oatmilklatte.webp" } },
            { name: 'Cappuccino', desc: 'Equal parts espresso, steamed milk, and velvety foam.', price: '$5.00', img: { src: "images/cappucino.webp" } },
            { name: 'Mocha', desc: 'Espresso meets house-made dark chocolate sauce and steamed milk.', price: '$6.00', img: { src: "images/mocha.webp" } },
            { name: 'Flat White', desc: 'Micro-foamed whole milk over a ristretto shot. Smooth and intense.', price: '$5.25', img: { src: "images/flatwhite.webp" } },
            { name: 'Cortado', desc: 'Equal parts espresso and warm milk for a balanced, small sip.', price: '$4.00', img: { src: "images/cortado.webp" } }
        ],
        poured: [
            { name: 'Ethiopian Yirgacheffe', desc: 'Bright, floral notes with hints of blueberry and jasmine.', price: '$5.00', img: { src: "images/Ethiopian.webp" } },
            { name: 'Colombian Huila', desc: 'Caramel sweetness, medium body, clean citrus finish.', price: '$5.00', img: { src: "images/Colombian.webp" } },
            { name: 'Guatemala Antigua', desc: 'Chocolate and spice with a silky mouthfeel.', price: '$5.00', img: { src: "images/Guatemala.webp" } },
            { name: 'Japanese V60', desc: 'Precise, slow pour method for maximum clarity and nuance.', price: '$6.50', img: { src: "images/Japanese.webp" } }
        ],
        cold: [
            { name: 'Cold Brew', desc: '20-hour steeped, smooth and naturally sweet. Served over ice.', price: '$5.50', img: { src: "images/ColdBrew.webp" } },
            { name: 'Nitro Cold Brew', desc: 'Cold brew infused with nitrogen for a creamy, cascading pour.', price: '$6.50', img: { src: "images/nitroColdBrew.webp" } },
            { name: 'Iced Matcha Latte', desc: 'Ceremonial-grade matcha whisked with oat milk over ice.', price: '$6.00', img: { src: "images/icedmatchalatte.webp" } },
            { name: 'Espresso Tonic', desc: 'Double shot over ice with premium tonic water and citrus.', price: '$6.50', img: { src: "images/espressotonic.webp" } }
        ],
        pastry: [
            { name: 'Butter Croissant', desc: '48-hour laminated dough, baked fresh every morning.', price: '$4.50', img: { src: "images/butter.webp" } },
            { name: 'Almond Danish', desc: 'Flaky pastry filled with frangipane and topped with sliced almonds.', price: '$5.00', img: { src: "images/almond.webp" } },
            { name: 'Banana Walnut Bread', desc: 'Moist, warmly spiced, made with local walnuts.', price: '$4.00', img: { src: "images/banana.webp" } },
            { name: 'Seasonal Scone', desc: 'This month: lemon lavender with clotted cream.', price: '$4.50', img: { src: "images/scone.webp" } }
        ]
    };

    function renderMenu(category) {
        const items = menuData[category];
        menuGrid.innerHTML = '';
        items.forEach((item, i) => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.innerHTML = `
                <div class="menu-card-img">
                   <img src="${item.img.src}" alt="${item.name}">
                </div>
                <div class="menu-card-info">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <div class="menu-card-footer">
                        <span class="menu-price">${item.price}</span>
                        <button class="menu-add" aria-label="Add ${item.name} to order" data-name="${item.name}">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(card);
            setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 80);
        });
        document.querySelectorAll('.menu-add').forEach(btn => {
            btn.addEventListener('click', function () {
                this.classList.toggle('added');
                const icon = this.querySelector('i');
                if (this.classList.contains('added')) {
                    icon.className = 'fa-solid fa-check';
                    showToast(`${this.dataset.name} added to your order`);
                } else {
                    icon.className = 'fa-solid fa-plus';
                }
            });
        });
    }

    renderMenu('espresso');

    document.getElementById('menuTabs').addEventListener('click', (e) => {
        if (!e.target.classList.contains('menu-tab')) return;
        document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        renderMenu(e.target.dataset.category);
    });
}



/*CONTACT.HTML ONLY — CONTACT FORM + FAQ*/
function showContactToast(message) {
    
    var toast = document.getElementById('ctaToast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'ctaToast';
        toast.className = 'cta-toast';
        toast.innerHTML = '<span class="toast-icon">✓</span><span class="toast-msg"></span>';
        document.body.appendChild(toast);
    }
    
    // Update message
    var msgElement = toast.querySelector('.toast-msg') || toast.querySelector('span:last-child');
    if (msgElement) {
        msgElement.textContent = message;
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(function () {
        toast.classList.remove('show');
    }, 3000);
}
var contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('contactName').value;
    showContactToast('Thanks ' + name + '! Your message has been sent.');
    contactForm.reset();

    });
}

//FAQ ACCORDION
var faqItems = document.querySelectorAll('.faq-question');
if (faqItems.length) {
    faqItems.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var currentItem = this.closest('.faq-item');
            // If this item is already open, close it and stop
            if (currentItem.classList.contains('open')) {
                currentItem.classList.remove('open');
                return;
            }
            // Otherwise, close all others and open this one
            document.querySelectorAll('.faq-item').forEach(function (el) {
                el.classList.remove('open');
            });
            currentItem.classList.add('open');
        });
    });
}