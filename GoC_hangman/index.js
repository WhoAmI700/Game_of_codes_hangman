//DOM selection
let element=document.querySelectorAll(".keyboard-button")
let word=document.getElementById("word")
let hint=document.getElementById("hint")
let validation=document.getElementById("validation")
let hangimg = document.querySelector(".upper-container img")
let victoryhangimg = document.querySelector(".game-won-display img")
let gameLost=document.querySelector(".game-lost")
let gameWon=document.querySelector(".game-won")
let correctWord=document.getElementById("correct-word")
let player_name=document.getElementById("player-name")
let submit=document.getElementById("submit")
let wlcm=document.getElementById("welcome-page")
let play=document.getElementById("playing")
let keyboard=document.getElementById("keyboard")
let pname=document.getElementById("player-info-name")
let pscore=document.getElementById("player-info-score")
let players= JSON.parse(localStorage.getItem("players"))
//words for hangman
let words=["KEYS","HAMMER","LAUGH","BOOK","BOTTLE","TIGER","RAT","KANGAROO","BAT","TURTLE","DRAGONFLY"]
let hints=["An object which can unlock other things","A part of this object is a claw","What a good joke stimulates.","Vessel of infinite knowledge","Something you uncap","The largest cat species alive","These are mammals that can carry various pathogens.","Marsupials indogenoeious to Australia","The only flying mammals","One of the oldest reptiles (predating snakes and crocodiles)","Their ancesters were monster sized in prehistoric times due to large amounts of oxygen"]
let index=-1,flag=0;

//inital word forming
let number=Math.floor(Math.random()*words.length)
let selectedWord=words[number]
console.log(selectedWord)
console.log(hints[number])
let x=""
let t=[]
let try_no=0
let guess
for(let i=0;i<selectedWord.length;i++){
    x+="-"
    t[i]=x[i]
}
console.log(x)
console.log(t)
word.innerHTML=x;
hint.innerHTML="Hint: "+hints[number]

//name inputing
submit.addEventListener("click",ispresent)
function ispresent(){
    if(player_name.value!=""){
        for(let i=0;i<players.length;i++){
            if(players[i].name == player_name.value){
                index=i
                flag=1
                break
            }
        }
        if(flag==0){
            player_obj={}
            player_obj.name= player_name.value
            player_obj.score=0
            players.push(player_obj)
            index=players.length-1
        }
    }
    else{
        player_name.style.border="2px solid red"
        player_name.placeholder="Enter a valid name!!!"
    }
    startgame()
}



//startgame and leaderboard
function startgame(){
    if(index!=-1){
        wlcm.classList.toggle("activity-killer")
        play.classList.toggle("activity-killer")
        keyboard.classList.toggle("activity-killer")
        pname.innerHTML=players[index].name
        pscore.innerHTML=players[index].score
    }
    else{
        player_name.style.border="5px solid red"
        player_name.placeholder="Enter a valid name!!!"
    }
}


//conditions
let lost=()=>{
    console.log("at lost")
    gameLost.classList.add("display")
    correctWord.innerHTML=selectedWord
    localStorage.setItem("players",JSON.stringify(players))
}
let victory=()=>{
    console.log("at victory")
    gameWon.classList.add("display")
    victoryhangimg.src=`hangman-${try_no}.svg`
    players[index].score+=10
    localStorage.setItem("players",JSON.stringify(players))
}
//playing
function playagain(){
    index=-1;flag=0 
    number=Math.floor(Math.random()*words.length)
    selectedWord=words[number]
    x=""
    t=[]
    try_no=0
    guess
    for(let i=0;i<selectedWord.length;i++){
        x+="-"
        t[i]=x[i]
    }
    console.log(x)
    console.log(t)
    word.innerHTML=x;
    hint.innerHTML="Hint: "+hints[number]
    validation.innerHTML=""
    hangimg.src=`hangman-${try_no}.svg`
    if(gameWon.classList.contains("display")){
        gameWon.classList.remove("display")
    }
    else{
        gameLost.classList.remove("display")
    }
    element.forEach(item=>{
        checker=item.classList.contains("enabled")
        if(!(checker)){
            item.classList.add("enabled")
        }
    })
    ispresent()
}



//keyboard working--for now
element.forEach(item => {
    item.addEventListener("click",()=>{
        let checker=item.classList.contains("enabled")
        if(checker){
            console.log("is present..... am removing")
            item.classList.remove("enabled")
            guess=item.innerHTML
            x=""
            if(selectedWord.includes(guess)){
                for(let i=0;i<selectedWord.length;i++){
                    if(selectedWord[i]==guess){
                        t[i]=guess
                    }
                    x+=t[i]
                }
                word.innerHTML=x
                if(x!=selectedWord)
                {    
                    validation.innerHTML="Congrats you guessed a letter"
                }
                else{
                    victory()
                }
                validation.style.color= "green"
            }
            else{
                try_no++
                console.log(try_no)
                if(try_no==6){
                    lost()
                }              
                hangimg.src=`hangman-${try_no}.svg`
                validation.innerHTML=`Sorry ${guess} is not present in the word`
                validation.style.color= "red"
            }
        }
        else{
            console.log("not working anymore")
            validation.innerHTML="Cannot enter same key again"
            validation.style.color= "red"
        }
        validation.style.fontSize="1.5rem"
        validation.style.marginLeft="1rem"
        validation.style.padding="0.8rem"
    })
})