import { VehicleSize } from "../lib/vehicleConstant";
import ParkingSpot from "./ParkingSpot";
import Vehicle from "./Vehicle";

export default class Bus extends Vehicle {
	constructor(licensePlate: string) {
		super(licensePlate);
		this.spotNeeded = 5;
		this.vehicleType = "Bus";
		this.vehicleSize = VehicleSize.LARGE;
	}

	canFitInSpot(spot: ParkingSpot): boolean {
		return spot.getSpotSize() === VehicleSize.LARGE;
	}

	print(): void {
		console.log("Bus", this.getLicensePlate());
	}
}
