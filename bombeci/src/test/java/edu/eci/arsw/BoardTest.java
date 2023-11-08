package edu.eci.arsw;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class BoardTest {
    
    @Test
    public void ShouldPutAllBetterBombs(){
        Board board = new Board();
        int bombs = board.getBomb();
        assertEquals(0, bombs);
    }
    @Test
    public void ShouldPutAllRadius(){
        Board board = new Board();
        int radius = board.getRadius();
        assertEquals(0, radius);
    }
    @Test
    public void ShouldPutAllShields(){
        Board board = new Board();
        int shields = board.getShield();
        assertEquals(0, shields);
    }




}
