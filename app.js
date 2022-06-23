'use strict';

let imageSpace = document.querySelector('#imageSpace');
let allImgElsOnPage = document.querySelectorAll('section img');
let imgPathways = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "water-can.jpg", "wine-glass.jpg"];

//Input is the number of photos printed on the page
let input = 5;
let number = Math.min(input, imgPathways.length);

let clicks = 0; 
let maxClicks = 25;
let currentImg =[];

// imgPathways.forEach(i => {console.log(i.length); console.log(i)});

function Image(name, src, views, clicks) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
  this.successRate = 0;

  this.updateSuccessRate = function () {
    if (this.views !== 0){
      this.successRate = (this.clicks / this.views) * 100;
    }
    return this.successRate;
  }

  Image.imgObjArray.push(this);
}

let userArray = JSON.parse(localStorage.getItem("myObject"));

Image.imgObjArray = [];

function reConstructor (array){
  for (let i = 0; i < array.length; i++){
    new Image(array[i].name, array[i].src, array[i].views, array[i].clicks);
  }
}

if(userArray.length > 0){
  reConstructor(userArray);
  console.log(Image.imgObjArray);
}

function createImgObjects(){
  for (let i = 0; i < imgPathways.length; i++){
    new Image(imgPathways[i].slice(0, imgPathways[i].length - 4), "./img/" + imgPathways[i], 0, 0)
  }
}

if (Image.imgObjArray.length === 0){
  createImgObjects();
}

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
    while (array.includes(rn) || currentImg.includes(rn)){
      rn = randomNumber();
    }
    array.push(rn);
  }
  currentImg = array;
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

function dataArray(array, property) {
  let output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(array[i][property]);
  }
  return output;
}

function successArray(array) {
  let output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(array[i].updateSuccessRate());
  }
  return output;
}

function renderResults(){
  let resultSpace = document.getElementById('results');
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

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: imgPathways,
          datasets: [
            {
              label: '# of Votes',
              data: dataArray(Image.imgObjArray, "clicks"),
              backgroundColor: 'green',
              borderColor: 'orange',
              borderWidth: 1
            },
            {
              label: '# of Views',
              data: dataArray(Image.imgObjArray, "views"),
              backgroundColor: 'rgb(251, 159, 20)',
              borderColor: 'green',
              borderWidth: 1
            },
          ]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  let ctx2 = document.getElementById('myChart2').getContext('2d');
  let myChart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
          labels: imgPathways,
          datasets: [
            {
              label: '% Success Rate',
              data: successArray(Image.imgObjArray),
              backgroundColor: 'green',
              borderColor: 'orange',
              borderWidth: 1
            }
          ]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  localStorage.setItem("myObject", JSON.stringify(Image.imgObjArray));
}

imageSpace.addEventListener('click', multiChoiceClick);


// let problem = [
//   [1, 0, 0, 0, 0, 0],
//   [0, 1, 0, 0, 1, 1],
//   [0, 0, 1, 0, 1, 0],
//   [1, 1, 0, 0, 1, 0],
//   [1, 0, 1, 1, 0, 0],
//   [1, 0, 0, 0, 0, 1]
// ];

// let solution = [
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0]
// ];

// number = 30;

// function createProblem(number){
//   let problem = [];
//   for (let i = 0; i < number; i++){
//     let row = [];
//     for (let j = 0; j < number; j++){
//       row.push(Math.round(Math.random()));
//     }
//     problem.push(row);
//   }
//   return problem;
// }

// let problem = createProblem(number);

// function createSolution(number){
//   let array = [];
//   for (let i = 0; i < number; i++){
//     let row = [];
//     for (let j = 0; j < number; j++){
//       row.push(0);
//     }
//     array.push(row);
//   }
//   return array;
// }

// let solution = createSolution(number);


// function Problem (array, i, j) {
//   this.value = array[i][j];
//   this.simpIsland = false;
//   this.link = false;
//   this.anchor = false;
//   this.radar = [];

//   if(i === 0 || j === 0 ||  i === (array.length - 1) || j === (array.length - 1)){
//     this.edge = true;
//   } 
//   else{
//     this.edge = false;
//   }
// }

// function createObjArray (array){
//   let solution = [];
//   for (let i = 0; i < array.length; i++){
//     let row = [];
//     for (let j = 0; j < array[0].length; j++){
//       row.push(new Problem(array, i, j));
//     }
//     solution.push(row);
//   }
//   return solution;
// }

// let objArray = createObjArray(problem);

// function createRadar (array){
//   for (let i = 1; i < (array.length - 1); i++){
//     for (let j = 1; j < (array[0].length - 1); j++){
//       let radar = [array[i+1][j], array[i][j+1], array[i-1][j], array[i][j-1]];
//       array[i][j].radar = radar;
//     }
//   }
// }

// createRadar(objArray);

// function map(array) {
//   for (let i = 1; i < (array.length - 1); i++){
//     for (let j = 1; j < (array[0].length - 1); j++){
//       if (array[i][j].value === 1){
//         if (array[i][j].radar[0].value === 0 && array[i][j].radar[1].value === 0 && array[i][j].radar[2].value === 0 && array[i][j].radar[3].value === 0 ){
//           array[i][j].simpIsland = true;
//         }
//         else if(((array[i][j].radar[0].edge === true) &&  (array[i][j].radar[0].value === 1)) || ((array[i][j].radar[1].edge === true) &&  (array[i][j].radar[1].value === 1)) || ((array[i][j].radar[2].edge === true) &&  (array[i][j].radar[2].value === 1)) || ((array[i][j].radar[3].edge === true) &&  (array[i][j].radar[3].value === 1)) ){
//           array[i][j].anchor = true;
//         }
//         else{
//           array[i][j].link = true;
//         }
//       }
//     }
//   }
// }

// map(objArray);

// function anchorUpdate(array){
//   let count = 0;
//   for (let i = 1; i < (array.length - 1); i++){
//     for (let j = 1; j < (array[0].length - 1); j++){
//       if (array[i][j].link === true){
//         for (let k = 0; k < array[i][j].radar.length; k++){
//           if (array[i][j].radar[k].anchor === true){
//             array[i][j].link = false;
//             array[i][j].anchor = true;
//             count++;
//           }
//         }
//       }
//     }
//   }
//   return count;
// }

// function print (array, array2){
//   for (let i = 1; i < (array.length - 1); i++){
//     for (let j = 1; j < (array[0].length - 1); j++){
//       if (array[i][j].link === true || array[i][j].simpIsland === true){
//         array2[i][j] = array[i][j].value;
//       }
//     }
//   }
//   return array2;
// }

// function iterateAnchorUpdate(array){
//   console.log(problem)
//   console.log(print(array, solution));
//   while(anchorUpdate(array) > 0){
//     solution = createSolution(number);
//     console.log(print(array, solution));
//   }
// } 

// iterateAnchorUpdate(objArray);


