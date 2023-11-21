package edu.eci.arsw;

public class PowerUp extends Box{

    private PowerUpType type;

    public PowerUp(int x, int y, PowerUpType type) {
        super(x, y);
        this.type = type;
    }

    public void aplyEffect(Player player) {
        switch (type) {
            case SHIELD:
                player.gainShields();
                break;
            case BOMB_UP:
                player.increaseBombs();
                break;
            case RANGE_UP:
                player.increaseExplosionRadius();
                break;
        }
    }

    public PowerUpType getType() {
        return type;
    }

}
