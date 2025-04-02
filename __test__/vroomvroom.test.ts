import Car from "../models/Car";
import Motorcycle from "../models/Motorcycle";
import Bus from "../models/Bus";
import ParkingLot from "../models/ParkingLot";
import {VehicleType, VehicleSize} from "../lib/vehicleConstant";


describe("Vehicle", () => {
    let car: Car;
    let motorcycle: Motorcycle;
    let bus: Bus;
    let parkingLot: ParkingLot;

    beforeEach(() => {
        car = new Car("123");
        motorcycle = new Motorcycle("456");
        bus = new Bus("789");
        parkingLot = ParkingLot.getInstance();
    });

    test("vehicleSize", () => {
        expect(car.getSize()).toBe(VehicleSize.MEDIUM);
        expect(car.getSize()).toBe(2);
        expect(motorcycle.getSize()).toBe(VehicleSize.SMALL);
        expect(motorcycle.getSize()).toBe(1);
        expect(bus.getSize()).toBe(VehicleSize.LARGE);
        expect(bus.getSize()).toBe(5);
    })

    test("parkVehicle", () => {
        expect(parkingLot.parkVehicle(car)).toBe(true);
        expect(parkingLot.parkVehicle(motorcycle)).toBe(true);
        expect(parkingLot.parkVehicle(bus)).toBe(true);
    });
});
