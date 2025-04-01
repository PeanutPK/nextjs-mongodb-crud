import { VehicleSize, VehicleType } from "../lib/vehicleConstant";
import Vehicle from "./Vehicle";

export default class Bus extends Vehicle {
    declare type: VehicleType.BUS;
    declare size: VehicleSize.LARGE;

    constructor(licensePlate: string) {
        super(licensePlate);
    }
}