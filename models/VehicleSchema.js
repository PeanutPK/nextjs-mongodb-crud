// models/Vehicle.js
import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
	size: {
		type: int,
		required: true,
	},
    parked: {
        type: Boolean,
        required: true,
        default: false,
    },
	description: String,
});

export default mongoose.models.Item || mongoose.model("Vehicle", VehicleSchema);
