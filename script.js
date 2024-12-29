const array=[];
var n = 10; 
var sortType = bubblesort;
var sortSpeed = 100;
var shouldRun = true; 

var slider = document.getElementById('rangeSlider');
var sliderOutput = document.getElementById('sliderOutput');
var type = document.getElementById('sortTypeDropdown');
var speed = document.getElementById('sortSpeed');

sliderOutput.innerHTML = slider.value;
slider.oninput = function() {
    sliderOutput.innerHTML = this.value;
    n = slider.value;
    init();
}

init();

document.getElementById("playBtn").addEventListener('click', (e) =>{
    e.preventDefault();
    shouldRun = true;
    sortType = type.value;
    if(speed.value == "1"){
        sortSpeed = 100;
    }else if(speed.value == "1.25"){
        sortSpeed = 50;
    } else if(speed.value == "1.5"){
        sortSpeed = 30;
    } else if(speed.value == "0.25"){
        sortSpeed = 500;
    } else if(speed.value == "0.5"){
        sortSpeed = 250;
    }

    console.log(array + '\n' + sortType + '\n' + sortSpeed);
    play();
});

document.getElementById("init").addEventListener('click', (e) =>{
    e.preventDefault();
    init();
});

document.getElementById("stopBtn").addEventListener('click', (e) =>{
    e.preventDefault();
    shouldRun = false;
    console.log("Sorting stopped!");
    
});


function init(){
    const n = sliderOutput.innerHTML;
    for(let i=0; i<n; i++){
        array[i] = Math.random();
    }
    showbars();
}

function play(){
    if(sortType == "bubblesort"){
        bubblesort(array);
    } else if(sortType == "quicksort"){
        quicksort(array, 0, n-1);
    } else if(sortType == "mergesort"){
        mergesort(array, 0, n-1);
    } else if(sortType == "selectionsort"){
        selectionsort(array);
    } else if(sortType == "insertionsort"){
        insertionsort(array);
    } 
}

//INSERSIONSORT ALGORITHM
async function insertionsort(array){
    console.log("Insertionsort running");
    for(let i=1; i<array.length; i++){
        if (!shouldRun) break;
        let key = array[i];
        let j=i-1;

        showbars([i], 'compare');
        await new Promise(r => setTimeout(r, sortSpeed));

        while(j>=0 && array[j]>key){
            array[j+1] = array[j];
            j=j-1;

            showbars([j+1], 'move');
            await new Promise(r => setTimeout(r, sortSpeed));
        }
        array[j+1] = key;
    }
    showbars();
    resetBarClasses();
    console.log("Insertionsort done!");
}


//SELECTIONSORT ALGORITHM
async function selectionsort(array){
    console.log("Selectionsort running");
    for(let i=0; i<array.length-1; i++){
        if (!shouldRun) break;
        let minIndex = i;

        showbars([minIndex], 'minIndex');
        await new Promise(r => setTimeout(r, sortSpeed));

        for(let j=i+1; j<array.length; j++){

            showbars([j, minIndex], 'compare');
            await new Promise(r => setTimeout(r, sortSpeed));

            if(array[j] < array[minIndex]){
                minIndex = j;
                showbars([minIndex], 'minIndex');
            }
        }
        swap(array, i, minIndex);
        showbars([i, minIndex], 'swap');
        await new Promise(r => setTimeout(r, sortSpeed));
    }
    showbars();
    resetBarClasses();
    console.log("Selectionsort done!");
}

//MERGESORT ALGORITHM
async function merge(array, left, mid, right){
    const leftArray = new Array(mid-left+1);
    const rightArray = new Array(right-mid);

    for(let i=0; i<leftArray.length; i++){
        leftArray[i] = array[left + i];
    }
    for(let j=0; j<rightArray.length; j++){
        rightArray[j] = array[mid + 1 + j];
    }

    let i=0, j=0;
    let k = left;

    while(i<leftArray.length && j<rightArray.length){
        if (!shouldRun) break;
        showbars([k, left + i, mid + 1 + j], 'compare');
        await new Promise(r => setTimeout(r, sortSpeed));

        if(leftArray[i]<=rightArray[j]){
            array[k] = leftArray[i];
            i++;
        } else{
            array[k] = rightArray[j];
            j++;
        }
        k++;
        showbars([k - 1], 'merge'); 
        await new Promise(r => setTimeout(r, sortSpeed));
    }

    while(i < leftArray.length){
        array[k] = leftArray[i];
        i++;
        k++;
        showbars([k - 1], 'merge'); 
        await new Promise(r => setTimeout(r, sortSpeed));
    }

    while(j < rightArray.length){
        array[k] = rightArray[j];
        j++;
        k++;
        showbars([k - 1], 'merge'); 
        await new Promise(r => setTimeout(r, sortSpeed));
    }   
}
async function mergesort(array, left, right){
    console.log("Mergesort running");
    if(left < right){
        var mid = Math.floor(left + (right-left) / 2);
        await mergesort(array, left, mid);
        await mergesort(array, mid+1, right);
        await merge(array, left, mid, right);
    }
    showbars();
    resetBarClasses();
    console.log("Mergesort done!");
}

//QUICKSORT ALGORITHM  
async function partition(array, low, high){
    let pivot = array[high];
    let i = low-1;

    showbars([high], 'pivot'); 
    await new Promise(r => setTimeout(r, sortSpeed));

    for(let j=low; j<=high; j++){
        if (!shouldRun) break;
        showbars([j, high], 'compare'); 
        await new Promise(r => setTimeout(r, sortSpeed));
        
        if(array[j] < pivot){
            i++;
            swap(array, i, j);

            showbars([i, j], 'swap'); 
            await new Promise(r => setTimeout(r, sortSpeed));
        }
    }
    swap(array, i+1, high);
    showbars([i + 1, high], 'swap'); 
    await new Promise(r => setTimeout(r, sortSpeed));
    return i+1;
}
async function quicksort(array, low, high){
    console.log("Quicksort running");
    if(low < high){
        let pi = partition(array, low, high);
        await quicksort(array, low, pi-1);
        await quicksort(array, pi+1, high);
    }
    showbars();
    resetBarClasses();
    console.log("Quicksort done!");
}


//BUBBLESORT ALGORITHM
async function bubblesort(array) {
    console.log("Bubblesort running");
    do{
        var swapped = false;
        for(let i=1;i<array.length; i++){
            if (!shouldRun) break;
            showbars([i-1, i], 'compare');
            await new Promise(r => setTimeout(r, sortSpeed));

            if(array[i-1]>array[i]){
                swap(array, i-1, i);

                showbars([i-1, i], 'move');
                await new Promise(r => setTimeout(r, sortSpeed));

                swapped = true;
            }
        }
    }while(swapped);
    showbars();
    resetBarClasses();
    console.log("Bubblesort done!");
}

function swap(array, index1, index2){
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

function showbars(activeIndices=[], action=''){
    container.innerHTML="";
    for(let i=0; i<n; i++){
        const bar = document.createElement('div');
        bar.style.height = array[i]*100+'%';
        bar.classList.add('bar');
        
        if(activeIndices.includes(i)) {
            if (action === 'compare'){
                bar.classList.add('compare');
            } else if (action === 'move') { 
                bar.classList.add('move'); 
            } else if (action === 'swap') { 
                bar.classList.add('swap'); 
            } else if (action === 'merge') { 
                bar.classList.add('merge'); 
            } else if (action === 'pivot') { 
                bar.classList.add('pivot'); 
            } else if (action === 'minIndex') { 
                bar.classList.add('minIndex'); 
            }
        
        }
        container.appendChild(bar);
    }
}

function resetBarClasses() {
    const bars = document.getElementsByClassName('bar');
    for (let bar of bars) {
      bar.classList.remove('compare', 'move', 'swap', 'merge', 'pivot', 'minIndex');
    }
  }

