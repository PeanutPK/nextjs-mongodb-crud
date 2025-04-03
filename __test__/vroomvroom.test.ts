import Car from "../models/Car";
import Motorcycle from "../models/Motorcycle";
import Bus from "../models/Bus";
import ParkingLot from "../models/ParkingLot";
import { VehicleSize } from "../lib/vehicleConstant";

describe("ParkingLot", () => {
	let car: Car;
	let motorcycle: Motorcycle;
	let bus: Bus;
	let parkingLot: ParkingLot;

	beforeEach(() => {
        ParkingLot.resetInstance();
		car = new Car("123");
		motorcycle = new Motorcycle("456");
		bus = new Bus("789");
		parkingLot = ParkingLot.getInstance();
	});

	test("vehicleTypeSize", () => {
		expect(car.getVehicleSize()).toBe(VehicleSize.MEDIUM);
		expect(car.getSpotNeeded()).toBe(1);
		expect(motorcycle.getVehicleSize()).toBe(VehicleSize.SMALL);
		expect(motorcycle.getSpotNeeded()).toBe(1);
		expect(bus.getVehicleSize()).toBe(VehicleSize.LARGE);
		expect(bus.getSpotNeeded()).toBe(5);
	});

	test("parkVehicle", () => {
        expect(parkingLot.findVehicle(car.getLicensePlate())).toBe(false);
		expect(parkingLot.parkVehicle(car)).toBe(true);
        expect(parkingLot.findVehicle(car.getLicensePlate())).toBe(true);
        expect(parkingLot.findVehicle(motorcycle.getLicensePlate())).toBe(false);
		expect(parkingLot.parkVehicle(motorcycle)).toBe(true);
		expect(parkingLot.parkVehicle(bus)).toBe(true);
	});

    test("removeVehicle", () => {
        expect(parkingLot.findVehicle(car.getLicensePlate())).toBe(false);
        expect(parkingLot.parkVehicle(car)).toBe(true);
        expect(parkingLot.parkVehicle(motorcycle)).toBe(true);
        expect(parkingLot.parkVehicle(bus)).toBe(true);
        // check if park then remove
        expect(parkingLot.findVehicle(car.getLicensePlate())).toBe(true);
        car.clearSpot();
        expect(parkingLot.findVehicle(car.getLicensePlate())).toBe(false);

        expect(parkingLot.parkVehicle(car)).toBe(true);
    });
});
