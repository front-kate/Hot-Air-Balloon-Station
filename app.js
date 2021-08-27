const images = document.querySelector('.images');
const increment = document.querySelector('.increment');
const decrement = document.querySelector('.decrement');
const save = document.querySelector('.save');
const countScreen = document.getElementById('count');
const saveBox = document.querySelector('.saveBox')
const saveNumber = document.querySelector('.saveNumber');
const currentPlusSaved = document.querySelector('.plus');
const blackhole = document.querySelector('.minus');

let count = 0;
let reset = 0;

const balloonUp = () => {
  if(images.classList.contains("dissolve")) {
    images.classList.remove('dissolve');
  }
  let balloon = document.createElement('img');
  balloon.src = `img/Asset ${Math.floor(Math.random() * 9) + 1}.svg`;
  images.appendChild(balloon);  
}

const balloonRemove = () => {
  let lastBalloon =images.lastElementChild;  
  lastBalloon.style.translate = "600px 0"
  lastBalloon.style.opacity = 0;
  lastBalloon.style.transition = "all 0.3s ease"
  setTimeout(() => {
    lastBalloon.remove();
  }, 500)
}

const dissolved = () => {
  images.classList.add('dissolve');
  setTimeout(() => {
    images.innerHTML = '';
  }, 1000)
  countScreen.innerText = 0;
  saveNumber.innerText = 0;
  count = 0;
}

const savedBalloons = () => {
  let moreBalloons = parseInt(countScreen.innerText) - images.children.length;
  for(let i = 0; i < moreBalloons; i++) {
    balloonUp()
  }
}

const saveBoxGone = () => {
  saveBox.style.opacity = 0;
  saveBox.style.transform = "scale(0)";
  saveBox.style.translate = "350px 350px";   
}

// "Add" button click event 
increment.addEventListener('click', () => {
  count = parseInt(countScreen.innerText) + 1;
  countScreen.innerText = count;
  balloonUp()
  if (parseInt(countScreen.innerText) <= 0) {
    images.innerHTML = '';
  }

});

// "subtract" button click event 
decrement.addEventListener('click', () => { 
  if(count === 0) {
    countScreen.innerText = 0;
  } else {
    count = parseInt(countScreen.innerText) - 1;
    countScreen.innerText = count;
    balloonRemove()
  }
});

// "save" button click event 
save.addEventListener('click', () => {
  saveNumber.innerText = countScreen.innerText + " saved";
  saveBox.style.opacity = "1";
  saveBox.style.transform = "scale(1)";
  saveBox.style.translate = "0px 0px";
  countScreen.innerText = reset;
  count = reset;
  images.innerHTML = ''
});

// "corner box with saved number on click event"
saveBox.addEventListener('click', () => {
  count = parseInt(saveNumber.innerText);
  countScreen.innerText = count;
  savedBalloons();
  saveBoxGone();
});

// current + saved number click event
currentPlusSaved.addEventListener('click', () => {
  if(saveNumber.innerText) {
    let numberSaved = parseInt(saveNumber.innerText);
    countScreen.innerText =  numberSaved + count;
    savedBalloons()
  }
});

// make the balloons disappear and reset the scene

blackhole.addEventListener('click', () => {
  saveBoxGone();
  dissolved()
});


