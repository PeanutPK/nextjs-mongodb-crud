import ParkingSpot from "./ParkingSpot";
import Vehicle from "./Vehicle";

export default class Level {
    private level: number;
    private spots: ParkingSpot[] = [];
    private availableSpots: number = 0;
    private static SPOTS_PER_ROW: number = 10;

    // TODO: Continue implementing the constructor to create parking spots
    constructor(level: number) {
        this.level = level;
    }

    spotFreed() {
        this.availableSpots++;
    }
}