package edu.eci.arsw;

public class Box {

    protected int x;
    protected int y;
    protected boolean hasPowerUp;
    protected PowerUp ownPowerUp;

    public Box(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public void setPowerBoost(PowerUp pu) {
        hasPowerUp = true;
        ownPowerUp = pu;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public Boolean isEmpty() {
        return true;
    }
}
