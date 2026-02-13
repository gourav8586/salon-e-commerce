const ServiceList = require("../../model/listServices");

// ➕ Add service under category
exports.addService = async (req, res) => {
  try {
    const {
      categoryId,
      genderType,
      name,
      regularPrice,
      offerPrice,
      priceToggle,
      isPopular,
    } = req.body;

    // Check if category already exists
    let serviceList = await ServiceList.findOne({ category: categoryId });

    if (!serviceList) {
      // Create new service list for category if not exists
      serviceList = new ServiceList({
        category: categoryId,

        services: [
          {
            genderType,
            name,
            regularPrice,
            offerPrice,
            priceToggle,
            isPopular,
          },
        ],
      });
    } else {
      // Push new service into existing category
      serviceList.services.push({
        genderType,
        name,
        regularPrice,
        offerPrice,
        priceToggle,
        isPopular,
      });
    }

    await serviceList.save();
    res.status(201).json({ success: true, data: serviceList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📂 Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await ServiceList.find().populate("category");
    res.status(200).json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏ Update specific service
exports.updateService = async (req, res) => {
  try {
    const { listId, serviceId } = req.params; // serviceListId & serviceId
    const updateData = req.body;

    const serviceList = await ServiceList.findOneAndUpdate(
      { _id: listId, "services._id": serviceId },
      { $set: { "services.$": { _id: serviceId, ...updateData } } },
      { new: true }
    );

    if (!serviceList)
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });

    res.status(200).json({ success: true, data: serviceList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ❌ Delete specific service
exports.deleteService = async (req, res) => {
  try {
    const { listId, serviceId } = req.params;

    const serviceList = await ServiceList.findByIdAndUpdate(
      listId,
      { $pull: { services: { _id: serviceId } } },
      { new: true }
    );

    if (!serviceList) {
      return res.status(404).json({
        success: false,
        message: "Service list not found",
      });
    }

    if (serviceList.services.length === 0) {
      await ServiceList.findByIdAndDelete(listId);

      return res.status(200).json({
        success: true,
        message: "Last service deleted, service list removed",
        deletedListId: listId,
      });
    }

    // Step 3: Normal response
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: serviceList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
