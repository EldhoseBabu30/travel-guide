import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    dates: {
        type: String,
        required: true
    },
    activities: {
        type: [String],
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    travelWith: {
        type: String,
        required: true
    }
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;

