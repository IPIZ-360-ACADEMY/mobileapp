import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';
import { withAuthContext, requirePermission } from '../middlewares/authorize';
import { Permission } from '../auth/rbac';

const router = Router();
const companyController = new CompanyController();

router.use(withAuthContext);

// POST /api/companies
router.post('/', requirePermission(Permission.COMPANY_CREATE), companyController.createCompany.bind(companyController));

// GET /api/companies
router.get('/', requirePermission(Permission.COMPANY_READ), companyController.getAllCompanies.bind(companyController));

// GET /api/companies/search?q=query
router.get('/search', requirePermission(Permission.COMPANY_READ), companyController.searchCompanies.bind(companyController));

// GET /api/companies/industry/:industry
router.get('/industry/:industry', requirePermission(Permission.COMPANY_READ), companyController.getCompaniesByIndustry.bind(companyController));

// GET /api/companies/:id
router.get('/:id', requirePermission(Permission.COMPANY_READ), companyController.getCompany.bind(companyController));

// PUT /api/companies/:id
router.put('/:id', requirePermission(Permission.COMPANY_UPDATE), companyController.updateCompany.bind(companyController));

// DELETE /api/companies/:id
router.delete('/:id', requirePermission(Permission.COMPANY_DELETE), companyController.deleteCompany.bind(companyController));

export default router;