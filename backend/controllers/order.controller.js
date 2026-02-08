import Order from "../models/order.model.js";

// ================= CREATE ORDER =================
export const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, deliveryAddress, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }

        const newOrder = new Order({
            user: req.user._id, // Assumes isAuth middleware adds user to req
            items,
            totalAmount,
            deliveryAddress,
            paymentMethod,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: `Create order error: ${error.message}` });
    }
};

// ================= GET USER ORDERS =================
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: `Get user orders error: ${error.message}` });
    }
};

// ================= GET OWNER ORDERS (Active/All) =================
// Note: In a real app, this would filter by restaurant ID if items belong to specific shops.
// For now, assuming a single owner or simplified model where owner sees all/global orders or specific logic.
// If items don't have shopId, we can't filter by shop. Assuming Owner sees ALL orders for now or we need to filter by status.
export const getOwnerOrders = async (req, res) => {
    try {
        // efficient query for "active" orders (not delivered or cancelled)
        const activeOrders = await Order.find({
            status: { $nin: ["Delivered", "Cancelled"] },
        }).sort({ createdAt: -1 }).populate("user", "fullName email mobile");

        res.status(200).json(activeOrders);
    } catch (error) {
        res.status(500).json({ message: `Get owner orders error: ${error.message}` });
    }
};
