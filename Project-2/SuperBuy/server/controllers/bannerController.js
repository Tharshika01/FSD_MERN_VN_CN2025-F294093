// backend/controllers/bannerController.js
import { Admin } from '../models/Schema.js';

export const getAllBanners = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    res.json(admin?.banner || '');
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch banner' });
  }
};
