$('.elec').click(function(){
  $('section ul .elec-show').toggleClass("show");
  $('section ul .first').toggleClass("rotate");
});
$('.furni').click(function(){
  $('section ul .furni-show').toggleClass('show');
  $('section ul .second').toggleClass("rotate");
});
$('.stationary').click(function(){
  $('section ul .stationary-show').toggleClass('show');
  $('section ul .third').toggleClass("rotate");
});
$('.home-decor').click(function(){
  $('section ul .home-decor-show').toggleClass('show');
  $('section ul .fourth').toggleClass("rotate");
});
$('.fashion').click(function(){
  $('section ul .fashion-show').toggleClass('show');
  $('section ul .fifth').toggleClass("rotate");
});

$('section ul li').click(function(){
  $(this).addClass("active").siblings().removeClass("active");
});


$('.sidebar-btn').click(function(){
  $(this).toggleClass("click");
  $('.sidebar').toggleClass("show");
});

let subMenu = document.getElementById('subMenu');

function toggleMenu(){
    subMenu.classList.toggle('open-menu');
}
// var swiper = new Swiper(".slide-content", {
//     slidesPerView: 6,
//     loop: true,
//     centerSlide: 'true',
//     fade: 'true',
//     grabCursor: 'true',
//     loopFillGroupWithBlank: true,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//       dynamicBullets: true
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//   });

var swiper = new Swiper(".slide-content", {
  slidesPerView: 1,
  centeredSlides: false,
  spaceBetween: 10,
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 8,
    },
  },
  
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true
  },
});

// const search = () =>{
//   const searchbox = document.getElementById("search-item").value.toUpperCase();
//   const storeitems = document.getElementById("prod-list");
//   const product = document.querySelectorAll(".product");
//   const pname = storeitems.getElementsByTagName("h4");

//   for(var i=0;i<pname.length;i++){
//     let match = product[i].getElementsByTagName('h4')[0];
     
//     if(match){
//       let textvalue = match.textContent || match.innerHTML;
//       if(textvalue.toUpperCase().indexOf(searchbox)>-1){
//         product[i].style.display="";
//       }
//       else{
//         product[i].style.display="none";
//       }
//     }
//   }
// }


