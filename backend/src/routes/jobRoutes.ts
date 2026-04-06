import { Router } from 'express';
import { JobController } from '../controllers/JobController';
import { withAuthContext, requirePermission } from '../middlewares/authorize';
import { Permission } from '../auth/rbac';

const router = Router();
const jobController = new JobController();

router.use(withAuthContext);

// POST /api/jobs
router.post('/', requirePermission(Permission.JOB_CREATE), jobController.createJob.bind(jobController));

// GET /api/jobs
router.get('/', requirePermission(Permission.JOB_READ), jobController.getAllJobs.bind(jobController));

// GET /api/jobs/open
router.get('/open', requirePermission(Permission.JOB_READ), jobController.getOpenJobs.bind(jobController));

// GET /api/jobs/search?q=query
router.get('/search', requirePermission(Permission.JOB_READ), jobController.searchJobs.bind(jobController));

// GET /api/jobs/company/:companyId
router.get('/company/:companyId', requirePermission(Permission.JOB_READ), jobController.getJobsByCompany.bind(jobController));

// GET /api/jobs/type/:type
router.get('/type/:type', requirePermission(Permission.JOB_READ), jobController.getJobsByType.bind(jobController));

// GET /api/jobs/:id
router.get('/:id', requirePermission(Permission.JOB_READ), jobController.getJob.bind(jobController));

// PUT /api/jobs/:id
router.put('/:id', requirePermission(Permission.JOB_UPDATE), jobController.updateJob.bind(jobController));

// DELETE /api/jobs/:id
router.delete('/:id', requirePermission(Permission.JOB_DELETE), jobController.deleteJob.bind(jobController));

export default router;