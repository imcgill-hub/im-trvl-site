(function () {
  const page = document.querySelector('.page');
  const shouldReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!page) return;

  const enter = () => {
    page.classList.add('page-entered');
  };

  requestAnimationFrame(enter);

  if (shouldReduce) return;

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    document.body.classList.add('page-transitioning');
    page.classList.remove('page-entered');
    page.classList.add('page-exit');

    window.setTimeout(() => {
      window.location.href = url.href;
    }, 320);
  });
})();
