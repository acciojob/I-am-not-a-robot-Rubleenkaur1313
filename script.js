const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
let selectedImages = [];
let identicalImageClass;
let imageContainer = document.getElementById('image-container');
let resetButton = document.getElementById('reset');
let verifyButton = document.getElementById('verify');
let para = document.getElementById('para');

function renderImages() {
    imageContainer.innerHTML = '';
    const randomIndex = Math.floor(Math.random() * images.length);
    identicalImageClass = images[randomIndex];

    const shuffledImages = [...images, identicalImageClass].sort(() => Math.random() - 0.5);

    shuffledImages.forEach((imgClass) => {
        const img = document.createElement('img');
        img.className = imgClass;
        img.src = `https://via.placeholder.com/100?text=${imgClass}`; // Placeholder image
        img.addEventListener('click', handleImageClick);
        imageContainer.appendChild(img);
    });
}

function handleImageClick(event) {
    const clickedClass = event.target.className;

    if (!selectedImages.includes(clickedClass)) {
        selectedImages.push(clickedClass);
        resetButton.style.display = 'block';

        if (selectedImages.length === 2) {
            verifyButton.style.display = 'block';
        }

        if (selectedImages.length > 2) {
            selectedImages = selectedImages.slice(0, 2);
        }
    }

    if (selectedImages.length === 2) {
        verifyButton.style.display = 'block';
    }
}

resetButton.addEventListener('click', () => {
    selectedImages = [];
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.innerText = '';
    renderImages();
});

verifyButton.addEventListener('click', () => {
    const [first, second] = selectedImages;
    if (first === second) {
        para.innerText = 'You are a human. Congratulations!';
    } else {
        para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = 'none';
});

renderImages();
