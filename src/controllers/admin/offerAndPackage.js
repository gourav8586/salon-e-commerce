const offerAndPackageModel = require("../../model/offerAndPackage");
const mongoose = require("mongoose");
const serviceListModel = require("../../model/listServices");
// ➕ Add Offer / Package
exports.addOfferAndPackage = async (req, res) => {
  try {
    const {
      title,
      description,
      services,
      packagePrice,
      validFrom,
      validTo,
    } = req.body;

    const newOffer = new offerAndPackageModel({
      title,
      description,
      services, // array of service _ids like ["68c7c0147b4ff880c2344cf0", ...]
      packagePrice,
      validFrom,
      validTo,
    });

    await newOffer.save();

    res.status(201).json({ success: true, data: newOffer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📖 Get All Offers / Packages
exports.getOffersAndPackages = async (req, res) => {
  try {
    const offers = await offerAndPackageModel.find();

    // Fetch all service details for all offers
    const allServiceIds = offers.flatMap((offer) => offer.services);
    const serviceList = await mongoose.model("serviceList").find({
      "services._id": { $in: allServiceIds },
    });

    // Helper to get matched services for an offer
    const getMatchedServices = (offer) => {
      const matched = [];
      serviceList.forEach((list) => {
        list.services.forEach((s) => {
          if (offer.services.includes(s._id.toString())) {
            matched.push(s);
          }
        });
      });
      return matched;
    };

    // Attach detailed services to each offer
    const offersWithServices = offers.map((offer) => ({
      ...offer.toObject(),
      services: getMatchedServices(offer),
    }));

    res.status(200).json({ success: true, data: offersWithServices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOfferAndPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("offer id --:", id);

    const offer = await offerAndPackageModel.findById(id);
    console.log("offer id vala data --:", offer);
    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    }

    // Manually fetch details of each sub-service
    const serviceList = await mongoose.model("serviceList").find({
      "services._id": { $in: offer.services },
    });

    // Flatten matched services
    const matchedServices = [];
    serviceList.forEach((list) => {
      list.services.forEach((s) => {
        if (offer.services.includes(s._id.toString())) {
          matchedServices.push(s);
        }
      });
    });

    res.json({
      success: true,
      data: {
        ...offer.toObject(),
        services: matchedServices,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✏️ Update Offer / Package
exports.updateOfferAndPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await offerAndPackageModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Offer/Package not found" });
    }

    res.status(200).json({
      success: true,
      message: "Offer/Package updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ❌ Delete Offer / Package
exports.deleteOfferAndPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await offerAndPackageModel.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Offer/Package not found" });
    }

    res.status(200).json({
      success: true,
      message: "Offer/Package deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔄 Toggle Active/Inactive
exports.toggleActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await offerAndPackageModel.findById(id);
    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer/Package not found" });
    }

    offer.isActive = !offer.isActive;
    await offer.save();

    res.status(200).json({
      success: true,
      message: `Offer/Package is now ${offer.isActive ? "Active" : "Inactive"}`,
      data: offer,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
