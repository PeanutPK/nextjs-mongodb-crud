import Level from "./Level";
import Vehicle from "./Vehicle";

export default class ParkingLot {
    private static instance: ParkingLot;
    private levels: Level[] = [];
    private static NUM_LEVELS: number = 5;

    private constructor() {
        this.levels = new Array<Level>(ParkingLot.NUM_LEVELS);
        for (let i = 0; i < ParkingLot.NUM_LEVELS; i++) {
            this.levels[i] = new Level(i, 30);
        }
    }

    public static getInstance(): ParkingLot {
        if (!ParkingLot.instance) {
            ParkingLot.instance = new ParkingLot();
        }
        return ParkingLot.instance;
    }

    parkVehicle(vehicle: Vehicle): boolean {
        for (let i = 0; i < this.levels.length; i++) {
            if (this.levels[i].parkVehicle(vehicle)) {
                return true;
            }
        }
        return false;
    }
}
