// let squares = [];
// for(let i = 0; i < 8; i++){
//     squares[i] = [];
//     for(let j = 0; j < 8; j++){
//         squares[i][j] = "0";
//     }
// }
// console.log(squares);
let turn = "w";
let pieceBeingDragged, pieceClassBeingReplaced, pieceBeingClicked = "", target , enemyColor;
const boardSetUp = new Board();
const piece = new Piece();
boardSetUp.canvasCreation();
boardSetUp.boardCreation();
const board = document.querySelectorAll(".square");
boardSetUp.piecesSpawn();
board.forEach(square => square.addEventListener("dragstart", dragStart));
board.forEach(square => square.addEventListener("dragsend", dragEnd));
board.forEach(square => square.addEventListener("dragover", dragOver));
board.forEach(square => square.addEventListener("dragenter", dragEnter));
board.forEach(square => square.addEventListener("drop", dragDrop));
board.forEach(square => square.addEventListener("click", click));
function targetSquares(selectedPiece){
    piece.setUp(selectedPiece);
    //find enemy color
    if(piece.color != turn){
        return;
    }
    enemyColor = piece.color == "w" ? "b" : "w";
    if(piece.job == "k"){ 
        //king 
        //top ranks
        piece.stepsMoves(-1, -1);
        piece.stepsMoves(0, -1);
        piece.stepsMoves(1, -1);
        //center ranks
        piece.stepsMoves(-1, 0);
        piece.stepsMoves(1, 0);
        //bottom ranks
        piece.stepsMoves(-1, 1);
        piece.stepsMoves(0, 1);
        piece.stepsMoves(1, 1);
        // if(selectedPiece.id == "e1" || selectedPiece.id == "e8"){
        //     piece.casteling(-1, 0, piece.color=="w" ? "a1" : "a8");
        //     piece.casteling(1, 0,  piece.color=="w" ? "h1" : "h8");
        // }
    }else if(piece.job == "q"){
        //queen
        //top-left moves
        piece.slidingMoves(-1, -1);
        //top-right moves
        piece.slidingMoves(1, -1);
        //bottom-right moves
        piece.slidingMoves(1, 1);
        //bottom-left moves
        piece.slidingMoves(-1, 1);
        //top moves
        piece.slidingMoves(0, -1);
        //right moves
        piece.slidingMoves(1, 0);
        //bottom moves
        piece.slidingMoves(0, 1);
        //top moves
        piece.slidingMoves(-1, 0);
    }else if(piece.job == "b"){
        //bishop
        //top-left moves
        piece.slidingMoves(-1, -1);
        //top-right moves
        piece.slidingMoves(1, -1);
        //bottom-right moves
        piece.slidingMoves(1, 1);
        //bottom-left moves
        piece.slidingMoves(-1, 1);
    }else if(piece.job == "n"){
        //knight
        //top moves
        piece.stepsMoves(-1, -2);
        piece.stepsMoves(1, -2);
        //right moves
        piece.stepsMoves(2, -1);
        piece.stepsMoves(2, 1);
        //bottom moves
        piece.stepsMoves(-1, 2);
        piece.stepsMoves(1, 2);
        //left moves
        piece.stepsMoves(-2, -1);
        piece.stepsMoves(-2, 1);
    }else if(piece.job == "r"){
        //rook
        //top moves
        piece.slidingMoves(0, -1);
        //right moves
        piece.slidingMoves(1, 0);
        //bottom moves
        piece.slidingMoves(0, 1);
        //top moves
        piece.slidingMoves(-1, 0);
    }else if(piece.job == "p"){
        piece.pawnMove( 0, piece.color=="w" ? -1: 1);
        piece.pawnCapturing( 1, piece.color=="w" ? -1: 1);
        piece.pawnCapturing( -1, piece.color=="w" ? -1: 1);
    }
}
function clear(){
    board.forEach(piece => {
        piece.classList.remove("targeted");
        pieceBeingClicked = "";
    });
}
function click(){
    if(this.className.includes("targeted")){
        moveTo(this, pieceBeingClicked);
    }else if(this.className.includes("piece")){
        if(pieceBeingClicked == this){
            clear();
        }else{
            if(pieceBeingClicked != ""){
                clear();            
            }
            pieceBeingClicked = this;
            targetSquares(pieceBeingClicked);
        }
    }
}
function dragStart(){
    if(this.className.includes("piece")){
        if(pieceBeingClicked != ""){
            clear();            
        }
        pieceBeingDragged = this;
        targetSquares(pieceBeingDragged);
    }
}
function dragEnd(event) {
    event.preventDefault();
}
function dragOver(event) {
    event.preventDefault();
}
function dragEnter(event) {
    event.preventDefault();
}
function dragLeave(event) {
    event.preventDefault();
}
function dragDrop() {
    if(this.className.includes("targeted")){
        moveTo(this, pieceBeingDragged);
    }

}
function moveTo(target, pieceBeingMoved){
    if(target.className != pieceBeingMoved.className && pieceBeingMoved.className.charAt(colorPosition) != target.className.charAt(colorPosition)){
        target.className = pieceBeingMoved.className;
        target.name = pieceBeingMoved.name;
        board[pieceBeingMoved.value].className = "boardSquare";
        board[pieceBeingMoved.value].name = "";
        //pawn promotion
        if(target.className.charAt(jobPosition) == "p" && (target.id.charAt(1) == "8" || target.id.charAt(1) == "1")){
            piece.pawnPromotion(target);
        }
        turn = enemyColor;
        clear();
    }
}
