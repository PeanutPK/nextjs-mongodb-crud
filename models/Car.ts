import { VehicleSize, VehicleType } from "../lib/vehicleConstant";
import Vehicle from "./Vehicle";

export default class Car extends Vehicle {
    declare type: VehicleType.CAR;
    declare size: VehicleSize.MEDIUM;

    constructor(licensePlate: string) {
        super(licensePlate);
    }

    print(): void {
        console.log("Car", this.getLicensePlate());
    }
}