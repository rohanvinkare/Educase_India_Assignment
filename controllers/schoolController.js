const { addSchool, getAllSchools, deleteSchoolById, deleteAllSchoolsFromDB } = require('../models/schoolModel');

async function createSchool(req, res) {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const result = await addSchool(name, address, latitude, longitude);

        if (result.status !== 201) {
            return res.status(result.status).json({ error: result.message });
        }

        res.status(201).json(result.data);
    } catch (error) {
        console.error('Error creating school:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function listSchools(req, res) {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude || typeof latitude !== 'string' || typeof longitude !== 'string') {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const userLat = parseFloat(latitude);
        const userLong = parseFloat(longitude);

        const result = await getAllSchools();

        if (result.status !== 200) {
            return res.status(result.status).json({ error: result.message });
        }

        const sortedSchools = result.data.map(school => {
            const distance = Math.sqrt(
                Math.pow(school.latitude - userLat, 2) + Math.pow(school.longitude - userLong, 2)
            );
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteSchool(req, res) {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'School ID is required' });
        }

        const result = await deleteSchoolById(id);

        if (result.status === 404) {
            return res.status(404).json({ error: result.message });
        }

        if (result.status !== 200) {
            return res.status(result.status).json({ error: result.message });
        }

        res.status(200).json({ message: 'School deleted successfully' });
    } catch (error) {
        console.error('Error deleting school:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteAllSchools(req, res) {
    try {
        const result = await deleteAllSchoolsFromDB();

        if (result.status !== 200) {
            return res.status(result.status).json({ error: result.message });
        }

        res.status(200).json({ message: 'All schools deleted successfully' });
    } catch (error) {
        console.error('Error deleting all schools:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createSchool, listSchools, deleteSchool, deleteAllSchools };
