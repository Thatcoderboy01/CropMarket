import prisma from "../config/prisma.js"; // ✅ Prisma Setup

// 👨‍🌾 **Farmer - Add Crop**
export const addCrop = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const farmerId = req.user.id;

    // ✅ Input Validation
    if (!name || !price || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Price and quantity must be positive numbers" });
    }

    // ✅ Insert Crop Data
    const crop = await prisma.crop.create({
      data: { name, price: Number(price), quantity: Number(quantity), farmerId },
    });

    res.status(201).json({ message: "Crop added successfully", crop });
  } catch (error) {
    console.error("❌ Error in addCrop:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 👨‍🌾 **Farmer - Get My Crops**
export const getMyCrops = async (req, res) => {
  try {
    const farmerId = req.user.id;

    // ✅ Fetch Crops of the Farmer
    const crops = await prisma.crop.findMany({ where: { farmerId } });

    res.status(200).json({ crops });
  } catch (error) {
    console.error("❌ Error in getMyCrops:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 👨‍🌾 **Farmer - Delete Crop**
export const deleteCrop = async (req, res) => {
  try {
    const { cropId } = req.params;
    const farmerId = req.user.id;

    // ✅ Check if crop exists and belongs to the logged-in farmer
    const crop = await prisma.crop.findUnique({ where: { id: cropId } });

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }
    if (crop.farmerId !== farmerId) {
      return res.status(403).json({ message: "Unauthorized to delete this crop" });
    }

    // ✅ Delete Crop
    await prisma.crop.delete({ where: { id: cropId } });

    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteCrop:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// 👨‍🌾 **Farmer - Update Crop**
export const updateCrop = async (req, res) => {
  try {
    const { cropId } = req.params;
    const { name, price, quantity } = req.body;
    const farmerId = req.user.id;

    // ✅ Input Validation
    if (!name || !price || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Price and quantity must be positive numbers" });
    }

    // ✅ Check crop exists and belongs to farmer
    const crop = await prisma.crop.findUnique({ where: { id: cropId } });

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }
    if (crop.farmerId !== farmerId) {
      return res.status(403).json({ message: "Unauthorized to update this crop" });
    }

    // ✅ Update Crop
    const updatedCrop = await prisma.crop.update({
      where: { id: cropId },
      data: {
        name,
        price: Number(price),
        quantity: Number(quantity),
      },
    });

    res.status(200).json({ message: "Crop updated successfully", updatedCrop });
  } catch (error) {
    console.error("❌ Error in updateCrop:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🌾 **Farmer - Approve or Reject Request**
export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const farmerId = req.user.id;

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // ✅ Ensure request exists
    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: { crop: true }
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // ✅ Ensure the logged-in farmer owns the crop
    if (request.crop.farmerId !== farmerId) {
      return res.status(403).json({ message: "Unauthorized: You don't own this crop" });
    }

    // ✅ Update request status
    const updatedRequest = await prisma.request.update({
      where: { id: requestId },
      data: { status }
    });

    res.status(200).json({ message: `Request ${status.toLowerCase()} successfully`, updatedRequest });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};