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

  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();

    const image = event.target.closest('.image-preview-trigger');
    if (image && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openImage(image);
    }

    if (event.target.closest('[data-youtube-id]') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      event.target.closest('[data-youtube-id]').click();
    }
  });

  imageModal.querySelector('.image-modal-close').addEventListener('click', closeModal);

  const videoModal = document.createElement('div');
  videoModal.className = 'video-modal';
  videoModal.setAttribute('role', 'dialog');
  videoModal.setAttribute('aria-modal', 'true');
  videoModal.setAttribute('aria-label', 'Video player');
  videoModal.innerHTML = `
    <div class="video-modal-content">
      <button class="video-modal-close" type="button" aria-label="Close video">&times;</button>
      <iframe title="" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
    </div>
  `;
  document.body.appendChild(videoModal);

  const videoFrame = videoModal.querySelector('iframe');
  const closeVideo = () => {
    videoModal.classList.remove('open');
    videoFrame.src = '';
    document.body.classList.remove('modal-open');
  };

  const openVideo = preview => {
    const origin = window.location.origin.startsWith('http') ? window.location.origin : 'https://clarifypost.dippan.com.np';
    videoFrame.src = `https://www.youtube-nocookie.com/embed/${preview.dataset.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&origin=${encodeURIComponent(origin)}`;
    videoFrame.title = preview.dataset.youtubeTitle || 'YouTube video player';
    videoModal.classList.add('open');
    document.body.classList.add('modal-open');
  };

  document.addEventListener('click', event => {
    const videoPreview = event.target.closest('[data-youtube-id]');
    if (videoPreview) {
      event.preventDefault();
      openVideo(videoPreview);
    }

    if (event.target === videoModal || event.target.closest('.video-modal-close')) {
      closeVideo();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && videoModal.classList.contains('open')) closeVideo();
  });

  videoModal.querySelector('.video-modal-close').addEventListener('click', closeVideo);
});