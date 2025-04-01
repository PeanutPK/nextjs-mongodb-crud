import { VehicleType, VehicleSize } from "../lib/vehicleConstant";

export default abstract class Vehicle {
    protected type!: VehicleType;
    protected size!: VehicleSize;
    protected licensePlate: string;
    protected parked: boolean;

    constructor(licensePlate: string) {
        this.licensePlate = licensePlate;
        this.parked = false;
    }

    getLicensePlate() {
        return this.licensePlate;
    }

    getSize() {
        return this.size;
    }

    parkInSpot() {
        this.parked = true;
    }

    clearSpot() {
        this.parked = false;
    }
}
