import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/travel-planner', async (req, res) => {
  try {
    const { destination, dates, activities, people, travelWith } = req.body;
    const response = await axios.post('https://YOUR_GEMINI_API_ENDPOINT', {
      destination, dates, activities, people, travelWith
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error); // Log the entire error object for detailed debugging
    res.status(500).json({ success: false, message: 'Failed to fetch travel plan' });
  }
});

export default router;
