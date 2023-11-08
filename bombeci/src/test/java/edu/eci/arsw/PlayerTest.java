package edu.eci.arsw;

import org.junit.Before;
import org.junit.Test;

public class PlayerTest {

    public Player player1;
    public Player player2;
    public Player player3;
    public Player player4;

    @Before
    public void initTests() {
        player1 = new Player(1, 1, "FixedName1", false);
        player2 = new Player(1, 10, "FixedName2", false);
        player3 = new Player(10, 1, "FixedName3", false);
        player4 = new Player(10, 10, "FixedName4", false);
    }

    @Test
    public void testMoveDown() {

    }

    @Test
    public void testMoveLeft() {

    }

    @Test
    public void testMoveRight() {

    }

    @Test
    public void testMoveUp() {

    }
}
