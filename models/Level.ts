import Vehicle from "./Vehicle";

export default class Level {
    private level: number;
    private spots: Vehicle[] = [];
    private availableSpots: number = 10;

    constructor(level: number) {
        this.level = level;
    }

    parkVehicle(vehicle: Vehicle) {
        if (this.availableSpots > vehicle.getSize()) {
            this.spots.push(vehicle);
            this.availableSpots--;
            return true;
        }
        return false;
    }
}