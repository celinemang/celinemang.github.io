document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        // Dot follows exactly
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        // Outline follows with slight delay using requestAnimationFrame
        cursorOutline.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Make cursor expand when hovering over links or images
    const hoverables = document.querySelectorAll('a, img');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.backgroundColor = 'rgba(187, 62, 62, 0.05)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '30px';
            cursorOutline.style.height = '30px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // --- Random Emoji Click Animation ---
    // Curated list of minimalist/nature emojis fitting the aesthetic
    const emojis = ['🌿', '🍵', '🍙', '☁️', '🎐', '🪴', '🤍', '🌙', '☕️'];

    document.addEventListener('click', (e) => {
        // Prevent emoji spawning if clicking on a link
        if (e.target.closest('a')) return;

        const emojiEl = document.createElement('span');
        emojiEl.className = 'floating-emoji';
        
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        emojiEl.innerText = randomEmoji;
        
        emojiEl.style.left = `${e.clientX}px`;
        emojiEl.style.top = `${e.clientY}px`;
        
        document.body.appendChild(emojiEl);
        
        setTimeout(() => {
            emojiEl.remove();
        }, 1500); // matches the driftUp animation duration
    });


    // --- Scroll Reveal Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15, // Elements appear when 15% visible
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before the element fully enters
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // --- Parallax Effect on Project Images ---
    const parallaxImages = document.querySelectorAll('.parallax-img img');
    
    window.addEventListener('scroll', () => {
        let scrolled = window.scrollY;
        
        parallaxImages.forEach(img => {
            // Apply slight negative margin top to create a gentle parallax scroll effect
            let rate = scrolled * -0.05;
            img.style.transform = `translate3d(0px, ${rate}px, 0px) scale(1.05)`;
        });
    });

    // --- Stacked Gallery Interaction ---
    const galleries = document.querySelectorAll('.stacked-gallery');
    
    galleries.forEach(gallery => {
        let imgs = Array.from(gallery.querySelectorAll('.gallery-img'));
        let currentIndex = 0;
        
        const updateStack = () => {
            imgs.forEach((img, i) => {
                let offset = (i - currentIndex + imgs.length) % imgs.length;
                img.className = 'gallery-img'; // reset
                
                if (offset === 0) {
                    img.classList.add('stack-0');
                } else if (offset === 1) {
                    img.classList.add('stack-1');
                } else if (offset === 2) {
                    img.classList.add('stack-2');
                } else {
                    img.classList.add('stack-hide');
                }
            });
        };
        
        gallery.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % imgs.length;
            updateStack();
        });
        
        // initialize
        updateStack();
    });

});
