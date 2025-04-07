enum VehicleSize {
    VEHICLE="VEHICLE",
    SMALL="SMALL",
    MEDIUM="MEDIUM",
    LARGE="LARGE",
}

export function getVehicleSize(size: string): VehicleSize {
    switch (size) {
        case "SMALL":
            return VehicleSize.SMALL;
        case "MEDIUM":
            return VehicleSize.MEDIUM;
        case "LARGE":
            return VehicleSize.LARGE;
        default:
            throw new Error("Invalid vehicle size");
    }
}

export { VehicleSize };