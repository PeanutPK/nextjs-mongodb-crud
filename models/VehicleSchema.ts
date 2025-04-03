import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
	level: {
		type: Number,
		required: true,
	},
    spotNumber: {
        type: Number,
        required: true,
    },
    vehicleType: {
        enum: ["Car", "Motorcycle", "Bus"],
        required: true,
    },
    licensePlate: {
        type: String,
        required: true,
    }
});

export default mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);
