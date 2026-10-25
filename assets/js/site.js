// Nav border on scroll, mobile menu, and calm section reveals (skipped when reduced motion is set).
document.documentElement.classList.add('js');

const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-menu a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}

document.getElementById('year').textContent = new Date().getFullYear();

// Hero video: show the poster with one big play button; native controls take over once it plays.
// Without JS the video keeps its native controls.
const heroVideo = document.getElementById('hero-video');
const playBtn = document.querySelector('.video-play');
if (heroVideo && playBtn) {
  heroVideo.controls = false;
  playBtn.hidden = false;
  playBtn.addEventListener('click', () => heroVideo.play());
  heroVideo.addEventListener('play', () => {
    const hadFocus = document.activeElement === playBtn;
    playBtn.hidden = true;
    heroVideo.controls = true;
    if (hadFocus) heroVideo.focus();
  });
  heroVideo.addEventListener('ended', () => { playBtn.hidden = false; heroVideo.controls = false; heroVideo.load(); });
}
