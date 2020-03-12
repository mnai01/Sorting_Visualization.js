// Bars height
const MAX_VALUE = 50;
// Number of bars
const NUMS = 120;
// Holds each bar size
var nums = [];
// Tracks how left each bar should be
var tracker = 0;
// Used to keep track of how many swaps occured
var swapCount = 0;
// Used to track how many bars have been sorted
// If i = 1 then that means 1 bar has been iterated
// all the way to the right and is in its correct position
var i = 0;
// Used to iterate through each bar in the array for BubbleSort
var j = 0;

// if i (the number of how many bars sorted)
// is less then NUMS (the number of bars)
// Then keep running the sort method

/*
if (i < NUMS) {
    setInterval(SelectionSort, 1);
    }
if (i < NUMS) {
    setInterval(BubbleSort, 1);
    }
*/

// Fills nums Array
for (let i = 0; i < NUMS; i++) {
  nums.push(Math.ceil(Math.random() * MAX_VALUE)); // Math random only gives numver from 0.0 - 1.0 then multiple it by 7
  // a number from Math.ceil returns a rounds number
  // push then number to the array
}

// Adding button to HTML
var button_refresh = NewEl("button");
Append(button_refresh, document.createTextNode("Refresh"));
Append(GetEl("button-options"), button_refresh);

var button_bubblesort = NewEl("button");
Append(button_bubblesort, document.createTextNode("Bubble Sort"));
Append(GetEl("button-options"), button_bubblesort);

var button_selectionsort = NewEl("button");
Append(button_selectionsort, document.createTextNode("Selection Sort"));
Append(GetEl("button-options"), button_selectionsort);

var button_insertionsort = NewEl("button");
Append(button_insertionsort, document.createTextNode("Insertion Sort"));
Append(GetEl("button-options"), button_insertionsort);

// Button click listeners
button_refresh.addEventListener("click", LoadNew);

button_bubblesort.addEventListener("click", function() {
  if (i < NUMS) {
    setInterval(BubbleSort, 1);
  }
});

button_selectionsort.addEventListener("click", function() {
  if (i < NUMS) {
    console.log(i);
    setInterval(SelectionSort, 10);
  }
});

button_insertionsort.addEventListener("click", function() {
  runInstS();
});
function runInstS() {
  var insertint = setInterval(InsertionSort, 1);

  function InsertionSort() {
    let value = nums[i];
    let currentIndex = i;
    while (currentIndex > 0 && nums[currentIndex - 1] > value) {
      nums[currentIndex] = nums[currentIndex - 1];
      currentIndex--;
    }
    $("#bar-box").html(LoadSorted);
    nums[currentIndex] = value;
    i++;
    if (i >= NUMS) {
      console.log(i);
      clearInterval(insertint);
      console.log("cleared");
      return;
    }
  }
}

// OLD WAY
/*  why the div ID and not the button here? 
$("#button-options").on("click", function() {
    $("#bar-box").html(LoadNew);
*/

//////////////////////////////////////////////////
// Function Name: NewEl(el)
// Description: Helper Function
//////////////////////////////////////////////////
function NewEl(el) {
  return document.createElement(el);
}

//////////////////////////////////////////////////
// Function Name: Append(parent, child)
// Description: Helper Function
//////////////////////////////////////////////////
function Append(parent, child) {
  parent.appendChild(child); // can only pass nodes as child
}

//////////////////////////////////////////////////
// Function Name: GetEl(el)
// Description: Helper Function
//////////////////////////////////////////////////
function GetEl(el) {
  return document.getElementById(el);
}

//////////////////////////////////////////////////
// Function Name: function
// Description: Used to update the div every time a swap is generated
// this help visualize how the sort works.
// It removes the old div and re-adds/re-creates the bars on the screen
// to show the new updated version after each swap iteration
//////////////////////////////////////////////////
function LoadSorted() {
  // Removes the current list from the div
  while (GetEl("bar-box").firstChild) {
    GetEl("bar-box").removeChild(GetEl("bar-box").firstChild);
    // sets tracker back to 0, this is nessesary since ever bar is going to be reloaded
    // again to show the new updated list
    tracker = 0;
  }
  // Running createbars will add the bars to the screen again but this time
  // it will appear in the updated order after each swap iteration.
  CreateBars();
}

//////////////////////////////////////////////////
// Function Name: LoadNew
// Description: empties array num and fills it with new values.
// It then calls CreateBars which creates the actual bars on the page
//////////////////////////////////////////////////
function LoadNew() {
  for (let i = 0; i < NUMS; i++) {
    // removes all elements from array
    nums.pop();
  }
  // Removes all div's that exist as childen in the bar-box div
  while (GetEl("bar-box").firstChild) {
    GetEl("bar-box").removeChild(GetEl("bar-box").firstChild);
    // sets tracker back to 0
    tracker = 0;
    // resets how many bars have already been sorted to 0
    i = 0;
  }
  for (let i = 0; i < NUMS; i++) {
    // Math random only gives numver from 0.0 - 1.0 then multiple it by 7
    // a number from Math.ceil returns a rounds number
    // push then number to the array
    nums.push(Math.ceil(Math.random() * MAX_VALUE));
  }
  CreateBars();
}

//////////////////////////////////////////////////
// Function Name: createBars
// Description: Creates a new random pattern of the bars
// in unsorted order on the page
//////////////////////////////////////////////////
function CreateBars() {
  // JS For loop
  for (let value of nums) {
    // creates new div
    let bar = NewEl("div");
    // Links styling to the bar class
    bar.className = "bar";
    // moves the bar to left
    bar.style.left = tracker + "%";
    // gets the correct height of each bar
    bar.style.height = (value / MAX_VALUE) * 100 + "%";
    bar.style.width = 100 / NUMS + "%"; // gets the correct width of each bar
    // Adds bar to 'bar-box'. Need to pass in 'bar-box' as getEl('bar-box') because it return document.getElementById
    // which return a node and append child only accept a node.
    tracker += 100 / NUMS;
    Append(GetEl("bar-box"), bar);

    // Commenting this out makes it go so much faster, WHY?
    //console.log(value);
  }
}

//////////////////////////////////////////////////
// Function Name: BubbleSort(j)
// Description: sorting method used to sort num array
// j represents an integer which is a specific index
// in num array
//////////////////////////////////////////////////
function BubbleSort() {
  if (i < NUMS) {
    if (j >= NUMS - 1 - i) {
      j = 0;
      i++;
    }
    if (nums[j] > nums[j + 1]) {
      Swap(j);
    }
    j++;
  }
  $("#bar-box").html(LoadSorted);
}

//////////////////////////////////////////////////
// Function Name: Swap(j)
// Description: used to swap two index's with each
// other in the nums array
//////////////////////////////////////////////////
function Swap(j) {
  let temp;
  temp = nums[j];
  nums[j] = nums[j + 1];
  nums[j + 1] = temp;
  swapCount++;
  let test = GetEl("swap-label");
  let number = test.innerHTML;
  test.innerHTML = "Swaps: " + swapCount;

  // idk what this is, can probably delete
  // $("#swaps h3").text("sfdasf");
}

function Swap2(lhs, rhs) {
  let temp = nums[rhs];
  nums[rhs] = nums[lhs];
  nums[lhs] = temp;
  swapCount++;
  let test = GetEl("swap-label");
  let number = test.innerHTML;
  test.innerHTML = "Swaps: " + swapCount;

  // idk what this is, can probably delete
  // $("#swaps h3").text("sfdasf");
}

function SelectionSort() {
  let marker = i;
  for (let j = i + 1; j < NUMS; j++) {
    if (nums[marker] > nums[j]) {
      marker = j;
    }
  }
  Swap2(marker, i);
  i++;
  //why does this not increment the global var
  // maybe before of the function with setinterval in it
  $("#bar-box").html(LoadSorted);
}

// DOES VISUALIZE SWAP that happens
function InsertionSort() {
  let value = nums[i];
  let currentIndex = i;
  while (currentIndex > 0 && nums[currentIndex - 1] > value) {
    nums[currentIndex] = nums[currentIndex - 1];
    currentIndex--;
  }
  nums[currentIndex] = value;
  i++;
  $("#bar-box").html(LoadSorted);
  if (i >= NUMS) {
    console.log(i);
    clearInterval(insertint);
    console.log("cleared");
    return;
  }
}
