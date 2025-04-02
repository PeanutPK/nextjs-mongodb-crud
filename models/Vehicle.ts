import { VehicleSize } from "../lib/vehicleConstant";
import ParkingSpot from "./ParkingSpot";

export default abstract class Vehicle {
	protected parkingSpots: ParkingSpot[] = [];
	protected vehicleType: string = "Vehicle";
    protected vehicleSize: VehicleSize = VehicleSize.VEHICLE;
	protected spotNeeded: number = 0;
	protected licensePlate: string;

	constructor(licensePlate: string) {
		this.licensePlate = licensePlate;
	}

	getParkingSpots() {
		return this.parkingSpots;
	}

	getLicensePlate() {
		return this.licensePlate;
	}

    getVehicleSize() {
        return this.vehicleSize;
    }

    getVehicleType() {
        return this.vehicleType;
    }

	getSpotNeeded() {
		return this.spotNeeded;
	}

	parkInSpot(spot: ParkingSpot): void {
        this.parkingSpots.push(spot);
	}

	clearSpot(): void {
        this.parkingSpots = [];
	}

    abstract canFitInSpot(spot: ParkingSpot): boolean;
	abstract print(): void;
}
