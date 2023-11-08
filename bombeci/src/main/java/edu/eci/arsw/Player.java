package edu.eci.arsw;

public class Player extends Box{

    private String name;
    private boolean isAlive;
    private boolean isImmortal;
    private int kills;
    private int bombs;
    private int explosionRadius;
    private int shields;
    private Board board;

    public Player(int x, int y, String name, boolean isImmortal) {
        super(x, y);
        setName(name);;
        setImmortal(isImmortal);
        setAlive(true);

        kills = 0;
        bombs = 1;
        explosionRadius = 1;
        shields = 0;
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

    public void Kill() {
        kills++;
    }

    public int getBombs() {
        return bombs;
    }

    public int getShields() {
        return shields;
    }

    public void incraseBombs() {
        bombs = (bombs<3)?bombs+1:bombs;
    }

    public int getExplosionRadius() {
        return explosionRadius;
    }

    public void incraseExplosionRadius() {
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
        y++;
    }

    public void moveUp() {
        x--;
    }

    public void moveDown() {
        x++;
    }

    public void moveLeft() {
        y--;
    }
}
