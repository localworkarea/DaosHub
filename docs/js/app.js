(() => {
    "use strict";
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767.98";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint / 16}em),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    gsap.registerPlugin(ScrollTrigger);
    const heroSection = document.querySelector(".hero");
    const heroMask = document.querySelector(".hero__mask");
    const whatSection = document.querySelector(".what");
    const imgBlocks = document.querySelectorAll(".img-block__mask");
    if (heroSection) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: whatSection,
                start: "10% bottom",
                end: "bottom 80%",
                scrub: true
            }
        });
        tl.to(heroMask, {
            opacity: 1
        });
        tl.to(whatSection, {
            opacity: 1
        }, "-=0.05");
    }
    let breakPoint = 43.811;
    let mm = gsap.matchMedia();
    mm.add({
        isDesktop: `(min-width: ${breakPoint}em)`,
        isMobile: `(max-width: ${breakPoint}em)`
    }, (context => {
        let {isDesktop, isMobile} = context.conditions;
        if (isDesktop) ;
        if (isMobile) if (imgBlocks.length > 0) imgBlocks.forEach((imgBlock => {
            gsap.to(imgBlock, {
                opacity: 0,
                scrollTrigger: {
                    trigger: imgBlock,
                    start: "top center",
                    end: "center center",
                    scrub: true
                }
            });
        }));
    }));
    function smoothScroll(smoothness = .08, inertia = .85) {
        let scrollPosition = window.pageYOffset;
        let targetPosition = scrollPosition;
        let isScrolling = false;
        let isDraggingScrollbar = false;
        function updateScroll() {
            scrollPosition += (targetPosition - scrollPosition) * smoothness;
            window.scrollTo(0, scrollPosition);
            if (Math.abs(targetPosition - scrollPosition) > .5) requestAnimationFrame(updateScroll); else isScrolling = false;
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
            if (document.body.getAttribute("data-smooth-scroll") === "true") {
                window.addEventListener("wheel", startScroll, {
                    passive: false
                });
                window.addEventListener("scroll", onScroll);
                window.addEventListener("mousedown", onMouseDown);
                window.addEventListener("mouseup", onMouseUp);
            } else {
                window.removeEventListener("wheel", startScroll);
                window.removeEventListener("scroll", onScroll);
                window.removeEventListener("mousedown", onMouseDown);
                window.removeEventListener("mouseup", onMouseUp);
            }
        }
        const observer = new MutationObserver((mutations => {
            mutations.forEach((mutation => {
                if (mutation.attributeName === "data-smooth-scroll") initSmoothScroll();
            }));
        }));
        observer.observe(document.body, {
            attributes: true
        });
        initSmoothScroll();
    }
    if (document.body.getAttribute("data-smooth-scroll") === "true") smoothScroll(.08, .85);
    window.addEventListener("orientationchange", (() => {
        ScrollTrigger.refresh();
    }));
    let lastWindowWidth = window.innerWidth;
    window.addEventListener("resize", (() => {
        const currentWindowWidth = window.innerWidth;
        if (currentWindowWidth !== lastWindowWidth) ScrollTrigger.refresh();
        lastWindowWidth = currentWindowWidth;
    }));
    window["FLS"] = false;
    menuInit();
})();