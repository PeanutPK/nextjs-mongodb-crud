import { VehicleSize, VehicleType } from "../lib/vehicleConstant";
import Vehicle from "./Vehicle";

export default class Car extends Vehicle {
	constructor(licensePlate: string) {
		super(licensePlate);
		this.type = VehicleType.CAR;
		this.size = VehicleSize.MEDIUM;
	}

	print(): void {
		console.log("Car", this.getLicensePlate());
	}
}
