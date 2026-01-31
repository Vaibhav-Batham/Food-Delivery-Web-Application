import uploadOnCloudinary from "../utiles/cloudinary.js";

export const addItem=async (req,res) => {
    try{
        const {name,category,foodType,price}=req.body
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
        const shop=await shop.findOne({owner:req.userId})
        if(!shop){
            return res.status(400).json({message:"shop not found"})
        }
        const item=await item.create({
            name,category,foodType,price,image,shop:shop._id
        })

        return res.status(201).json(item)
    } catch (error) {

     return res.status(500).json({message:`add item error ${error}`})

    }
}

export const editItem=async (req,res) => {
    try {
        const itemId=req.params.itemId
        const {name,category,foodType,price}=req.body
        let image;
        if(req.file){
            image=uploadOnCloudinary(req.file.path)
        }
        const item=await item.findByIdAndUpdate(itemId,{
            name,category,foodType,price,image
        },{new:true})
        if(!item){
             return res.status(400).json({message:"item not found"})
        }
                return res.status(200).json(item)

    } catch (error) {
             return res.status(500).json({message:`edit item error ${error}`})

    }
}