package edu.eci.arsw;

public class Boost extends Box{

    private final String[] types = {"Shields", "Bombs", "Explosion"};
    private String type;

    public Boost(int x, int y, int type) {
        super(x, y);
        this.type = types[type];
    }

    public String getType() {
        return type;
    }

}
