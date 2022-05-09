'use strict'


// navbar 화면고정
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    if(window.scrollY >navbarHeight ){
        navbar.classList.add('navbar--dark');
    }else{
        navbar.classList.remove('navbar--dark');
    }
});
// =====================================================================================================
// navbar item들 클릭했을때 scrolling
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    navbarMenu.classList.remove('open');   
    scrollIntoView(link);
    selectNavItem(target);
})

// =====================================================================================================
// Navbar toggle button
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');

navbarToggleBtn.addEventListener('click', ()=> {
    navbarMenu.classList.toggle('open');   
})

// =====================================================================================================
// contact button클릭시 scroll
const homeContactBtn = document.querySelector('.home__contact')
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
})



// =====================================================================================================
// scroll하면 Home 투명하게 
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
    home.style.opacity = 1 - window.scrollY / homeHeight   
})

// =====================================================================================================
// arrow-up + scroll
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () =>{
    if(window.scrollY > homeHeight/2){
        arrowUp.classList.add('visible');
    } else{
        arrowUp.classList.remove('visible');
    }
});

arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
})

// =====================================================================================================
// Project
const workBtnContainer = document.querySelector('.work__categories')
const projectContainer = document.querySelector('.work__projects')
const projects = document.querySelectorAll('.project')


workBtnContainer.addEventListener('click', (e) =>{
    const filter = e.target.dataset.fillter || e.target.parentNode.dataset.fillter;
    if(filter == null) { return; }

    const active = document.querySelector('.category_btn.selected')
    active.classList.remove('selected')

    const target = e.target.nodeName === 'BUTTON'?e.target:e.target.parentNode;
    target.classList.add('selected')  

    projectContainer.classList.add('anim-out')
    setTimeout(() => {
        projects.forEach((project) => {
            if(filter ==='*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        })

        projectContainer.classList.remove('anim-out')
    }, 300)
    
});

// =====================================================================================================
// Project
//1. 모든 section 요소들과 메뉴아이템들을 가져온다 
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#contact'
]

const sections = sectionIds.map(id => document.querySelector(id))
// console.log(sections)

const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`))
// console.log(navItems)


//2. intersectionObserver를 이용해서 모든 section들을 관찰한다.

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active')
    selectedNavItem = selected
    selectedNavItem.classList.add('active')
}

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView();
    selectNavItem(navItems[sectionIds.indexOf(selector)])
}


const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry=>{
        console.log(entry);
        if(!entry.isIntersecting && entry.intersectionRatio >0) { //스크롤을 위로 올렸을때()
            const index = sectionIds.indexOf(`#${entry.target.id}`)

            if(entry.boundingClientRect.y < 0){
                // 스크롤이 아래로 되어서 페이지가 올라옴
                selectedNavIndex = index+1
            } else{
                selectedNavIndex = index-1
            }
        }
    })
}

const observer = new IntersectionObserver(observerCallback, observerOptions)
sections. forEach(section => observer.observe(section))


window.addEventListener('wheel', () => {
    if(window.scrollY === 0 ) {
        selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
        selectedNavIndex = navItems.length-1;
    }
    selectNavItem(navItems[selectedNavIndex])
})

























