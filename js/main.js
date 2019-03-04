const navBtn = document.getElementById('nav-btn');
const navBtnSpan = navBtn.querySelector('span')
const navLinks = document.querySelectorAll('.fixed-nav__nav__link')
const nav = document.getElementById('navigation');
//MOBILE MENU
let activeNavFlag = false;
const menuHandler = () => {
  if (activeNavFlag) {
    navBtnSpan.className = "fas fa-bars";
    document.body.style.overflowY = "initial";
  } else {
    navBtnSpan.className = "fas fa-times";
    document.body.style.overflowY = "hidden";
  }
  activeNavFlag = !activeNavFlag;
  nav.classList.toggle('is-active');
}
navLinks.forEach(item => item.addEventListener('click', () => {
  navBtnSpan.className = "fas fa-bars";
  document.body.style.overflowY = "initial";
  activeNavFlag = !activeNavFlag;
  nav.classList.remove('is-active');
}));
navBtn.addEventListener('click', menuHandler);
document.addEventListener('scroll', () => {

});
//Skills component
const clearActive = className => {
  document.querySelectorAll(className).forEach((item, id) => {
    item.classList.remove('is-active');
  })
}
document.querySelectorAll('#skills-btns button').forEach((item, id) => {
  item.addEventListener('click', () => {
    clearActive('#skills-btns button.is-active');
    clearActive('#skills-articles article.is-active');
    document.querySelector(`#skills-articles article:nth-child(${id+1})`).classList.add('is-active');
    item.classList.add('is-active');
  })
})
//Active section
const sectionsNames = ['#start', '#about-me', '#skills', '#realizations', '#contact'];
const sections = [...document.querySelectorAll(sectionsNames.toString(','))];
let checkActiveSection;
const activeSection = () => {
  const sizesToTop = sections.map(item => item.offsetTop + item.offsetHeight / 2 - window.innerHeight)
  checkActiveSection = () => {
    sizesToTop.forEach((item, id) => {
      if (window.scrollY > item) {
        clearActive('#navigation a.is-active');
        nav.querySelector(`a[data-scroll="${sectionsNames[id]}"]`).classList.add('is-active');
      }
    });
  }
  checkActiveSection();
  document.addEventListener('scroll', checkActiveSection);
}
window.addEventListener('resize', () => {
  document.removeEventListener('scroll', checkActiveSection);
  activeSection();
});
activeSection();
//Scrolling animations
if (window.innerWidth >= 1024) {
  const items = document.querySelectorAll('*[data-animation]');
  for (let i = 0; i < items.length; i++) {
    if (items[i].hasAttribute("data-animation")) items[i].classList.add('hide');
  }
  const checkAnimate = () => {
    for (let i = 0; i < items.length; i++) {
      if (window.scrollY > items[i].offsetTop + items[i].offsetHeight / 2 - window.innerHeight) {
        const className = items[i].getAttribute("data-animation");
        items[i].classList.remove('hide');
        items[i].classList.add(className);
      }
    }
  }
  document.addEventListener('scroll', checkAnimate);
  checkAnimate();
}