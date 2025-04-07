import Level from "./Level";
import ParkingSpot from "./ParkingSpot";
import Vehicle from "./Vehicle";
import { getVehicleSize } from "../lib/vehicleConstant";
import { IParkingLot } from "./ParkingLotSchema";
import Car from "./Car";
import Motorcycle from "./Motorcycle";
import Bus from "./Bus";

export default class ParkingLot {
	private static instance: ParkingLot | null;
	private levels: Level[] = [];
	private static NUM_LEVELS: number = 5;

	private constructor() {
		this.levels = [];
		for (let i = 0; i < ParkingLot.NUM_LEVELS; i++) {
			this.levels.push(new Level(i, 30));
		}
	}

	static getInstance(): ParkingLot {
		if (!ParkingLot.instance) {
			ParkingLot.instance = new ParkingLot();
		}
		return ParkingLot.instance;
	}

	static resetInstance(): void {
		ParkingLot.instance = null;
		ParkingLot.getInstance();
	}

	insertData(levels: IParkingLot): void {
		this.levels = []; // Clear existing levels

		for (let i = 0; i < levels.levels.length; i++) {
			const level = levels.levels[i];
			const newLevel = new Level(level.level, level.availableSpots);
			newLevel.setSpots(
				level.spots.map(
					(spot) =>
						new ParkingSpot(
							newLevel,
							spot.row,
							spot.spotNumber,
							getVehicleSize(spot.vehicleSize),
							spot.vehicle
								? spot.vehicle.vehicleType === "Car"
									? new Car(spot.vehicle.licensePlate)
									: spot.vehicle.vehicleType === "Motorcycle"
									? new Motorcycle(spot.vehicle.licensePlate)
									: new Bus(spot.vehicle.licensePlate)
								: null
						)
				)
			);
			this.levels.push(newLevel);
		}
	}

	getInstanceData() {
		return {
			levels: this.levels.map((level) => {
				return {
					level: level.getLevel(),
					availableSpots: level.getAvailableSpots(),
					spots: level.getSpots().map((spot) => {
						const vehicle: Vehicle | null = spot.getVehicle();
						return {
							level: level.getLevel(),
							row: spot.getRow(),
							spotNumber: spot.getSpotNumber(),
							vehicleSize: spot.getSpotSize(),
							vehicle: vehicle
								? {
										licensePlate: vehicle.getLicensePlate(),
										vehicleSize: vehicle.getVehicleSize(),
										vehicleType: vehicle.getVehicleType(),
										spotNeeded: vehicle.getSpotNeeded(),
								  }
								: null,
						};
					}),
				};
			}),
		};
	}

	getLevels(): Level[] {
		return this.levels;
	}

	getLevelByNumber(levelNumber: number): Level {
		if (levelNumber < 0 || levelNumber >= this.levels.length) {
			throw new Error("Invalid level number");
		}
		return this.levels[levelNumber];
	}

	findVehicle(licensePlate: string): boolean {
		for (let i = 0; i < this.levels.length; i++) {
			if (this.levels[i].findVehicle(licensePlate)) {
				return true;
			}
		}
		return false;
	}

	parkVehicle(vehicle: Vehicle): boolean {
		for (let i = 0; i < this.levels.length; i++) {
			if (this.levels[i].parkVehicle(vehicle)) {
				return true;
			}
		}
		return false;
	}

	removeVehicle(licensePlate: string): boolean {
		for (let i = 0; i < this.levels.length; i++) {
			if (this.levels[i].removeVehicle(licensePlate)) {
				return true;
			}
		}
		return false;
	}

	print(): void {
		for (let i = 0; i < 1; i++) {
			this.levels[i].print();
		}
	}
}
