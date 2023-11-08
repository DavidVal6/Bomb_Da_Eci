package edu.eci.arsw;

import java.util.Random;

public class Board {
    
    private Box[][] board;
    private static final int size = 15;

    public Board(int boosts) {
        board = new Box[size][size];
        initializeBoard();
        generateBoosts(boosts);
    }

    private void initializeBoard(){
        for(int y = 0; y < size; y++){
            board[0][y] = new Block(0, y, false);
            board[size][y] = new Block(size, y, false);
        }
        for(int x = 1; x < size-1; x++){
            board[x][0] = new Block(x, 0, false);
            board[x][size] = new Block(x, size, false);
        }

        for(int x = 6; x < 9; x++){
            for(int y = 6; y < 9; y++){
                board[x][y] = new Block(x, y, false);
            }
        }
    }

    private void generateBoosts(int amount) {
    }
}
