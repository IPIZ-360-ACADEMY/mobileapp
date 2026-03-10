import { Router } from 'express';
import { JobController } from '../controllers/JobController';

const router = Router();
const jobController = new JobController();

// POST /api/jobs
router.post('/', jobController.createJob.bind(jobController));

// GET /api/jobs
router.get('/', jobController.getAllJobs.bind(jobController));

// GET /api/jobs/open
router.get('/open', jobController.getOpenJobs.bind(jobController));

// GET /api/jobs/search?q=query
router.get('/search', jobController.searchJobs.bind(jobController));

// GET /api/jobs/company/:companyId
router.get('/company/:companyId', jobController.getJobsByCompany.bind(jobController));

// GET /api/jobs/type/:type
router.get('/type/:type', jobController.getJobsByType.bind(jobController));

// GET /api/jobs/:id
router.get('/:id', jobController.getJob.bind(jobController));

// PUT /api/jobs/:id
router.put('/:id', jobController.updateJob.bind(jobController));

// DELETE /api/jobs/:id
router.delete('/:id', jobController.deleteJob.bind(jobController));

export default router;