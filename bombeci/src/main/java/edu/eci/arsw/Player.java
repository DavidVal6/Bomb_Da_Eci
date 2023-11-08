package edu.eci.arsw;

public class Player{

    private int xPosition;
    private int yPosition;

    private String name;
    private boolean isAlive;
    private boolean isImmortal;
    

    private int kills;
    private int bombs;
    private int explosionRadius;
    private int shields;
    private Board board;

    public Player(int xPosition, int yPosition, String name, boolean isImmortal) {
        setXPosition(xPosition);
        setYPosition(yPosition);
        setName(name);;
        setImmortal(isImmortal);
        setAlive(true);

        kills = 0;
        bombs = 1;
        explosionRadius = 1;
        shields = 0;
    }

    public int getXPosition() {
        return xPosition;
    }
    public void setXPosition(int xPosition) {
        this.xPosition = xPosition;
    }

    public int getYPosition() {
        return yPosition;
    }

    public void setYPosition(int yPosition) {
        this.yPosition = yPosition;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isAlive() {
        return isAlive;
    }

    private void setAlive(boolean isAlive) {
        this.isAlive = isAlive;
    }
    
    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public Boolean isImmortal() {
        return isImmortal;
    }

    public void setImmortal(Boolean isImmortal) {
        this.isImmortal = isImmortal;
    }

    public int getKills() {
        return kills;
    }

    public void increaseKills() {
        kills++;
    }

    public int getBombs() {
        return bombs;
    }

    public int getShields() {
        return shields;
    }

    public void increaseBombs() {
        bombs = (bombs<3)?bombs+1:bombs;
    }

    public int getExplosionRadius() {
        return explosionRadius;
    }

    public void increaseExplosionRadius() {
        explosionRadius = (explosionRadius<5)?explosionRadius+1:explosionRadius;
    }

    public void gainShields() {
        shields = (shields<1)?shields+1:shields;
    }

    public void dead() {
        if(!isImmortal){
            if(shields>0){
                shields--;
            }
            else{
                setAlive(false);
            }
        }
    }

    public void moveRight() {
        if (board.getBox(getXPosition(), getYPosition()+1).isEmpty()){
            yPosition++;
        }
    }

    public void moveLeft() {
        if (board.getBox(getXPosition(), getYPosition()-1).isEmpty()){
            yPosition--;
        }
    }

    public void moveUp() {
        if (board.getBox(getXPosition()-1, getYPosition()).isEmpty()){
            xPosition--;
        }
    }

    public void moveDown() {
        if (board.getBox(getXPosition()+1, getYPosition()).isEmpty()){
            xPosition++;
        }
    }

    
}
