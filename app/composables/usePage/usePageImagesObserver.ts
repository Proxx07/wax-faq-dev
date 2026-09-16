import waxLogo from '@/assets/icons/logos/w.svg?url';

export const usePageImagesObserver = () => {
  let observer: IntersectionObserver;

  const imagesContainer = ref<HTMLDivElement>();
  const imagePlaceHolder = `url("${waxLogo}")`;

  const initObserver = () => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.onload = () => {
              img.removeAttribute('loading');
              img.onload = null;
            };
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1,
    });
  };

  const observeImages = async () => {
    if (!observer || !imagesContainer.value) return;
    nextTick(() => {
      const lazyImages = imagesContainer.value?.querySelectorAll('img[loading="lazy"]') || [];
      lazyImages.forEach(img => observer.observe(img));
    });
  };

  onMounted(() => {
    if (!imagesContainer.value) return;
    initObserver();
    observeImages();
  });

  onBeforeUnmount(() => {
    if (observer) observer.disconnect();
  });

  return {
    imagesContainer,
    imagePlaceHolder,
  };
};
