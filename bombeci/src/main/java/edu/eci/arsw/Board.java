package edu.eci.arsw;

import java.util.Random;

public class Board {
    
    private Box[][] board;
    private static final int size = 12;

    public Board() {
        board = new Box[size][size];
        initializeBoard();
        generateBoosts();
    }

    private void initializeBoard(){
        int[][] tempBoard = {
            {1,1,1,1,1,1,1,1,1,1,1,1},
            {1,0,0,2,0,2,0,2,2,0,0,1},
            {1,0,1,0,0,2,2,0,0,0,0,1},
            {1,2,0,2,2,1,1,2,2,0,2,1},
            {1,2,0,1,0,2,2,0,1,0,0,1},
            {1,0,2,0,2,1,1,2,0,2,2,1},
            {1,2,2,0,2,1,1,2,0,2,0,1},
            {1,0,0,1,0,2,2,0,1,0,2,1},
            {1,2,0,2,2,1,1,2,2,0,2,1},
            {1,0,1,0,0,2,2,0,0,1,0,1},
            {1,0,0,2,2,0,2,0,2,0,0,1},
            {1,1,1,1,1,1,1,1,1,1,1,1}
        };


        for (int i = 0; i < size; i++){
            for (int j = 0; j < size; j++){
                if (tempBoard[i][j] == 1){
                    board[i][j] = new Block(i, j, false);
                } else if (tempBoard[i][j] == 2) {
                    board[i][j] = new Block(i, j, true);
                }
            }
        }
    }

    private void generateBoosts() {
    }
}
