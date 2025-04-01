import { VehicleSize } from "../lib/vehicleConstant";
import Level from "./Level";
import Vehicle from "./Vehicle";

export default class ParkingSpot {
    private vehicle: Vehicle | null = null;
    private spotSize: VehicleSize;
    private level: Level;
    private spotNumber: number;
    private row: number;

	constructor(lvl: Level, row: number, spotNumber: number, size: VehicleSize) {
        this.level = lvl;
        this.row = row;
		this.spotNumber = spotNumber;
		this.spotSize = size;
	}

    isAvailable(): boolean {
        return this.vehicle === null;
    }

	parkVehicle(vehicle: Vehicle): boolean {
		if (this.isAvailable() && vehicle.getSize() <= this.spotSize) {
			this.vehicle = vehicle;
			return true;
		}
		return false;
	}

	removeVehicle(): void {
        this.level.spotFreed();
		this.vehicle = null;
	}

    getRow(): number {
        return this.row;
    }

    getSpotNumber(): number {
        return this.spotNumber;
    }

    getSpotSize(): VehicleSize {
        return this.spotSize;
    }
}
