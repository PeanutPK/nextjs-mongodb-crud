import { VehicleSize, VehicleType } from "../lib/vehicleConstant";
import Vehicle from "./Vehicle";

export default class Motorcycle extends Vehicle {
    declare type: VehicleType.MOTORCYCLE;
    declare size: VehicleSize.SMALL;

    constructor(licensePlate: string) {
        super(licensePlate);
    }

    print(): void {
        console.log("Motor", this.getLicensePlate());
    }
}