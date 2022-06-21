'use strict';

let imageSpace = document.querySelector('#imageSpace');
let allImgElsOnPage = document.querySelectorAll('img');
let imgPathways = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "water-can.jpg", "wine-glass.jpg"];
let input = 5;
let number = Math.min(input, imgPathways.length);

let clicks = 0; 
let maxClicks = 5;

// imgPathways.forEach(i => {console.log(i.length); console.log(i)});

function Image(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
  Image.imgObjArray.push(this);
}

Image.imgObjArray = [];

function createImgObjects(){
  for (let i = 0; i < imgPathways.length; i++){
    new Image(imgPathways[i].slice(0, imgPathways[i].length - 4), "./img/" + imgPathways[i])
  }
}

createImgObjects();

function createImageElements (number) {
  let imageSpace = document.getElementById('imageSpace');

  for (let i = 0; i < number; i++) {
    let imageEl = document.createElement('img');
    imageEl.setAttribute('id', 'image'+(i+1));
    imageSpace.appendChild(imageEl);
  }
}

createImageElements(number);

function randomNumber(){
  let ranNum = Math.floor(Math.random()*Image.imgObjArray.length);
  return ranNum;
}

function includedImages(number){
  let array = [];
  for (let i = 0; i < number; i++){
    let rn = randomNumber();
    let i = 0;
    while (array.includes(rn)){
      rn = randomNumber();
    }
    array.push(rn);
  }
  return array;
} 

function renderImages (number) {
  let newList = includedImages(number);
  for(let i = 0; i < number; i++){
    let image = document.querySelectorAll('img')[i];
    image.src = Image.imgObjArray[newList[i]].src;
    image.alt = Image.imgObjArray[newList[i]].name;
    Image.imgObjArray[newList[i]].views++;
  };
}

renderImages(number);

function multiChoiceClick(event) {
  let state = false;
  if(event.target === imageSpace){
    alert('Please click directly on an image');
  }

  for (let i = 0; i < imgPathways.length; i++){
    if (event.target.alt === Image.imgObjArray[i].name){
      Image.imgObjArray[i].clicks++;
      clicks++;
      state = true;
      break;
    }
  }

  if ( clicks === maxClicks){
    imageSpace.removeEventListener('click', multiChoiceClick);
    let resultButton = document.createElement('button');
    resultButton.setAttribute('id', 'resultButton');
    imageSpace.appendChild(resultButton);

    resultButton.addEventListener('click', renderResults);
    
  }
  else{
    if (state){
      renderImages(number);
      console.log(Image.imgObjArray);
      console.log(clicks);
    }
  }
}

function renderResults(){
  console.log(Image.imgObjArray);
  console.log('hi');
}

imageSpace.addEventListener('click', multiChoiceClick);
