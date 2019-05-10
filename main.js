

let board = document.getElementById("board")

let ctx  = board.getContext("2d")
const body = document.getElementById("body")

let field = []
let movements = []
let player = 1
let player1TurnCounter = 0
let player2TurnCounter = 0
let currentPosition
let header = document.getElementById("title")
let counter1 = document.getElementById("counter1")
let counter2 = document.getElementById("counter2")
let mouseCoordinates = [380,237]



const drawLine = (x,y)=>{

    console.log('drawing line',x,y)
        
        ctx.lineTo(x, y);
        ctx.stroke();

    }
   
    function getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y+6, left: _x +4};
    }
    
    

const initialize = ()=>{
    board.width = board.width
    movements=[]
    ctx.strokeStyle = "green";
ctx.lineWidth = 5
ctx.lineCap = "round"
ctx.lineJoin = "round"
ctx.beginPath()
ctx.moveTo(0,0)
ctx.beginPath()
ctx.moveTo(240,326)
    counter=1
    for ( x = 0 ; x<13 ; x++){
        field[x]=[]
        for( y = 0 ;y<9;y++){
            field[x][y] = {}
            field[x][y].position = counter
            if(y===0 || y===8 || field[x][y].position === 59 ){
                field[x][y].touch = 1
            }else{
                field[x][y].touch = 0
            }
            counter++
        }
    }
    currentPosition = field[6][4]
    currentCoordinates = [6,4]
    drawBoard()
    
}

const drawBoard = ()=>{
    header.textContent = player===2? "player 2's turn":"player 1's turn"
    counter1.textContent = "player 1 turn count: "+player1TurnCounter
    counter2.textContent = "player 2 turn count: "+player2TurnCounter
    body.innerHTML = ""
    
   
    
    for (let x = 0 ; x<13 ; x++){
        for(let y = 0 ;y<9;y++){

            let id = field[x][y].position
            let disabled = true
            
            if(x<12 && x>0){
                if (currentCoordinates[1]===0){
                    console.log("player standing in border position "+currentPosition.position)
                    if( id!==currentPosition.position && ( (id === currentPosition.position - 8) || (id ===currentPosition.position+1)  || (id === currentPosition.position + 10)) ){
    
                        console.log(` value  ${id } remove disable`)
                        disabled=false
        
                    }
    
                    body.innerHTML +=  
                    `
                    <button class=" ${player===1 && id===currentPosition.position? 'player1':''}  ${player===2 && id===currentPosition.position? 'player2':''}  ${id===currentPosition.position? 'current':'point'}" ${disabled? 'disabled="true"':""} id= "${id}"onclick="move(${x},${y})"> ${id===currentPosition.position? '<i class="fa fa-soccer-ball-o"></i>':""}  </button>
                    `
                }else if( currentCoordinates[1]===8){
                    console.log("player standing in border position "+currentPosition.position)
                    if( id!==currentPosition.position && ( (id === currentPosition.position-10) || (id ===currentPosition.position-1)  || (id ===currentPosition.position +8)) ){
    
                        console.log(` value  ${id } remove disable`)
                        disabled=false
        
                    }
    
                    body.innerHTML +=  
                    `
                    <button class=" ${player===1 && id===currentPosition.position? 'player1':''}  ${player===2 && id===currentPosition.position? 'player2':''}  ${id===currentPosition.position? 'current':'point'}" ${disabled? 'disabled="true"':""} id= "${id}"onclick="move(${x},${y})"> ${id===currentPosition.position? '<i class="fa fa-soccer-ball-o"></i>':""}  </button>
                    `
                }else{
                    if( id!==currentPosition.position && ( (id >= currentPosition.position-10 && id <= currentPosition.position - 8) || (id >= currentPosition.position - 1 && id <=currentPosition.position+1)  || (id >= currentPosition.position +8  && id <= currentPosition.position + 10)) ){
                        console.log(` value  ${id } remove disable`)
                        disabled=false
        
                    }
                body.innerHTML +=  
                `
                <button class=" ${player===1 && id===currentPosition.position? 'player1':''}  ${player===2 && id===currentPosition.position? 'player2':''}   ${id===currentPosition.position? 'current':'point'}" ${disabled? 'disabled="true"':""} id= "${id}"onclick="move(${x},${y})"> ${id===currentPosition.position? '<i class="fa fa-soccer-ball-o"></i>':""}   </button>
                `
                }
            }else{
                let visible = false
                if(y>2 && y<6){
                    visible = true
                }
                if( id!==currentPosition.position && currentCoordinates[1]>2 && currentCoordinates[1]<6 &&((id >= currentPosition.position-10 && id <= currentPosition.position - 8) || (id >= currentPosition.position - 1 && id <=currentPosition.position+1)  || (id >= currentPosition.position +8  && id <= currentPosition.position + 10)) ){
                    console.log(` value  ${id } remove disable`)
                    disabled=false
    
                }
                body.innerHTML +=  
                `
                <button class="  ${x===12 ? 'player2goal':''} ${x===0? 'player1goal':''} ${player===1 && id===currentPosition.position? 'player1':''}  ${player===2 && id===currentPosition.position? 'player2':''}  ${id===currentPosition.position? 'current':'point'}" ${disabled? 'disabled="true"':""} ${visible? '':'style="visibility:hidden"'} id= "${id}"onclick="move(${x},${y})"> ${id===currentPosition.position? '<i class="fa fa-soccer-ball-o"></i>':""} </button>
                `
            }
        
            
        }
        body.innerHTML += `
        </br>
        `
    }

   
}


const move = (x,y)=>{

    let destination = field[x][y]
    var elementPosition = getOffset( document.getElementById(`${destination.position}`) ); 
    console.log('the clicked elements position is : ',elementPosition)
    
    console.log(`storing  ${destination.position}*${currentPosition.position} = ${destination.position*currentPosition.position} `)
    
    let condition = movements.find((element)=>{
        
            return element === destination.position*currentPosition.position
    }) || -1
    console.log(`condition is ${condition}`)
    if (condition===-1){
        
        movements.push(destination.position*currentPosition.position)
        currentPosition = destination
        currentCoordinates = [x,y]
        if(currentPosition.position<10){
            alert(`PLAYER 2  WINS!!`)
            initialize()
        }else if (currentPosition.position>108){
            alert(`PLAYER 1 WINS!!`)
            initialize()
        }
        console.log("all movements until now",movements)
        if(player===1){
            player1TurnCounter++
        }else{
            player2TurnCounter++
        }
        if(currentPosition.touch ===1){
            player = player
        }else{
            player = player===1 ? 2:1

        }
        field[x][y].touch = 1
        drawBoard()
        drawLine(elementPosition.left,elementPosition.top)
        // alert(`its player ${player}'s turn `)
    }else{
        alert("you cannot move there!!")
    }

}





initialize()




