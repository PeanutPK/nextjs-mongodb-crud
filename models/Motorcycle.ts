import { VehicleSize } from "../lib/vehicleConstant";
import ParkingSpot from "./ParkingSpot";
import Vehicle from "./Vehicle";

export default class Motorcycle extends Vehicle {
	constructor(licensePlate: string) {
		super(licensePlate);
		this.spotNeeded = 1;
		this.vehicleType = "Motorcycle";
		this.vehicleSize = VehicleSize.SMALL;
	}

	canFitInSpot(spot: ParkingSpot): boolean {
		return (
			spot.getSpotSize() === VehicleSize.SMALL ||
			spot.getSpotSize() === VehicleSize.MEDIUM ||
			spot.getSpotSize() === VehicleSize.LARGE
		);
	}

	print(): void {
		console.log("Motor", this.getLicensePlate());
	}
}
