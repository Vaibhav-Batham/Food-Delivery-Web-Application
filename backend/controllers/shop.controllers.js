import uploadOnCloudinary from "../utiles/cloudinary.js";
import Shop from "../models/shop.model.js";

// CREATE / EDIT SHOP
export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {
      shop.name = name;
      shop.city = city;
      shop.state = state;
      shop.address = address;
      if (image) shop.image = image;

      await shop.save();
    }

    await shop.populate("owner");

    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({
      message: "Create/Edit shop error",
      error: error.message,
    });
  }
};

// GET MY SHOP (OWNER)
export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate(
      "owner items"
    );

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({
      message: "Get my shop error",
      error: error.message,
    });
  }
};

//  GET ALL SHOPS (USER DASHBOARD)
export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find()
      .populate("owner")
      .populate("items");

    return res.status(200).json(shops);
  } catch (error) {
    return res.status(500).json({
      message: "Get all shops error",
      error: error.message,
    });
  }
};
