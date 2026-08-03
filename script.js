/****************************************************
 * YOUNOUSTRAVEL – Premium Interactions
 ****************************************************/

// ---------- MENU MOBILE ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Fermer le menu au clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}

// ---------- RÉVÉLATION AU SCROLL ----------
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ---------- BARRE DE PROGRESSION DU SCROLL ----------
const progressBar = document.getElementById('scrollProgressBar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ---------- HEADER OMBRE AU SCROLL ----------
const siteHeader = document.getElementById('siteHeader');
if (siteHeader) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    });
}

// ---------- RIPPLE EFFECT SUR LES BOUTONS ----------
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
});

// ---------- GESTION DE LA MODALE DE DEVIS ----------
const openModalBtn = document.getElementById('openDevisModal');
const closeModalBtn = document.getElementById('closeDevisModal');
const devisModal = document.getElementById('devisModal');
const devisForm = document.getElementById('devisForm');

if (openModalBtn && devisModal) {
    // Ouvrir la modale
    openModalBtn.addEventListener('click', () => {
        devisModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Empêche le scroll en arrière-plan
    });

    // Fermer avec le bouton croix
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            devisModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // Fermer en cliquant à l'extérieur de la boîte modale
    devisModal.addEventListener('click', (e) => {
        if (e.target === devisModal) {
            devisModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && devisModal.style.display === 'flex') {
            devisModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Gestion de l'envoi du formulaire (mailto)
    if (devisForm) {
        devisForm.addEventListener('submit', function(e) {
            // On laisse le mailto s'ouvrir normalement, on ferme juste la modale
            // et on affiche un petit message d'information.
            // (Ne pas empêcher l'action par défaut pour que le client mail s'ouvre)
            setTimeout(() => {
                devisModal.style.display = 'none';
                document.body.style.overflow = '';
                alert("Votre demande va être envoyée via votre logiciel de messagerie. Vérifiez les informations avant d'envoyer.");
            }, 100);
        });
    }
}

// ---------- SUPPRESSION DE LA CLASSE PRELOAD (évite un flash) ----------
document.body.classList.remove('preload');