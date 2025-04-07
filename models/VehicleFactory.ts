import Vehicle from "./Vehicle";
import Car from "./Car";
import Bus from "./Bus";
import Motorcycle from "./Motorcycle";

export default class VehicleFactory {
    static createVehicle(licensePlate: string, vehicleType: string): Vehicle | null {
        switch (vehicleType) {
            case "Car":
                return new Car(licensePlate);
            case "Bus":
                return new Bus(licensePlate);
            case "Motorcycle":
                return new Motorcycle(licensePlate);
            default:
                return null;
        }
    }
}