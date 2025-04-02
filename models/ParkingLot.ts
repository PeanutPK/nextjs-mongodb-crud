import Level from "./Level";
import Vehicle from "./Vehicle";

export default class ParkingLot {
    private static instance: ParkingLot | null;
    private levels: Level[] = [];
    private static NUM_LEVELS: number = 5;

    private constructor() {
        this.levels = [];
        for (let i = 0; i < ParkingLot.NUM_LEVELS; i++) {
            this.levels.push(new Level(i, 30));
        }
    }

    static getInstance(): ParkingLot {
        if (!ParkingLot.instance) {
            ParkingLot.instance = new ParkingLot();
        }
        return ParkingLot.instance;
    }

    static resetInstance(): void {
        ParkingLot.instance = null;
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
