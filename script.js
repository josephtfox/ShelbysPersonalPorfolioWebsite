const artContainer = document.getElementById('art-container');
let mybutton = document.getElementById("backToTopBtn");

window.onscroll = function() {scrollFunction()};

// Grabs the data from the json document and runs createArtFunction
fetch('gallery-data.json')
    .then(response => response.json())
    .then(artPieces => {
        artPieces.forEach(art => {
            artContainer.appendChild(createArtPiece(art));
        });
    })
    .catch(error => console.error('Error:', error));

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// Add this function for the "back to top" button click event
mybutton.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Adds in the Art images
function createArtPiece(art) {
    const artElement = document.createElement('div');
    artElement.classList.add('art-piece');
    artElement.innerHTML = `<img src="images/${art.filename}" alt="${art.title}">`;
    artElement.addEventListener('click', () => expandArtPiece(art));
    return artElement;
}

// Showing the "Art Card" for when the user clicks on the image
function expandArtPiece(art) {
    const expandedView = document.createElement('div');
    expandedView.classList.add('expanded');
    expandedView.innerHTML = `
        <div class="expanded-content">
            <button class="close-button" onclick="this.closest('.expanded').remove()">&times;</button>
            <h2>${art.title}</h2>
            <img src="images/${art.filename}" alt="${art.title}">
            <p>${art.description}</p>
        </div>
    `;
    document.body.appendChild(expandedView);

    // Add animation
    setTimeout(() => {
        expandedView.style.opacity = '1';
    }, 10);

    expandedView.querySelector('.close-button').addEventListener('click', () => {
        expandedView.classList.remove('show');
        setTimeout(() => expandedView.remove(), 300);
    });

    // Trigger reflow and add 'show' class for smooth transition
    expandedView.offsetHeight;
    expandedView.classList.add('show');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});