import { asyncHandler } from "../utils/asyncHandler.js";
import { Orders } from "../models/orders.model.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import razorpay from "razorpay"

const currency = 'inr'
const deliveryCharge = 10

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

//placing order using COD
const placeOrder = asyncHandler(async (req, res) => {
    const {userId,items,address,amount} = req.body;

    try {
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
        }

        const createdOrder = await Orders.create(orderData);

        await User.findByIdAndUpdate(userId,{
            cartData:{}
        })

        return res.status(200)
                .json(new ApiResponse(200,true,"Order placed successfully",createdOrder))
    } catch (error) {
        throw new ApiError(500, false, "Something went wrong");  
    }


})

//placing order using Razorpay
const placeOrderRazorpay = asyncHandler(async (req, res) => {
try {
    const {userId,items,address,amount} = req.body;
    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: "Razorpay",
        payment:false,
        date:Date.now()
    }

    const createdOrder = await Orders.create(orderData);

    const options = {
        amount: amount * 100,
        currency: currency.toUpperCase(),
        receipt: createdOrder._id.toString(),
        
    }

    await razorpayInstance.orders.create(options,(error,order)=>{
        if(error){
            throw new ApiError(500, false, "Something went wrong")
        }

        res.json({success:true,order})
    })

} catch (error) {
    console.log(error.message);
    res.status(500).json({success:false, message:"Something went wrong"})
}
})

//placing order using Stripe
const placeOrderStripe = asyncHandler(async (req, res) => {

})

//all orders for admin panel
const allOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Orders.find({})
        return res.status(200)
                .json(new ApiResponse(200,true,orders,"All orders fetched successfully"))
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:"Something went wrong"})
        
    }
})

// User order data for frontend
const userOrders = asyncHandler(async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await Orders.find({userId});
        if(!orders){
            new ApiError(404, false, "No orders found for this user")
        }

        return res.status(200)
                .json(new ApiResponse(200,true,orders,"User orders fetched successfully"))
    } catch (error) {
        throw new ApiError(500, false, error);
    }
})

//Update Order details for admin panel
const updateOrder = asyncHandler(async (req, res) => {
    try {
        const{orderId, status} = req.body;
        await Orders.findByIdAndUpdate(orderId, {status});
        res.json({success:true, message:"status updated"})
    } catch (error) {
        throw new ApiError(500, false, error);
    }
})
const trackOrder = asyncHandler(async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Orders.findById(orderId);

        if (!order) {
            throw new ApiError(404, false, "Order not found");
        }

        return res.status(200).json(new ApiResponse(200, true, order, "Order details fetched successfully"));
    } catch (error) {
        throw new ApiError(500, false, error.message);
    }
});

const verifyRazorpay = asyncHandler(async (req, res) => {
    try {
        const{userId, razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === "paid"){
            await Orders.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await User.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message:"Payment Successfull"})
        }else{
            res.json({success:false,message:"Payment Failed"})
        }
    } catch (error) {
        throw new ApiError(500, false, error);
        
    }
})

export {
    placeOrder,
    placeOrderRazorpay,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateOrder,
    trackOrder,
    verifyRazorpay
}
