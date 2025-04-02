import ParkingSpot from "./ParkingSpot";
import Vehicle from "./Vehicle";
import { VehicleSize } from "../lib/vehicleConstant";

export default class Level {
	private level: number;
	private spots: ParkingSpot[];
	private availableSpots: number = 0;
	private static SPOTS_PER_ROW: number = 10;

	// TODO: Continue implementing the constructor to create parking spots
	constructor(level: number, numberOfSpots: number) {
		this.level = level;
		this.spots = new Array<ParkingSpot>(numberOfSpots);

		const largeSpot: number = numberOfSpots / 4;
		const motorcycleSpot: number = numberOfSpots / 4;
		const compactSpot: number = numberOfSpots - largeSpot - motorcycleSpot;

		for (let i = 0; i < numberOfSpots; i++) {
			let vehicleSize: VehicleSize = VehicleSize.SMALL;
			if (i < largeSpot) {
				vehicleSize = VehicleSize.LARGE;
			} else if (i < largeSpot + compactSpot) {
				vehicleSize = VehicleSize.MEDIUM;
			}
			const row: number = i / Level.SPOTS_PER_ROW;
			this.spots[i] = new ParkingSpot(this, row, i, vehicleSize);
		}
		this.availableSpots = numberOfSpots;
	}

	getAvailableSpots() {
		return this.availableSpots;
	}

	parkVehicle(vehicle: Vehicle): boolean {
		if (this.getAvailableSpots() < vehicle.getSize()) return false;
        const spotNumber: number = this.findAvailableSpots(vehicle);
        if (spotNumber < 0) return false;
        return this.parkStartingAtSpot(spotNumber, vehicle);
	}

	parkStartingAtSpot(spotNumber: number, vehicle: Vehicle): boolean {
        vehicle.clearSpot();
        let success: boolean = true;
        for (let i = spotNumber; i < spotNumber + vehicle.getSize(); i++) {
            success = success && this.spots[i].parkVehicle(vehicle);
        }
        this.availableSpots -= vehicle.getSize();
        return success;
    }

    findAvailableSpots(vehicle: Vehicle): number {
        let lastRow: number = -1;
        const spotsNeeded: number = vehicle.getSize();
        let spotsFound: number = 0;
        for (let i = 0; i < this.spots.length; i++) {
            const spot: ParkingSpot = this.spots[i];
            if (lastRow !== spot.getRow()) {
                spotsFound = 0;
                lastRow = spot.getRow();
            }
            if (spot.canFitVehicle(vehicle)) {
                spotsFound++;
            }
            if (spotsFound === spotsNeeded) {
                return i - (spotsNeeded - 1);
            }
        }
        return -1;
    }

    print(): void {
        let lastRow: number = -1;
        for (let i = 0; i < this.spots.length; i++) {
            const spot: ParkingSpot = this.spots[i];
            if (spot.getRow() !== lastRow) {
                console.log(" ");
                lastRow = spot.getRow();
            }
            spot.print();
        }
    }

    public spotFreed(): void {
        this.availableSpots++;
    }
}
