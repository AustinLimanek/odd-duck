'use strict';

let imageSpace = document.querySelector('#imageSpace');
let allImgElsOnPage = document.querySelectorAll('section img');
let imgPathways = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "water-can.jpg", "wine-glass.jpg"];

//Input is the number of photos printed on the page
let input = 3;
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
  let instructionSpace = document.getElementById('instructionSpace')
  let instructions = document.createElement('p');
  instructions.setAttribute('id', 'instruction');
  instructions.textContent = 'Click the image, out of the ' + input +', that contains the best invention:';
  instructionSpace.appendChild(instructions);

  for (let i = 0; i < number; i++) {
    let imageEl = document.createElement('img');
    imageEl.setAttribute('id', 'image');
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
    let image = document.querySelectorAll('section img')[i];
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
    resultButton.textContent = 'View Results';

    resultButton.addEventListener('click', renderResults);

    for (let i = 0; i < input; i++){
    imageSpace.removeChild(document.getElementById('image'));
    }

    instructionSpace.removeChild(document.getElementById('instruction'));
    
  }
  else{
    if (state){
      renderImages(number);
    }
  }
}

function renderResults(){
  let resultSpace = document.querySelector('main');
  let list = document.createElement('ul');
  let summaryTitle = document.createElement('h2');
  summaryTitle.textContent = "Summary of Survey:";
  resultSpace.appendChild(summaryTitle);
  resultSpace.appendChild(list);

  for (let i = 0; i < Image.imgObjArray.length; i++){
    let listEl = document.createElement('li');
    listEl.textContent = Image.imgObjArray[i].name + ' had ' + Image.imgObjArray[i].views + ' views, and received ' + Image.imgObjArray[i].clicks + ' votes';
    list.appendChild(listEl);
  }
  imageSpace.removeChild(document.getElementById('resultButton'));
  let thanks = document.createElement('p');
  thanks.textContent = "Thank you for taking our survey!!";
  imageSpace.appendChild(thanks);
}

imageSpace.addEventListener('click', multiChoiceClick);
