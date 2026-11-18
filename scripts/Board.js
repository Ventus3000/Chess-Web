class Board{
    //canvas creation
    canvasCreation(){
        for(let row=0; row<length; row++){
            for(let column=0; column<length; column++){
                let createsSquare = document.createElement("div");
                createsSquare.classList.add("canvas");
                if((row+column) % 2 != 0){
                    createsSquare.style.backgroundColor=whiteColor;
                }else{
                    createsSquare.style.backgroundColor=blackColor;
                }
                document.getElementById("squares").appendChild(createsSquare);
            }
        }
    }
    //board creation
    boardCreation(){
        let c = 0;
        ranks.forEach(rank => {
            files.forEach(file => {
                let createsSquare = document.createElement("div");
                createsSquare.classList.add("square");
                createsSquare.id = file+rank;
                createsSquare.value = c;
                document.getElementById("board").appendChild(createsSquare);
                c++;
            });
        });
    }
    //pieces spawn with FEN
    piecesSpawn(){
        for(let i=0, j=0; i<FEN.length; i++, j++){
            if(FEN[i] != "/"){
                if(FEN[i] == "8" || FEN[i] == "7" || FEN[i] == "6" || FEN[i] == "5" || FEN[i] == "4" || FEN[i] == "3" || FEN[i] == "2" || FEN[i] == "1"){
                    j=j+Number(FEN[i])-1;
                }else{
                    if(FEN[i] == "K" || FEN[i] == "Q" || FEN[i] == "B" || FEN[i] == "N" || FEN[i] == "R" || FEN[i] == "P"){
                        board[j].classList.add("piece","w" + FEN[i].toLowerCase());
                    }else{
                        board[j].classList.add("piece","b" + FEN[i]);
                    }
                }
            }else{
                j--;
            }
        }
    }
}