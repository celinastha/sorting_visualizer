const array=[];
var n = 10; 
var sortType = bubblesort;

var slider = document.getElementById('rangeSlider');
var sliderOutput = document.getElementById('sliderOutput');
var type = document.getElementById('sortTypeDropdown');
var typeOutput = document.getElementById('sortTypeOut');
console.log("sort1: " + sortType);


sliderOutput.innerHTML = slider.value;
slider.oninput = function() {
    sliderOutput.innerHTML = this.value;
}
type.onchange = function(){
    typeOutput.innerHTML = type.value;
    sortType = type.value;//red
}
n = slider.value;


document.getElementById("playBtn").addEventListener('click', (e) =>{
    e.preventDefault();
    n = slider.value;
    sortType = type.value;//red
    play();
});

document.getElementById("init").addEventListener('click', (e) =>{
    e.preventDefault();
    n = slider.value;
    init();
});

init();



function init(){
    const n = sliderOutput.innerHTML;
    for(let i=0; i<n; i++){
        array[i] = Math.random();
    }
    console.log(array);
    showbars();
}

function play(){
    const arrayCopy = [...array]; 
    var sortmoves=[];
    if(sortType == "bubblesort"){
        sortmoves = bubblesort(arrayCopy);
    } else if(sortType == "quicksort"){
        sortmoves = quicksort(arrayCopy);
    }
    animate(sortmoves);
}

function animate(moves){
    if(moves.length==0){
        showbars();
        return;
    }
    const move= moves.shift();
    const [i,j] = move.indices;

    if(move.type=='swap'){
        [array[i], array[j]] = [array[j], array[i]];   
    }

    showbars(move);
    setTimeout(() => {
        animate(moves);
    },10);
}



function partition(array, low, high, moves){
    var pivot = array[high];
    var i = low-1;
    for(let j=low; j<=high; j++){
        moves.push({indices: [i, j], type: 'sel'});
        if(array[j] < pivot){
            i++;
            moves.push({indices: [i, j], type: 'swap'});
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    [array[i+1], array[high]] = [array[high], array[i+1]];
    return i+1;
}
function quicksort(array){
    const moves = [];
    var low = 0;
    var high = array.length - 1;
    if(low < high){
        var pi = partition(array, low, high, moves);
        quicksort(array, low, pi-1);
        quicksort(array, pi+1, high);
    }
    return moves;
}



function bubblesort(array) {
    const moves = [];
    do{
        var swapped = false;
        for(let i=1;i<array.length; i++){
            moves.push({indices: [i-1, i], type: 'selec'});
            if(array[i-1]>array[i]){
                moves.push({indices: [i-1, i], type: 'swap'});
                [array[i-1], array[i]] = [array[i], array[i-1]];   
                swapped = true;
            }
        }
    }while(swapped);
    return moves;
}

function showbars(move){
    container.innerHTML="";
    for(let i=0; i<n; i++){
        const bar = document.createElement('div');
        bar.style.height = array[i]*100+'%';
        bar.style.width = '10px';
        bar.style.backgroundColor = 'grey'

        if(move && move.indices.includes(i)){
            bar.style.backgroundColor = 
                move.type=='swap'?'red':'blue';
        }
        container.appendChild(bar);
    }
}