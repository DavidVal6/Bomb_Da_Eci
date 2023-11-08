package edu.eci.arsw;

public class Game {
    
    public Board board;

    Player player1;
    Player player2;
    Player player3;
    Player player4;

    public void orchest(){
        board = new Board(0);
        player1 = new Player(1, 1, "FixedName1", false);
        player1.setBoard(board);

    }
}
