export default abstract class Vehicle {

    protected size: number;
    protected description: string;
    protected parked: boolean;

    constructor(size: number, description: string) {
        this.size = size;
        this.description = description;
        this.parked = false;
    }

    getSize() {
        return this.size;
    }

    parkInSpot() {
        this.parked = true;
    }

    clearSpot() {
        this.parked = false;
    }
}
