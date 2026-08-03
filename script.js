const letters = [
    "ㄱ","ㄴ","ㄷ","ㄹ","ㅁ",
    "ㅂ","ㅅ","ㅇ","ㅈ","ㅊ",
    "ㅋ","ㅌ","ㅍ","ㅎ","ㅏ",
    "ㅑ","ㅓ","ㅕ","ㅗ","ㅛ",
    "ㅜ","ㅠ","ㅡ","ㅣ","ㅇ2"
];

let totalHints = 0;
let remainHints = 0;
let usedButtons = [];


// 화면 요소

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

const hintCountSelect = document.getElementById("hintCount");
const startBtn = document.getElementById("startBtn");

const buttonGrid = document.getElementById("buttonGrid");

const remainText = document.getElementById("remainText");



// 팝업

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupHint = document.getElementById("popupHint");
const closePopup = document.getElementById("closePopup");



// 시작 버튼

startBtn.addEventListener("click",()=>{

    totalHints = Number(hintCountSelect.value);

    remainHints = totalHints;

    usedButtons = [];


    startScreen.style.display="none";

    gameScreen.style.display="block";


    createButtons();

    updateRemain();

});




// 버튼 만들기

function createButtons(){

    buttonGrid.innerHTML="";


    letters.forEach((letter,index)=>{


        const btn=document.createElement("button");


        btn.className="problemBtn";


        btn.innerText = letter==="ㅇ2" ? "ㅇ" : letter;


        btn.dataset.index=index;


        btn.addEventListener("click",()=>{

            openHint(letter,btn);

        });


        buttonGrid.appendChild(btn);


    });

}




// 힌트 열기

function openHint(letter,btn){


    if(btn.classList.contains("used")){

        showHintPopup(letter);

        return;

    }


    if(remainHints<=0){

        alert("사용 가능한 힌트가 없습니다.");

        return;

    }



    remainHints--;

    usedButtons.push(letter);


    btn.classList.add("used");


    updateRemain();



    showHintPopup(letter);



    if(remainHints===0){

        setTimeout(()=>{

            alert("모든 힌트를 사용했습니다.");

        },300);

    }


}



// 힌트 팝업 표시

function showHintPopup(letter){

    popupTitle.innerText =
        letter==="ㅇ2" ? "ㅇ" : letter;


    popupHint.innerText =
        hints[letter] || 
        "아직 등록된 힌트가 없습니다.";



    popup.style.display="flex";

}




// 남은 힌트 표시

function updateRemain(){

    remainText.innerText =
        `남은 힌트 : ${remainHints}개`;

}




// 팝업 닫기

closePopup.addEventListener("click",()=>{

    popup.style.display="none";

});



// 팝업 바깥 클릭 닫기

popup.addEventListener("click",(e)=>{

    if(e.target===popup){

        popup.style.display="none";

    }

});