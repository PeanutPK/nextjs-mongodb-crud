// models/VehicleSchema.ts
import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
	levelNumber: {
		type: Number,
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
