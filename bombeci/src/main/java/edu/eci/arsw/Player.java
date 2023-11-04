package edu.eci.arsw;

public class Player extends Box{

    private String name;
    private boolean isAlive;
    private boolean isInmortal;
    private int kills;
    private int bombs;
    private int explosionRadius;
    private int shields;

    public Player(int x, int y, String name, boolean isInmortal) {
        super(x, y);
        this.name = name;
        isAlive = true;
        this.isInmortal = isInmortal;
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

    public int getKills() {
        return kills;
    }

    public void Kill() {
        kills++;
    }

    public int getBombs() {
        return bombs;
    }

    public void incraseBombs() {
        bombs = (bombs<3)?bombs++:bombs;
    }

    public int getExplosionRadius() {
        return explosionRadius;
    }

    public void incraseExplosionRadius(int explosionRadius) {
        explosionRadius = (explosionRadius<5)?explosionRadius++:explosionRadius;
    }

    public void gainShields(int shields) {
        shields = (shields<1)?shields++:shields;
    }

    public void dead() {
        if(!isInmortal){
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
