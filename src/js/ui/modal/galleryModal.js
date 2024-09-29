import { createModal, closeModal } from './createModal';

export function galleryModal(listing) {
  const mediaArray = listing;

  if (!Array.isArray(mediaArray) || mediaArray.length === 0) {
    return; // Exit if no media is available
  }

  const modalContent = document.createElement('div');
  modalContent.className = 'bg-white p-6 rounded-lg w-full max-w-lg relative z-60';

  const galleryCarousel = document.createElement('div');
  galleryCarousel.className = 'gallery-carousel relative';

  // Loop through mediaArray and create the images
  mediaArray.forEach((img, index) => {
    const imageElement = document.createElement('img');
    imageElement.src = img.url;
    imageElement.alt = img.alt || 'Listing image';
    imageElement.className = `w-full h-80 object-cover mb-2 rounded ${index === 0 ? '' : 'hidden'}`;
    imageElement.id = `galleryImage${index}`;
    galleryCarousel.appendChild(imageElement);
  });

  // Previous button
  const prevButtonContainer = document.createElement('div');
  prevButtonContainer.className = 'absolute inset-y-0 left-0 flex items-center';

  const prevButton = document.createElement('button');
  prevButton.id = 'prevImage';
  prevButton.className = 'bg-gray-600 text-white p-2 rounded-full focus:outline-none';
  prevButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
  prevButtonContainer.appendChild(prevButton);

  // Next button
  const nextButtonContainer = document.createElement('div');
  nextButtonContainer.className = 'absolute inset-y-0 right-0 flex items-center';

  const nextButton = document.createElement('button');
  nextButton.id = 'nextImage';
  nextButton.className = 'bg-gray-600 text-white p-2 rounded-full focus:outline-none';
  nextButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
  nextButtonContainer.appendChild(nextButton);

  // Dots navigation
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'flex justify-center space-x-2 mt-4';

  mediaArray.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = `dot w-3 h-3 rounded-full ${index === 0 ? 'bg-gray-800' : 'bg-gray-400'}`;
    dotsContainer.appendChild(dot);
  });

  galleryCarousel.append(prevButtonContainer, nextButtonContainer, dotsContainer);

  modalContent.appendChild(galleryCarousel);

  // Create the gallery modal with a unique ID
  createModal(modalContent, 'galleryModal');

  let currentImage = 0;
  const totalImages = mediaArray.length;

  function updateGallery(newIndex) {
    for (let i = 0; i < totalImages; i++) {
      document.getElementById(`galleryImage${i}`).classList.toggle('hidden', i !== newIndex);
    }

    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('bg-gray-800', index === newIndex);
      dot.classList.toggle('bg-gray-400', index !== newIndex);
    });
  }

  // Handle image navigation
  prevButton.addEventListener('click', () => {
    currentImage = currentImage === 0 ? totalImages - 1 : currentImage - 1;
    updateGallery(currentImage);
  });

  nextButton.addEventListener('click', () => {
    currentImage = currentImage === totalImages - 1 ? 0 : currentImage + 1;
    updateGallery(currentImage);
  });

  // Close only the gallery modal when clicking outside of the content
  const galleryModal = document.getElementById('galleryModal');
  galleryModal.addEventListener('click', (e) => {
    if (e.target.id === 'galleryModal') {
      closeModal('galleryModal'); // Close only the gallery modal
    }
  });
}
