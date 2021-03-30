import mongoose from 'mongoose'

const calendarSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: { type: String, required: true },
    days: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Day'
        }
    ],
    legends: [
        {
            color: String,
            text: String,
            imageSrc: String,
        }
    ],
    description: String
})

const Calendar = mongoose.model('Calendar', calendarSchema)

export default Calendar