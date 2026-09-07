document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileNav.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });
  }

  const imageModal = document.createElement('div');
  imageModal.className = 'image-modal';
  imageModal.setAttribute('role', 'dialog');
  imageModal.setAttribute('aria-modal', 'true');
  imageModal.setAttribute('aria-label', 'Image preview');
  imageModal.innerHTML = `
    <button class="image-modal-close" type="button" aria-label="Close image preview">&times;</button>
    <figure class="image-modal-content">
      <img class="image-modal-image" alt="">
      <figcaption class="image-modal-caption"></figcaption>
    </figure>
  `;
  document.body.appendChild(imageModal);

  const modalImage = imageModal.querySelector('.image-modal-image');
  const modalCaption = imageModal.querySelector('.image-modal-caption');
  const closeModal = () => {
    imageModal.classList.remove('open');
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('main img:not(.provider-logo):not(.video-preview img)').forEach(image => {
    if (!image.closest('.share-rail')) {
      image.classList.add('image-preview-trigger');
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `Open larger preview of ${image.alt || 'image'}`);
    }
  });

  const openImage = image => {
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt || '';
    modalCaption.textContent = image.alt || image.title || '';
    imageModal.classList.add('open');
    document.body.classList.add('modal-open');
  };

  document.addEventListener('click', event => {
    const image = event.target.closest('.image-preview-trigger');
    if (image) openImage(image);

    if (event.target === imageModal || event.target.closest('.image-modal-close')) {
      closeModal();
    }

    const videoPreview = event.target.closest('[data-youtube-id]');
    if (videoPreview && !videoPreview.querySelector('iframe')) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoPreview.dataset.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
      iframe.title = videoPreview.dataset.youtubeTitle || 'YouTube video player';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      videoPreview.replaceChildren(iframe);
      videoPreview.classList.add('video-playing');
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();

    const image = event.target.closest('.image-preview-trigger');
    if (image && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openImage(image);
    }

    const videoPreview = event.target.closest('[data-youtube-id]');
    if (videoPreview && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      videoPreview.click();
    }
  });

  imageModal.querySelector('.image-modal-close').addEventListener('click', closeModal);
});