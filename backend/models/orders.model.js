import mongoose, {Schema} from 'mongoose';

const OrderSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Order Placed"
    },
    paymentMethod:{
        type:String,
        required:true
    },
    payment:{
        type:Boolean,
        default:false,
        required:true
    }
},{timestamps:true});

export const Orders = new mongoose.model('Orders',OrderSchema);
