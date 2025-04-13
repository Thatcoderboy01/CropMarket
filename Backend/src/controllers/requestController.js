import prisma from "../config/prisma.js";

// 🏪 **Retailer - Get All Available Crops**
export const getAllCrops = async (req, res) => {
  try {
    const crops = await prisma.crop.findMany();
    res.status(200).json({ crops });
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🏪 **Retailer - Send Crop Request**
export const sendRequest = async (req, res) => {
  try {
    const { cropId, priceOffered } = req.body;
    const retailerId = req.user.id;

    if (!cropId || !priceOffered) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Ensure crop exists
    const crop = await prisma.crop.findUnique({ where: { id: cropId } });
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    // ✅ Create crop request
    console.log("Incoming Data:", { cropId, retailerId, priceOffered });

    const request = await prisma.request.create({
      data: {
        cropId,
        retailerId,
        priceOffered: parseFloat(priceOffered), // ✅ Convert string to Float
        status: "PENDING", // Yeh theek hai agar enum string hi accept ho raha hai
      }
    });
    

    res.status(201).json({ message: "Request sent successfully", request });
  } catch (error) {
    console.error("Error sending request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};