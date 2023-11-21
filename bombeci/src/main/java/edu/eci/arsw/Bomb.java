package edu.eci.arsw;

public class Bomb extends Box{

    private int timer;

    public Bomb(int x, int y) {
        super(x, y);
        timer = 3000;
    }

    @Override
    public Boolean isEmpty(){
        return false;
    }
    
}
