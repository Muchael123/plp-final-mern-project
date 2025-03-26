import express, {Request, Response} from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel.js';
import verifyToken from '../middleware/auth.js';
import { check } from "express-validator";
import { HotelType } from '../shared/types.js';

const router = express.Router();

// save the incoming images files to the memeory(RAM) == TEMP
// handled by multer
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})

// api/my-hotels
// Handle multipart form as images will be uploaded to this endpoint with json data - package:multer ->converts binary imge data to js object 
router.post(
    "/",
    verifyToken,
    [
      check("name").notEmpty().withMessage("Name is required"),
      check("city").notEmpty().withMessage("City is required"),
      check("country").notEmpty().withMessage("Country is required"),
      check("description").notEmpty().withMessage("Description is required"),
      check("type").notEmpty().withMessage("Hotel type is required"),
      check("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and must be a number"),
      check("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
    ],
    upload.array("imageFiles", 6),

    async (req: Request, res: Response): Promise<any> => {

      try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
  
        const imageUrls = await Promise.all(
          imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
          })
        );
  
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
  
        const hotel = new Hotel(newHotel);
        await hotel.save();
        res.status(201).send(hotel);
        
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  );


  router.get('/', verifyToken, async(req: Request, res: Response)=>{
    
    try{
      const hotels = await Hotel.find({userId: req.userId});
      res.json(hotels);
    }
    catch(err){
      res.status(500).json({message: "Error fetching hotels"})
    }
  })

  router.get("/:id", verifyToken, async(req: Request, res: Response)=>{

    const id = req.params.id.toString();

    try{

      const hotel = await Hotel.findOne({_id: id, userId: req.userId});
      res.json(hotel);

    }catch(err){
      res.status(500).json({message: "Error fetching hotels"});
    }
  });

  router.put('/:hotelId', verifyToken, upload.array("imageFiles"), async (req: Request, res:Response): Promise<any>=>{
    try {
      const hotelId = req.params.hotelId.toString();

      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate({
        _id: hotelId,
        userId: req.userId
      }, updatedHotel, {new: true});

      if(!hotel){
        return res.status(401).json({message: "Hotel not found"});
      }

      const files = req.files as Express.Multer.File[];

      const updatedImageUrls = await Promise.all(
        files.map(async (image) => {
          const b64 = Buffer.from(image.buffer).toString("base64");
          let dataURI = "data:" + image.mimetype + ";base64," + b64;
          const res = await cloudinary.v2.uploader.upload(dataURI);
          return res.url;
        })
      );

      hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

      await hotel.save();
      
      res.status(201).json(hotel);

    } catch (error) {
      res.status(500).json({message: "Something went Wrong!"});
    }
  })


export default router;

