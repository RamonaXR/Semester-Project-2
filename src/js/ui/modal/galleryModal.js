import { createModal, closeModal } from './createModal';

export function galleryModal(listing) {
  const mediaArray = listing;
  console.log(listing);
  if (!Array.isArray(mediaArray) || mediaArray.length === 0) {
    console.log('No media found for this listing.');
    return; // Exit if no media is available
  }

  const galleryModalContent = `
  <div class="bg-white p-6 rounded-lg w-full max-w-lg relative z-50">
    

    <div class="gallery-carousel relative">
      ${mediaArray
        .map(
          (img, index) => `
          <img src="${img.url}" alt="${img.alt || 'Listing image'}" 
          class="w-full h-80 object-cover mb-2 rounded ${index === 0 ? '' : 'hidden'}" id="galleryImage${index}">
        `,
        )
        .join('')}

      <div class="absolute inset-y-0 left-0 flex items-center">
        <button id="prevImage" class="bg-gray-600 text-white p-2 rounded-full focus:outline-none">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
      </div>
      
      <div class="absolute inset-y-0 right-0 flex items-center">
        <button id="nextImage" class="bg-gray-600 text-white p-2 rounded-full focus:outline-none">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="flex justify-center space-x-2 mt-4">
        ${mediaArray.map((_, index) => `<span class="dot w-3 h-3 rounded-full ${index === 0 ? 'bg-gray-800' : 'bg-gray-400'}"></span>`).join('')}
      </div>
    </div>
  </div>
`;

  createModal(galleryModalContent);

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

  document.getElementById('prevImage').addEventListener('click', () => {
    currentImage = currentImage === 0 ? totalImages - 1 : currentImage - 1;
    updateGallery(currentImage);
  });

  document.getElementById('nextImage').addEventListener('click', () => {
    currentImage = currentImage === totalImages - 1 ? 0 : currentImage + 1;
    updateGallery(currentImage);
  });

  // Close modal when clicking outside of the content (shadow area)
  const modal = document.getElementById('modal');
  modal.addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
      closeModal(); // Close the modal if click is on the background
    }
  });
}
