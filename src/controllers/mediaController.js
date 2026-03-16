const Media = require('../models/Media');

const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMedia = async (req, res) => {
  try {
    const media = new Media(req.body);
    const savedMedia = await media.save();

    res.status(201).json(savedMedia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMedia = async (req, res) => {
  try {
    const updatedMedia = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMedia) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.status(200).json(updatedMedia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const deletedMedia = await Media.findByIdAndDelete(req.params.id);

    if (!deletedMedia) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
};
