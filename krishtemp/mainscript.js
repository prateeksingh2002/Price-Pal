



// Direct json file read krne ka code
// $('.elec').click(function(){
//     $('section ul .elec-show').toggleClass("show");
//     $('section ul .first').toggleClass("rotate");
//   });
//   $('.furni').click(function(){
//     $('section ul .furni-show').toggleClass('show');
//     $('section ul .second').toggleClass("rotate");
//   });
//   $('.stationary').click(function(){
//     $('section ul .stationary-show').toggleClass('show');
//     $('section ul .third').toggleClass("rotate");
//   });
//   $('.home-decor').click(function(){
//     $('section ul .home-decor-show').toggleClass('show');
//     $('section ul .fourth').toggleClass("rotate");
//   });
//   $('.fashion').click(function(){
//     $('section ul .fashion-show').toggleClass('show');
//     $('section ul .fifth').toggleClass("rotate");
//   });
  
//   $('section ul li').click(function(){
//     $(this).addClass("active").siblings().removeClass("active");
//   });
  
  
//   $('.sidebar-btn').click(function(){
//     $(this).toggleClass("click");
//     $('.sidebar').toggleClass("show");
//   });
  
//   let subMenu = document.getElementById('subMenu');
  
//   function toggleMenu(){
//       subMenu.classList.toggle('open-menu');
//   }
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
  
 




const apiEndpoint = "./t_final.json" ;
let display1 = document.getElementById("prod-list1")
let display2 = document.getElementById("prod-list2")
let display3 = document.getElementById("prod-list3")
let display4 = document.getElementById("prod-list4")
let display5 = document.getElementById("prod-list5")



var randomarray = [];

const getData = async() => {

   const res = await fetch(apiEndpoint);
   const data  = res.json();
   console.log(data) ;

   return data;

}


getData();




// {
//   "name": "Luxor Blue Ink Gel PenLuxorR(PILOT 0.5)",
//   "category": "Stationary",
//   "sub_category": "Pen",
//   "product_link": "https://mkp.gem.gov.in/gel-pen-v2/luxor/p-5116877-660040897-cat.html#variant_id=5116877-660040897",
//   "specification": "Type of Ink Acid Free The refill shall write a continuous line of (Minimum) 500 meters Line width/Tip sizes 0.6 Pen Barrel made of Metal with suitable corrosion resistant finish ",
//   "old_cost": " Rs.50.00",
//   "new_cost": "Rs.30.00",
//   "stock": "  10000  In Stock",
//   "rating": "4.0 - 4.49",
//   "image": "https://assets-mkpbg.gem.gov.in/img/othe/1256562/52/3c/luxorpilot0.5refillpen1.jpg.fa9c78523c.999x420x420.jpg"
// },

function rowGenerator(block, keyword){
    let i = 0;
    while(i<20)
    {
       
       let x = (Math.floor(Math.random()*10000)%randomarray.length);
       console.log(x);
       var view = document.createElement('div');
        view.classList.add('card');
        view.classList.add('swiper-slide');
        view.classList.add('product');
       if(randomarray[x].category.toLowerCase()==keyword.toLowerCase() || randomarray[x].name.toLowerCase().includes(keyword.toLowerCase()) || randomarray[x].category.toLowerCase().includes(keyword.toLowerCase))
       {  i++;
             view.innerHTML = `
           
            <div class="imgbox">
                <img src= "${randomarray[x].image}" width = 30% alt="">
            </div>
            <div class="contentbox">
            <h4 class="brand">${randomarray[x].name}</h4>
                <div class="prod-details">
                    <span class="oldcost">${randomarray[x].old_cost}</span>
                    <br>
                    <span>${randomarray[x].new_cost}</span>
                    <br>
                    <span>20% off</span>
                    <h3>Rating: ${randomarray[x].rating}</h3>
                    <h4>Supplier: ${randomarray[x].site}</h4>
                </div>
            </div>
        
         `
         
         view.addEventListener('click',function(e) {
            
            document.location = `productDetailView.html?q=${randomarray[x].name}`;
            
         })
         
   block.appendChild(view);
   
       }
    }  
}

const displayUsers = async() =>{

   const payload = await getData();

   let datadisplay = payload.map((Object) =>{
       console.log(Object);

       const {name , category , sub_category , product_link , specification , old_cost , new_cost ,  stock , rating , image ,
       } = Object;

 
       
    randomarray.push(Object)

     
    
     

   });
   console.log(randomarray);
   rowGenerator(display1,"Electronics");
   rowGenerator(display2,"Furniture");
   rowGenerator(display3,"Stationary");
   rowGenerator(display4,"Home Decor");
   
   
 }

  
 








displayUsers() ;








const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('search-item');
searchIcon.addEventListener("click" , function (event){
    document.location = `searchItem.html?q=${searchInput.value}`;
//     console.log(event);
//   let str = searchInput.value;
//   console.log(str);
//   let i = 0;
    
//  let categoryDiv = document.getElementById('category_results');

//   while(i<20)
//   {
//      var view = document.createElement('div');
//       view.classList.add('card');
//       view.classList.add('swiper-slide');
//       view.classList.add('product');
//       console.log(randomarray[i]);
//      if(randomarray[i].category==str|| randomarray[i].name.includes(str) == true)
//      {  i++;
//         console.log(randomarray[i]);
//            view.innerHTML = `
         
//           <div class="imgbox">
//               <img src= "${randomarray[i].image}" width = 30% alt="">
//           </div>
//           <div class="contentbox">
//           <h4 class="brand">${randomarray[i].category}</h4>
//               <div class="prod-details">
//                   <span>${randomarray[i].old_cost}</span>
//                   <br>
//                   <span>${randomarray[i].new_cost}</span>
//                   <br>
//                   <span>20% off</span>
//                   <h3>Rating: ${randomarray[i].rating}</h3>
//                   <a href = "${randomarray[i].product_link}" >Link </a>
//               </div>
//           </div>
      
//        `
//  categoryDiv.appendChild(view);
//  break;
        
    //  }
//   }  




});

















