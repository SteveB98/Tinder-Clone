import mongoose from 'mongoose'

const cardSchema = mongoose.Schema({ 
    user_id: String,
    first_name: String,
    dob_day: Number,
    dob_month: Number,
    dob_year: Number,
    show_genders: Boolean,
    gender_identity: String,
    gender_interest: String,
    url: String,
    about: String,
    matches: Array,
})

export default mongoose.model('users', cardSchema);