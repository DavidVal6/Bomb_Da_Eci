package edu.eci.arsw;

public class Game {

    public GameMode gameMode;
    
    public Board board;

    Player player1;
    Player player2;
    Player player3;
    Player player4;

    public void orchest(){
        board = new Board();
        switch (gameMode) {
            case SINGLE_PLAYER:
                player1 = new Player(1, 1, "FixedName1", false);
                player1.setBoard(board);
                break;
        
            case MULTI_PLAYER:
                player1 = new Player(1, 1, "FixedName1", false);
                player2 = new Player(1, 10, "FixedName2", false);
                player3 = new Player(10, 1, "FixedName3", false);
                player4 = new Player(10, 10, "FixedName4", false);

                player1.setBoard(board);
                player2.setBoard(board);
                player3.setBoard(board);
                player4.setBoard(board);
                break;
        }
        

    }
}
