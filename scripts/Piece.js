class Piece{
    constructor(){
        this.targetFile;
        this.targetRank;
        this.targetSquare;
    }
    setUp(selectedPiece){
        this.job = selectedPiece.className.charAt(jobPosition);
        this.color = selectedPiece.className.charAt(colorPosition);
        this.fileValue = selectedPiece.id.charAt(0);
        this.rankValue = selectedPiece.id.charAt(1);
        //find piece file position in files array
        for(let i=0; i<8; i++){
            if(selectedPiece.id.charAt(0) == files[i])
                this.startFile = i;
        }
        //find piece rank position in ranks array
        for(let j=0; j<8; j++){
            if(selectedPiece.id.charAt(1) == ranks[j])
                this.startRank = j;
        }
    }
    stepsMoves(x, y){
        this.targetFile = this.startFile+x;
        this.targetRank = this.startRank+y;
        if(this.targetFile>=0 && this.targetFile<8 && this.targetRank>=0 && this.targetRank<8){
            this.targetSquare = document.getElementById(files[this.targetFile]+ranks[this.targetRank]);
            if(this.targetSquare.className.includes("piece")){
                if(this.targetSquare.className.charAt(colorPosition) == enemyColor){
                    board[this.targetSquare.value].classList.add("targeted");
                }
                return;
            }else{
                board[this.targetSquare.value].classList.add("targeted");
            }
        }
    }
    slidingMoves(x, y){
        for(let increment = 1; increment <= 8; increment++){
            this.targetFile = this.startFile+x*increment;
            this.targetRank = this.startRank+y*increment;
            if(this.targetFile>=0 && this.targetFile<8 && this.targetRank>=0 && this.targetRank<8){
                this.targetSquare = document.getElementById(files[this.targetFile]+ranks[this.targetRank]);
                if(this.targetSquare.className.includes("piece")){
                    if(this.targetSquare.className.charAt(colorPosition) == enemyColor){
                        board[this.targetSquare.value].classList.add("targeted");
                    }
                    return;
                }else{
                    board[this.targetSquare.value].classList.add("targeted");
                }
            }
        }
    }
    pawnMove(x, y){
        this.targetFile = this.startFile+x;
        this.targetRank = this.startRank+y;
        if(this.targetFile>=0 && this.targetFile<8 && this.targetRank>=0 && this.targetRank<8){
            this.targetSquare = document.getElementById(files[this.targetFile]+ranks[this.targetRank]);
            if(this.targetSquare.className.includes("piece")){
                return;
            }else{
                board[this.targetSquare.value].classList.add("targeted");
                if(this.rankValue == 2 || this.rankValue == 7){
                    this.targetFile = this.startFile+x*2;
                    this.targetRank = this.startRank+y*2;
                    if(this.targetFile>=0 && this.targetFile<8 && this.targetRank>=0 && this.targetRank<8){
                        this.targetSquare = document.getElementById(files[this.targetFile]+ranks[this.targetRank]);
                        if(this.targetSquare.className.includes("piece")){
                            return;
                        }else{
                            board[this.targetSquare.value].classList.add("targeted");
                        }
                    }
                }
            }
        }
    }
    pawnCapturing(x, y){
        this.targetFile = this.startFile+x;
        this.targetRank = this.startRank+y;
        if(this.targetFile>=0 && this.targetFile<8 && this.targetRank>=0 && this.targetRank<8){
            this.targetSquare = document.getElementById(files[this.targetFile]+ranks[this.targetRank]);
            if(this.targetSquare.className.includes("piece")){
                if(this.targetSquare.className.charAt(colorPosition) == enemyColor){
                    board[this.targetSquare.value].classList.add("targeted");
                }
                return;
            }
        }
    }
    pawnPromotion(target){
        this.targetSquare = target;
        this.targetSquare.className = this.targetSquare.className.slice(this.targetSquare.className.length-jobPosition-1, -1);
        this.targetSquare.className += "q";
    }
    // pawnEnPassant(x, y){

    // }
    /*casteling(x, y, rookId){
        for(let increment = 1; increment <= 4; increment++){
            this.targetFile = this.startFile+x*increment;
            this.targetRank = this.startRank+y*increment;
            if(this.targetFile>=0 && this.targetFile<8 && this.targetRank>=0 && this.targetRank<8){
                this.targetSquare = document.getElementById(files[this.targetFile]+ranks[this.targetRank]);
                if(this.targetSquare.className.includes("piece")){
                    if(this.targetSquare.id == rookId){
                        board[document.getElementById("g1").value].classList.add("targeted");
                    }
                    return;
                }else{
                    
                }
            }
        }
    }*/
}