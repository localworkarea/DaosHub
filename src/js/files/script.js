// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

gsap.registerPlugin(ScrollTrigger);

const heroSection = document.querySelector('.hero');
const heroMask = document.querySelector('.hero__mask');
const whatSection = document.querySelector('.what');
const imgBlocks = document.querySelectorAll('.img-block__mask');

const communityTxt = document.querySelector('.community__txt');
const communityContainer = document.querySelector('.community__container');

if (heroSection) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: whatSection,
      start: "top bottom",
      end: "center bottom",
      scrub: true,
      // markers: true,
    }
  });
  tl.to(heroMask, {
    opacity: 1,
  });
  tl.to(whatSection, {
    opacity: 1,
  }, "-=0.05");

}

if (communityContainer) {
  gsap.to(communityTxt, {
    opacity: 0,
    scrollTrigger: {
      trigger: communityContainer,
      start: "top bottom",
      end: "top top",
      scrub: true,
    }
  });
}


let breakPoint = 43.811; // 700.98px
let mm = gsap.matchMedia();

mm.add({
  isDesktop: `(min-width: ${breakPoint}em)`,
  isMobile: `(max-width: ${breakPoint}em)`
}, (context) => {

  let {isDesktop, isMobile} = context.conditions;

  if (isDesktop) {
  
  }
  if (isMobile) {
    if (imgBlocks.length > 0) {
      imgBlocks.forEach((imgBlock) => {
        gsap.to(imgBlock, {
          opacity: 0,
          scrollTrigger: {
            trigger: imgBlock,
            start: "top center",
            end: "center center",
            scrub: true,
            // markers: true,
          }
        });
      });
    }
    
  }
});





function smoothScroll(smoothness = 0.08, inertia = 0.85) {
  let scrollPosition = window.pageYOffset;
  let targetPosition = scrollPosition;
  let isScrolling = false;
  let isDraggingScrollbar = false;

  function updateScroll() {
      scrollPosition += (targetPosition - scrollPosition) * smoothness;
      window.scrollTo(0, scrollPosition);

      if (Math.abs(targetPosition - scrollPosition) > 0.5) {
          requestAnimationFrame(updateScroll);
      } else {
          isScrolling = false;
      }
  }

  function startScroll(event) {
      if (!isDraggingScrollbar) {
          targetPosition += event.deltaY * inertia;
          targetPosition = Math.max(0, Math.min(document.body.scrollHeight - window.innerHeight, targetPosition));
          event.preventDefault();

          if (!isScrolling) {
              isScrolling = true;
              requestAnimationFrame(updateScroll);
          }
      }
  }

  function onScroll() {
      if (!isScrolling) {
          scrollPosition = window.pageYOffset;
          targetPosition = scrollPosition;
      }
  }

  function onMouseDown() {
      isDraggingScrollbar = true;
  }

  function onMouseUp() {
      isDraggingScrollbar = false;
      scrollPosition = window.pageYOffset;
      targetPosition = scrollPosition;
  }

  function initSmoothScroll() {
      if (document.body.getAttribute('data-smooth-scroll') === 'true') {
          window.addEventListener('wheel', startScroll, { passive: false });
          window.addEventListener('scroll', onScroll);
          window.addEventListener('mousedown', onMouseDown);
          window.addEventListener('mouseup', onMouseUp);
      } else {
          window.removeEventListener('wheel', startScroll);
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('mousedown', onMouseDown);
          window.removeEventListener('mouseup', onMouseUp);
      }
  }

  const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          if (mutation.attributeName === 'data-smooth-scroll') {
              initSmoothScroll();
          }
      });
  });

  observer.observe(document.body, { attributes: true });

  initSmoothScroll();
}

if (document.body.getAttribute('data-smooth-scroll') === 'true') {
  smoothScroll(0.08, 0.85);
}




  window.addEventListener('orientationchange', () => {
    ScrollTrigger.refresh();
  });
  
  
  let lastWindowWidth = window.innerWidth;
  
  window.addEventListener('resize', () => {
  const currentWindowWidth = window.innerWidth;
  
  // Проверяем, изменилось ли значение ширины
  if (currentWindowWidth !== lastWindowWidth) {
    ScrollTrigger.refresh();
  }
  
  // Обновляем значение ширины для будущих сравнений
  lastWindowWidth = currentWindowWidth;
  });
  
  
  