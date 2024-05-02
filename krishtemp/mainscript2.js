const apiEndpoint = "./t_final.json" ;
let categoryDiv = document.getElementById('category_results');

var randomarray = [];

const getData = async() => {

   const res = await fetch(apiEndpoint);
   const data  = res.json();
   console.log(data) ;

   return data;

}


getData();

function rowGenerator(str){
    while (categoryDiv.firstChild) {
        categoryDiv.removeChild(categoryDiv.lastChild);
      }
      let i = 0;
      while(i < randomarray.length)
      {
        i++;
        if(randomarray[i].category.toLowerCase()==str|| randomarray[i].category.toLowerCase().includes(str) == true || randomarray[i].name.toLowerCase().includes(str) == true)
         { 
            console.log(randomarray[i]);
         var view = document.createElement('div');
          view.classList.add('card');
          view.classList.add('swiper-slide');
          view.classList.add('product');
        
          
            
            console.log(randomarray[i]);
               view.innerHTML = `
             
             
              <div class="imgbox">
                  <img src= "${randomarray[i].image}" width = 30% alt="">
              </div>
              <div class="contentbox">
              <h4 class="brand">${randomarray[i].name}</h4>
                  <div class="prod-details">
                      <span class="oldcost">${randomarray[i].old_cost}</span>
                      <br>
                      <span>${randomarray[i].new_cost}</span>
                      <br>
                      <span>20% off</span>
                      <h3>Rating: ${randomarray[i].rating}</h3>
                      <h4>Supplier: ${randomarray[i].site}</h4>
                  </div>
              </div>
          
           `

           view.addEventListener('click',function(e) {
            document.location = `productDetailView.html?q=${randomarray[i].name}`;
         })


     categoryDiv.appendChild(view);

         
     
            
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
    // console.log(randomarray);
    
    let params = (new URL(document.location)).searchParams;
    let passedQuery = params.get("q");
    rowGenerator(passedQuery);
    
    
    
  }

 displayUsers() ;
 const searchIcon = document.getElementById('search-icon1');
const searchInput = document.getElementById('search-item1');
searchIcon.addEventListener("click" , function (event){
    while (categoryDiv.firstChild) {
        categoryDiv.removeChild(categoryDiv.lastChild);
      }
      
    rowGenerator(searchInput.value.toLowerCase());
});