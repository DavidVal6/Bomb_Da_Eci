package edu.eci.arsw;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class PowerUpTest {

    Player player;
    
    PowerUp shield;
    PowerUp bombUp;
    PowerUp rangeUp;


    @Before
    public void initTests() {
        player = new Player(0, 0, "test", false);

        shield = new PowerUp(0, 0, PowerUpType.SHIELD);
        bombUp = new PowerUp(0, 0, PowerUpType.BOMB_UP);
        rangeUp = new PowerUp(0, 0, PowerUpType.RANGE_UP);
    }

    @Test
    public void testGetType() {
        assertEquals(PowerUpType.SHIELD, shield.getType());
        assertEquals(PowerUpType.BOMB_UP, bombUp.getType());
        assertEquals(PowerUpType.RANGE_UP, rangeUp.getType());
    }

    @Test
    public void testAplyShield() {
        int originalShield = player.getShields();
        shield.aplyEffect(player);
        assertEquals(originalShield + 1, player.getShields());
    }

    @Test
    public void testAplyBombUp() {
        int originalBombs = player.getBombs();
        bombUp.aplyEffect(player);
        assertEquals(originalBombs + 1, player.getBombs());
    }

    @Test
    public void testAplyRangeUp() {
        int originalRadius = player.getExplosionRadius();
        rangeUp.aplyEffect(player);
        assertEquals(originalRadius + 1, player.getExplosionRadius());
    }
}


