document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("what's your name");

  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown Player";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  document.querySelector(".control-buttons").remove();
};


 // make shuffle button
  let resetButton = document.querySelector('.reset-div');
  resetButton.addEventListener('click' , (e) => {
    e.preventDefault();
    shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
block.classList.remove('is-flipped');
block.classList.remove('has-match');
  
  });
});

  
let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");
//!MDN Web Docs is a Great Website
let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];
//let orderRange = Array.from(Array(blocks.length).keys());

//* Add Order Css Property to Game Blocks

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    //Trigger The flip block Function
    flipBlock(block);
  });
});

// Flip Block Function

function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");
  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // If there are two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0] , allFlippedBlocks[1]);
    // Check Matched Block Function
  }
}
// Stop Clicking Function

function stopClicking() {
  // Add Class no-clicking on Main Container (blocksContainer)
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById('success').play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(()=>{

        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
    },duration);

    document.getElementById('fail').play();


  }
}

// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    //Decrease Lenght by one
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
