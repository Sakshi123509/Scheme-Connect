
import Scheme from '../models/scheme.js';


//get all schemes
export const getAllSchemes = async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.status(200).json({ schemes });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
}

//get scheme by id
export const getSchemeById = async (req, res) => {
    try {
        const scheme = await Scheme.findById(req.params.id);//user ke jgh baki kuch h to req.params.id
        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }
        res.status(200).json({ scheme });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
}


//search schemes
export const SearchSchemes = async (req, res) => {
    try {
        const query = req.params.query;
        //search in name and description
        const schemes = await Scheme.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json({ schemes });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
}

// Filter schemes (category, status)
export const filterSchemes = async (req, res) => {
    try {
        const { category, status } = req.query;

        const filter = {};
        if (category) filter.category = category;
        if (status) filter.status = status;

        const schemes = await Scheme.find(filter);
        res.status(200).json(schemes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//admin only - create scheme
export const createScheme = async (req, res) => {
    try {
        const scheme = new Scheme(req.body);
        const savedScheme = await scheme.save();
        res.status(201).json({ message: 'Scheme created', scheme: savedScheme });
    } catch (err) {
        console.error('Error creating scheme:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Admin only - Import schemes from external API
export const importSchemesFromAPI = async (req, res) => {
    try {
        const response = await axios.get(process.env.SCHEME_API_URL);

        if (!Array.isArray(response.data)) {
            return res.status(400).json({ message: 'Invalid API response format' });
        }

        const schemes = response.data.map(item => ({
            name: item.name,
            description: item.description,
            category: item.category || 'Education',
            applicationFormUrl: item.applicationFormUrl || item.url,
            youtubeLink: item.youtubeLink || '',
            website: item.website || '',
            status: 'Active'
        }));

        await Scheme.insertMany(schemes, { ordered: false });

        res.status(201).json({
            message: 'Schemes imported successfully',
            count: schemes.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'API import failed' });
    }
};


export const deleteScheme = async (req, res) => {
    try {
        const scheme = await Scheme.findByIdAndDelete(req.params.id);
        if (!scheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }
        res.status(200).json({ message: 'Scheme deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}


export const updateScheme = async (req, res) => {
    try {
        const scheme = await Scheme.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!scheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }

        res.status(200).json({
            message: 'Scheme updated successfully',
            scheme
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NGE3ZDNlYjNkOGI4MmE1MmMzYWVjMSIsImlhdCI6MTc2NjUwMTYzMiwiZXhwIjoxNzY3MTA2NDMyfQ.gzxMbBwzr1brTa-ZxPFD3MVtGopl2lUOaw0IZSKf770