import { VehicleSize } from "../lib/vehicleConstant";
import ParkingSpot from "./ParkingSpot";
import Vehicle from "./Vehicle";

export default class Car extends Vehicle {
	constructor(licensePlate: string) {
		super(licensePlate);
		this.spotNeeded = 1;
		this.vehicleType = "Car";
		this.vehicleSize = VehicleSize.MEDIUM;
	}

	canFitInSpot(spot: ParkingSpot): boolean {
		return (
			spot.getSpotSize() === VehicleSize.LARGE ||
			spot.getSpotSize() === VehicleSize.MEDIUM
		);
	}

	print(): void {
		console.log("Car", this.getLicensePlate());
	}
}
