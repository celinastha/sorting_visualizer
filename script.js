const array=[];
var n = 10; 
var sortType = bubblesort;

var slider = document.getElementById('rangeSlider');
var sliderOutput = document.getElementById('sliderOutput');
var type = document.getElementById('sortTypeDropdown');


sliderOutput.innerHTML = slider.value;
slider.oninput = function() {
    sliderOutput.innerHTML = this.value;
    n = slider.value;
    init();
}

init();

document.getElementById("playBtn").addEventListener('click', (e) =>{
    e.preventDefault();
    console.log(array);
    sortType = type.value;
    play();
});

document.getElementById("init").addEventListener('click', (e) =>{
    e.preventDefault();
    init();
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
    showbars();
}

//INSERSIONSORT ALGORITHM
function insertionsort(array){
    console.log("Insertionsort running");
    for(let i=1; i<array.length; i++){
        let key = array[i];
        let j=i-1;

        while(j>=0 && array[j]>key){
            array[j+1] = array[j];
            j=j-1;
        }
        array[j+1] = key;
    }
    console.log("Insertionsort done!");
}


//SELECTIONSORT ALGORITHM
function selectionsort(array){
    console.log("Selectionsort running");
    for(let i=0; i<array.length-1; i++){
        let minIndex = i;
        for(let j=i+1; j<array.length; j++){
            if(array[j] < array[minIndex]){
                minIndex = j;
            }
        }
        swap(array, i, minIndex);
    }
    console.log("Selectionsort done!");
}

//MERGESORT ALGORITHM
function merge(array, left, mid, right){
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
        if(leftArray[i]<=rightArray[j]){
            array[k] = leftArray[i];
            i++;
        } else{
            array[k] = rightArray[j];
            j++;
        }
        k++;
    }

    while(i < leftArray.length){
        array[k] = leftArray[i];
        i++;
        k++;
    }

    while(j < rightArray.length){
        array[k] = rightArray[j];
        j++;
        k++;
    }   
}
function mergesort(array, left, right){
    console.log("Mergesort running");
    if(left < right){
        var mid = Math.floor(left + (right-left) / 2);
        mergesort(array, left, mid);
        mergesort(array, mid+1, right);
        merge(array, left, mid, right);
    }
    console.log("Mergesort done!");
}

//QUICKSORT ALGORITHM  
function partition(array, low, high){
    let pivot = array[high];
    let i = low-1;
    for(let j=low; j<=high; j++){
        if(array[j] < pivot){
            i++;
            swap(array, i, j);
        }
    }
    swap(array, i+1, high)
    return i+1;
}
function quicksort(array, low, high){
    console.log("Quicksort running");
    if(low < high){
        let pi = partition(array, low, high);
        quicksort(array, low, pi-1);
        quicksort(array, pi+1, high);
    }
    console.log("Quicksort done!");
}


//BUBBLESORT ALGORITHM
function bubblesort(array) {
    console.log("Bubblesort running");
    do{
        var swapped = false;
        for(let i=1;i<array.length; i++){
            if(array[i-1]>array[i]){
                swap(array, i-1, i);   
                swapped = true;
            }
        }
    }while(swapped);
    console.log("Bubblesort done!");
}

function swap(array, index1, index2){
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

function showbars(move){
    container.innerHTML="";
    for(let i=0; i<n; i++){
        const bar = document.createElement('div');
        bar.style.height = array[i]*100+'%';
        bar.style.width = '10px';
        bar.style.backgroundColor = 'grey'
        container.appendChild(bar);
    }
}