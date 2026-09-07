document.addEventListener('DOMContentLoaded', () => {
  if (window.hljs) {
    document.querySelectorAll('.article-body pre code[class*="language-"]:not(.language-text)').forEach(block => {
      window.hljs.highlightElement(block);
    });
  }

  document.querySelectorAll('.share-copy').forEach(button => {
    button.addEventListener('click', async () => {
      const url = button.dataset.copyUrl;

      try {
        await navigator.clipboard.writeText(url);
        const icon = button.querySelector('svg');
        button.setAttribute('aria-label', 'Article link copied');
        button.setAttribute('title', 'Article link copied');
        if (icon) icon.setAttribute('data-lucide', 'check');
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          button.setAttribute('aria-label', 'Copy article link');
          button.setAttribute('title', 'Copy article link');
          if (icon) icon.setAttribute('data-lucide', 'link');
          if (window.lucide) window.lucide.createIcons();
        }, 1800);
      } catch (error) {
        button.setAttribute('title', 'Copy failed');
      }
    });
  });

  const copyButtons = document.querySelectorAll('.code-copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const codeBlock = button.closest('.code-block-wrapper').querySelector('code');
      
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          const originalText = button.innerText;
          button.innerText = 'Copied!';
          button.classList.add('copied');
          
          setTimeout(() => {
            button.innerText = originalText;
            button.classList.remove('copied');
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});