// routes/jobPostingRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/jobPostingController');

router.get('/jobs', controller.getJobs);
router.get('/jobs/:id', controller.getJobById);
// expose filter options
router.get('/filters', async (req, res) => {
  try {
    const [wt, ind] = await Promise.all([
      require('../config/supabase').from('work_type').select('work_type_name').then(r => r.data || []),
      require('../config/supabase').from('industry').select('name').then(r => r.data || [])
    ]);

    const workTypes = Array.from(new Set((wt || []).map(w => w.work_type_name))).filter(Boolean);
    const industries = Array.from(new Set((ind || []).map(i => i.name))).filter(Boolean);

    res.json({ workTypes, industries });
  } catch (e) {
    res.status(500).json({ message: 'Failed to load filters', error: e.message });
  }
});

module.exports = router;


