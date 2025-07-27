// Enhanced Art Gallery JavaScript

// Global variables
let currentArtworkIndex = 0;
let filteredArtworks = [];
let allArtworks = [];

// Artwork data
const artworkData = [
    {
        src: 'images/art1.jpg',
        title: 'Wiz',
        description: 'A digital portrait showcasing contemporary character design with bold colors and clean lines. Created using digital painting techniques with focus on lighting and facial expression.',
        category: 'portrait',
        year: '2024',
        medium: 'Digital Portrait'
    },
    {
        src: 'images/art2.jpg',
        title: 'Process Study',
        description: 'A detailed study exploring the digital painting process from initial sketch to final render. This piece demonstrates various brush techniques and color blending methods.',
        category: 'portrait',
        year: '2024',
        medium: 'Digital Painting'
    },
    {
        src: 'images/art3.jpg',
        title: 'Character Design',
        description: 'An original character design exploring modern fashion and personality through digital art. Focus on expressive features and contemporary styling.',
        category: 'character',
        year: '2024',
        medium: 'Digital Illustration'
    },
    {
        src: 'images/art4.jpg',
        title: 'Portrait Study',
        description: 'A refined portrait study focusing on lighting, texture, and emotional expression. Demonstrates advanced digital painting techniques and color theory.',
        category: 'portrait',
        year: '2024',
        medium: 'Digital Art'
    },
    {
        src: 'images/art5.jpg',
        title: 'Digital Inspiration',
        description: 'A conceptual piece exploring the intersection of traditional and digital art forms. Represents the evolution of artistic expression in the digital age.',
        category: 'concept',
        year: '2024',
        medium: 'Concept Art'
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupEventListeners();
    setupIntersectionObserver();
});

// Initialize gallery
function initializeGallery() {
    allArtworks = [...artworkData];
    filteredArtworks = [...allArtworks];
    
    // Add loading animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('loaded');
        }, index * 100);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });

    // Popup controls
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const popup = document.getElementById('popup');

    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    if (prevBtn) prevBtn.addEventListener('click', showPreviousArtwork);
    if (nextBtn) nextBtn.addEventListener('click', showNextArtwork);
    if (popup) popup.addEventListener('click', handlePopupClick);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);

    // Gallery item hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', handleItemHover);
        item.addEventListener('mouseleave', handleItemLeave);
    });
}

// Setup intersection observer for scroll animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => observer.observe(item));
}

// Filter functionality
function handleFilterClick(event) {
    const filterValue = event.target.dataset.filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter artworks
    filterArtworks(filterValue);
}

function filterArtworks(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Update filtered artworks array
    if (category === 'all') {
        filteredArtworks = [...allArtworks];
    } else {
        filteredArtworks = allArtworks.filter(artwork => artwork.category === category);
    }

    // Animate filter transition
    galleryItems.forEach((item, index) => {
        const itemCategory = item.dataset.category;
        
        if (category === 'all' || itemCategory === category) {
            setTimeout(() => {
                item.style.display = 'block';
                item.classList.add('filter-show');
                item.classList.remove('filter-hide');
            }, index * 50);
        } else {
            item.classList.add('filter-hide');
            item.classList.remove('filter-show');
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Popup functionality
function openPopup(src, title, description, category) {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const popupDesc = document.getElementById('popup-desc');

    // Find current artwork index in filtered array
    currentArtworkIndex = filteredArtworks.findIndex(artwork => artwork.src === src);

    // Set popup content
    popupImg.src = src;
    popupImg.alt = title;
    popupTitle.textContent = title;
    popupDesc.textContent = description;

    // Show popup with animation
    popup.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);

    // Update navigation buttons
    updateNavigationButtons();
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 300);
}

function showPreviousArtwork() {
    if (currentArtworkIndex > 0) {
        currentArtworkIndex--;
        updatePopupContent();
    }
}

function showNextArtwork() {
    if (currentArtworkIndex < filteredArtworks.length - 1) {
        currentArtworkIndex++;
        updatePopupContent();
    }
}

function updatePopupContent() {
    const artwork = filteredArtworks[currentArtworkIndex];
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const popupDesc = document.getElementById('popup-desc');

    // Add transition effect
    popupImg.style.opacity = '0';
    
    setTimeout(() => {
        popupImg.src = artwork.src;
        popupImg.alt = artwork.title;
        popupTitle.textContent = artwork.title;
        popupDesc.textContent = artwork.description;
        popupImg.style.opacity = '1';
    }, 150);

    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.style.opacity = currentArtworkIndex > 0 ? '1' : '0.3';
        prevBtn.disabled = currentArtworkIndex === 0;
    }

    if (nextBtn) {
        nextBtn.style.opacity = currentArtworkIndex < filteredArtworks.length - 1 ? '1' : '0.3';
        nextBtn.disabled = currentArtworkIndex === filteredArtworks.length - 1;
    }
}

// Handle popup click (close when clicking outside content)
function handlePopupClick(event) {
    if (event.target.id === 'popup') {
        closePopup();
    }
}

// Keyboard navigation
function handleKeyPress(event) {
    const popup = document.getElementById('popup');
    if (!popup.classList.contains('hidden')) {
        switch(event.key) {
            case 'Escape':
                closePopup();
                break;
            case 'ArrowLeft':
                showPreviousArtwork();
                break;
            case 'ArrowRight':
                showNextArtwork();
                break;
        }
    }
}

// Gallery item hover effects
function handleItemHover(event) {
    const item = event.currentTarget;
    const img = item.querySelector('img');
    
    // Add subtle zoom effect
    if (img) {
        img.style.transform = 'scale(1.05)';
    }
}

function handleItemLeave(event) {
    const item = event.currentTarget;
    const img = item.querySelector('img');
    
    // Reset zoom effect
    if (img) {
        img.style.transform = 'scale(1)';
    }
}

// Social sharing functionality
function shareArtwork() {
    const artwork = filteredArtworks[currentArtworkIndex];
    if (navigator.share) {
        navigator.share({
            title: `${artwork.title} - Digital Art by Alisa`,
            text: artwork.description,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const shareText = `Check out "${artwork.title}" - ${artwork.description} ${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Link copied to clipboard!');
        });
    }
}

// Download functionality (placeholder)
function downloadArtwork() {
    showNotification('Download feature coming soon!');
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 182, 255, 0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        backdrop-filter: blur(10px);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scroll for navigation
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

