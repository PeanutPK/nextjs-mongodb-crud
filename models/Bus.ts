import { VehicleSize, VehicleType } from "../lib/vehicleConstant";
import Vehicle from "./Vehicle";

export default class Bus extends Vehicle {
	constructor(licensePlate: string) {
		super(licensePlate);
		this.type = VehicleType.BUS;
		this.size = VehicleSize.LARGE;
	}

	print(): void {
		console.log("Bus", this.getLicensePlate());
	}
}
