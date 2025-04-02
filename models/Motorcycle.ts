import { VehicleSize, VehicleType } from "../lib/vehicleConstant";
import Vehicle from "./Vehicle";

export default class Motorcycle extends Vehicle {
    constructor(licensePlate: string) {
        super(licensePlate);
        this.type = VehicleType.MOTORCYCLE;
        this.size = VehicleSize.SMALL;
    }

    print(): void {
        console.log("Motor", this.getLicensePlate());
    }
}