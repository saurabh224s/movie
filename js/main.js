// =============================================
// MAIN JAVASCRIPT
// All the interactive behavior goes here
// =============================================

// ---- WAIT FOR PAGE TO LOAD ----
document.addEventListener('DOMContentLoaded', function() {
  
  // Run all our setup functions
  setupNavbar();
  renderMovieCards();
  setupScrollAnimations();
  setupHamburgerMenu();
  setup3DCardEffect();
  
  console.log('🎬 CineVerse loaded successfully!');
});


// ---- 1. NAVBAR: Change style on scroll ----
function setupNavbar() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}


// ---- 2. RENDER MOVIE CARDS ----
function renderMovieCards() {
  
  // Render trending movies
  const trendingRow = document.getElementById('trending-row');
  if (trendingRow) {
    moviesData.trending.forEach(function(movie) {
      trendingRow.innerHTML += createMovieCard(movie);
    });
  }
  
  // Render top rated movies
  const topRatedRow = document.getElementById('top-rated-row');
  if (topRatedRow) {
    moviesData.topRated.forEach(function(movie) {
      topRatedRow.innerHTML += createMovieCard(movie);
    });
  }
  
  // Render live channels
  const channelsRow = document.getElementById('channels-row');
  if (channelsRow) {
    moviesData.channels.forEach(function(channel) {
      channelsRow.innerHTML += createChannelCard(channel);
    });
  }
  
  // Add click events to all movie cards
  const allCards = document.querySelectorAll('.movie-card');
  allCards.forEach(function(card) {
    card.addEventListener('click', function() {
      const movieId = this.getAttribute('data-id');
      // Redirect to movie page with ID in URL
      window.location.href = `movie.html?id=${movieId}`;
    });
  });
}


// ---- CREATE MOVIE CARD HTML ----
function createMovieCard(movie) {
  // This function builds the HTML for one movie card
  return `
    <div class="movie-card animate-on-scroll" data-id="${movie.id}">
      <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
      <div class="card-overlay">
        <div class="play-btn">▶</div>
      </div>
      <div class="card-info">
        <div class="card-title">${movie.title}</div>
        <div class="card-meta">
          <span class="card-rating">⭐ ${movie.rating}</span>
          <span>${movie.genre}</span>
        </div>
      </div>
    </div>
  `;
}


// ---- CREATE CHANNEL CARD HTML ----
function createChannelCard(channel) {
  return `
    <div class="channel-card" data-id="${channel.id}">
      ${channel.isLive ? '<span class="live-badge">🔴 LIVE</span>' : ''}
      <div style="text-align:center">
        <div style="font-size:40px">${channel.logo}</div>
        <div style="font-size:14px; margin-top:8px; font-weight:600">
          ${channel.name}
        </div>
        <div style="font-size:11px; color:#aaa">${channel.category}</div>
      </div>
    </div>
  `;
}


// ---- 3. SCROLL ANIMATIONS ----
// Elements animate in when you scroll to them
function setupScrollAnimations() {
  
  // IntersectionObserver watches when elements enter the screen
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Element is visible! Add the class that shows it
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of element is visible
  });
  
  // Watch all elements with this class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(function(el) {
    observer.observe(el);
  });
  
  // Also observe section headers
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(function(header) {
    header.classList.add('animate-on-scroll');
    observer.observe(header);
  });
}


// ---- 4. HAMBURGER MENU (Mobile) ----
function setupHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      
      // Animate hamburger to X shape
      hamburger.classList.toggle('active');
    });
  }
}


// ---- 5. 3D CARD TILT EFFECT ----
function setup3DCardEffect() {
  const cards = document.querySelectorAll('.movie-card');
  
  cards.forEach(function(card) {
    
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (max 10 degrees)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateY(-10px) 
        scale(1.05)
      `;
    });
    
    card.addEventListener('mouseleave', function() {
      // Reset rotation
      card.style.transform = '';
    });
  });
}


// ---- SEARCH FUNCTIONALITY ----
function searchMovies(query) {
  query = query.toLowerCase();
  
  // Search through all movies
  const results = [
    ...moviesData.trending,
    ...moviesData.topRated
  ].filter(function(movie) {
    return (
      movie.title.toLowerCase().includes(query) ||
      movie.genre.toLowerCase().includes(query)
    );
  });
  
  return results;
}


// ---- HELPER: Get URL Parameters ----
// Used to get movie ID from URL like: movie.html?id=1
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
