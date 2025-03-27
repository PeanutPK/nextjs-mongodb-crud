// models/Bus.js
import mongoose from "mongoose";
import VehicleSchema from "VehicleSchema.js";


const MotorcycleSchema = new mongoose.Schema(VehicleSchema);
MotorcycleSchema.size = {
    type: int,
    required: true,
    default: 1,
};


export default mongoose.models.Item || mongoose.model("Motorcycle", MotorcycleSchema);
