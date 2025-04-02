import { VehicleType, VehicleSize } from "../lib/vehicleConstant";
import ParkingSpot from "./ParkingSpot";

export default abstract class Vehicle {
    protected parkingSpots: ParkingSpot[] = [];
    protected type: VehicleType = VehicleType.VEHICLE;
    protected size: VehicleSize = VehicleSize.NONE;
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

    parkInSpot(spot: ParkingSpot): void {
        if (!this.parked) {
            this.parkingSpots.push(spot)
            this.parked = true;
        }
    }

    clearSpot(): void {
        if (this.parked) {
            this.parkingSpots = [];
            this.parked = false;
        }
    }

    abstract print(): void;
}
