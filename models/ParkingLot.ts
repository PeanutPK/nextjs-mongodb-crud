import Level from "./Level";

export default class ParkingLot {
    private static instance: ParkingLot;
    private levels: Level[] = [];

    private constructor() {
        this.levels = [];
    }
}