const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
var randomarray = [];
let imgId = 1;
let params = (new URL(document.location)).searchParams;
let passedQuery = params.get("q");
imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);
const apiEndpoint = "./t_final.json" ;


const getData = async() => {

   const res = await fetch(apiEndpoint);
   const data  = res.json();

   return data;

}
getData();
const displayUsers = async() =>{

    const payload = await getData();
 
    let datadisplay = payload.map((Object) =>{
 
        const {name , category , sub_category , product_link , specification , old_cost , new_cost ,  stock , rating , image ,
        } = Object;
     
     randomarray.push(Object)
 
    });
    var productName = document.getElementById('nameOfProduct');
  var productLink = document.getElementById('linkToProduct');
  var productRating = document.getElementById('ratingProduct');
  var productOldPrice = document.getElementById('old_price');
  var productNewPrice = document.getElementById('new_price');
  var productDesc = document.getElementById('desc_product');
  var productInStock = document.getElementById('in_stock');
  var productCategory = document.getElementById('category');
  var productSubCategory = document.getElementById('sub_category');
  var productImage = document.getElementById('product_img');
  console.log(randomarray.length);


console.log(passedQuery);
console.log(randomarray.length);
for(let i =0; i<randomarray.length; i++){
    if(randomarray[i].name == passedQuery){
        console.log('fsdfdsfsf');
        productName.innerHTML = randomarray[i].name;
        productLink.setAttribute('href',randomarray[i].product_link );
        productRating.innerHTML = randomarray[i].rating;
        productOldPrice.innerHTML = randomarray[i].old_cost;
        productNewPrice.innerHTML = randomarray[i].new_cost;
        productDesc.innerHTML = randomarray[i].specification;
        productInStock.innerHTML = randomarray[i].stock;
        productCategory.innerHTML = randomarray[i].category;
        productSubCategory.innerHTML = randomarray[i].sub_category;
        productImage.setAttribute('src', randomarray[i].image)

        var button  = document.getElementById('predictorButton');
        button.addEventListener('click', function(e){


        fetch(`localhost:9000/prediction/${randomarray[i].new_cost}`,{
            method: 'GET'
        }).then(function(response){

        }).catch(function(err){

        });
 })

        break;
    }
}
    console.log('ffsf');

  }
 displayUsers();
 
 
  
















