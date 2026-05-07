const db = require('../config/db');

// Add School API
exports.addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validation
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Valid name is required.' });
        }
        if (!address || typeof address !== 'string' || address.trim() === '') {
            return res.status(400).json({ error: 'Valid address is required.' });
        }
        if (latitude === undefined || typeof latitude !== 'number') {
            return res.status(400).json({ error: 'Valid latitude is required.' });
        }
        if (longitude === undefined || typeof longitude !== 'number') {
            return res.status(400).json({ error: 'Valid longitude is required.' });
        }

        // Insert into database
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [name.trim(), address.trim(), latitude, longitude]);

        res.status(201).json({
            message: 'School added successfully.',
            schoolId: result.insertId
        });
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// List Schools API
exports.listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validation
        if (!latitude || isNaN(parseFloat(latitude))) {
            return res.status(400).json({ error: 'Valid user latitude is required.' });
        }
        if (!longitude || isNaN(parseFloat(longitude))) {
            return res.status(400).json({ error: 'Valid user longitude is required.' });
        }

        const userLat = parseFloat(latitude);
        const userLng = parseFloat(longitude);

        // Fetch all schools from the database
        const [schools] = await db.execute('SELECT * FROM schools');

        // Calculate distance for each school and sort
        const sortedSchools = schools.map(school => {
            const distance = calculateDistance(userLat, userLng, school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

/**
 * Helper function to calculate distance using Haversine formula (in kilometers)
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degree) => degree * (Math.PI / 180);

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
}
