const array=[];
var n = 10; 
var sortType = bubblesort;
var sortSpeed = 100;
var shouldRun = true; 

const slider = document.getElementById('rangeSlider');
const sliderOutput = document.getElementById('sliderOutput');
const type = document.getElementById('sortTypeDropdown');
const speed = document.getElementById('sortSpeed');
const sortStatus = document.getElementById('sortStatus');

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

document.getElementById("initBtn").addEventListener('click', (e) =>{
    e.preventDefault();
    init();
});

document.getElementById("stopBtn").addEventListener('click', (e) =>{
    e.preventDefault();
    shouldRun = false;
    setStatus("stopped");
    
});


function init(){
    const n = sliderOutput.innerHTML;
    for(let i=0; i<n; i++){
        array[i] = Math.random();
    }
    reset();
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
    setStatus("InsertionSort", "running...");
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
    reset();
    setStatus("InsertionSort", "done!");
}


//SELECTIONSORT ALGORITHM
async function selectionsort(array){
    setStatus("SelectionSort", "running...");
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
    reset();
    setStatus("SelectionSort", "done!");
}

//MERGESORT ALGORITHM
async function merge(array, left, mid, right){
    const leftArray = new Array(mid-left+1);
    const rightArray = new Array(right-mid);

    for(let i=0; i<leftArray.length; i++){
        if (!shouldRun) break;
        leftArray[i] = array[left + i];
    }
    for(let j=0; j<rightArray.length; j++){
        if (!shouldRun) break;
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
        if (!shouldRun) break;
        array[k] = leftArray[i];
        i++;
        k++;
        showbars([k - 1], 'merge'); 
        await new Promise(r => setTimeout(r, sortSpeed));
    }

    while(j < rightArray.length){
        if (!shouldRun) break;
        array[k] = rightArray[j];
        j++;
        k++;
        showbars([k - 1], 'merge'); 
        await new Promise(r => setTimeout(r, sortSpeed));
    }   
}
async function mergesort(array, left, right){
    setStatus("MergeSort", "running...");
    if(left < right){
        const mid = Math.floor(left + (right-left) / 2);
        await mergesort(array, left, mid);
        await mergesort(array, mid+1, right);
        await merge(array, left, mid, right);
    }
    if (left === 0 && right === array.length - 1) { 
        showbars();
        reset();
        setStatus("MergeSort", "done!");
    }
    
}

//QUICKSORT ALGORITHM  
async function partition(array, low, high){
    let pivot = array[high];
    showbars([high], 'pivot'); 
    await new Promise(r => setTimeout(r, sortSpeed));
    
    let i = low-1;

    for(let j=low; j<high; j++){
        if (!shouldRun) break;
        showbars([j, high], 'compare'); 
        await new Promise(r => setTimeout(r, sortSpeed));
        
        if(array[j] <= pivot){
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
    setStatus("QuickSort", "running...");
    if(low < high){
        let pi = await partition(array, low, high);
        await quicksort(array, low, pi-1);
        await quicksort(array, pi+1, high);
    }
    showbars();
    reset();
    setStatus("QuickSort", "done!");
}


//BUBBLESORT ALGORITHM
async function bubblesort(array) {
    setStatus("BubbleSort", "running...");
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
    reset();
    setStatus("BubbleSort", "done!");
    
}

function swap(array, index1, index2){
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

function showbars(activeIndices=[], action=''){
    const barContainer = document.querySelector('#barContainer');
    barContainer.innerHTML="";
    let m = 0;
    if(n<=12){
        m=70;
    } else if(n<=18){
        m=50;
    } else if(n<=40){
        m=20;
    } else if(n<=65){
        m=10;
    } else if(n<=100){
        m=5;
    } else if(n<=130){
        m=3;
    } else{
        m=2;
    }
    const containerWidth = barContainer.clientWidth; 
    const barWidth = Math.max(m, (containerWidth / array.length) - 2);
    for(let i=0; i<n; i++){
        const bar = document.createElement('div');
        bar.style.height = array[i]*100+'%';
        bar.style.width = `${barWidth}px`;
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
        barContainer.appendChild(bar);
    }
}

function reset() {
    const bars = document.getElementsByClassName('bar');
    for (let bar of bars) {
      bar.classList.remove('compare', 'move', 'swap', 'merge', 'pivot', 'minIndex');
    }
    sortStatus.classList.remove("stopped", "running", "done");
}

function setStatus(sortingType, status){
    if(!shouldRun || status == "stopped"){
        sortStatus.classList.add("stopped");
        sortStatus.classList.remove("running", "done");
        sortStatus.innerHTML = "Sorting stopped";
        console.log("Sorting stopped");
    }
    if(shouldRun){
        if(status == "running..."){
            sortStatus.classList.add("running");
            sortStatus.classList.remove("stopped", "done");
        } else if(status == "done!"){
            sortStatus.classList.add("done");
            sortStatus.classList.remove("stopped", "running");
        }
        sortStatus.innerHTML = sortingType + " is " + status;
        console.log(sortingType + " is " + status);
    }
    
}

