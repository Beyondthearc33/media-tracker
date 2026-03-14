const LibraryItem = require('../models/LibraryItem');


/* ***************************
 * GET /api/library
 * *************************** */
exports.getAllLibraryItems = async (req, res) => {
    try {
        const items = await LibraryItem.find();

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/* ***************************
 * GET /api/library/:id
 * *************************** */
exports.getLibraryItemById = async (req, res) => { 
    try {
        const library_item = await LibraryItem.findById(req.params.id);

        if (!library_item) {
            return res.status(404).json({ message: 'Library item not found' });
        }

        res.status(200).json(library_item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/* ***************************
 * POST /api/library
 * *************************** */
exports.createLibraryItem = async (req, res) => {
    try {
        const newItem = new LibraryItem(req.body);
        const savedItem = await newItem.save();

        res.status(201).json(savedItem); // Created
    } catch (error) {
        if (error.code === 11000) { // MongoDB throws error 11000 when duplicates happen
            return res.status(400).json({
                message: 'Media already exists in library'
            });
        }

        res.status(500).json({ message: error.message });
    }
}


/* ***************************
 * PUT /api/library/:id
 * *************************** */
exports.updateLibraryItem = async (req, res) => {
    try {
        const updatedItem = await LibraryItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updateItem) {
            return res.status(404).json({ message: 'Library item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


/* ***************************
 * DELETE /api/library/:id
 * *************************** */
exports.deleteLibraryItem = async (req, res) => {
    try {
        const deletedItem = await LibraryItem.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Library item not found' });
        }

        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}