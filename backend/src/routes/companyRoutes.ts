import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';

const router = Router();
const companyController = new CompanyController();

// POST /api/companies
router.post('/', companyController.createCompany.bind(companyController));

// GET /api/companies
router.get('/', companyController.getAllCompanies.bind(companyController));

// GET /api/companies/search?q=query
router.get('/search', companyController.searchCompanies.bind(companyController));

// GET /api/companies/industry/:industry
router.get('/industry/:industry', companyController.getCompaniesByIndustry.bind(companyController));

// GET /api/companies/:id
router.get('/:id', companyController.getCompany.bind(companyController));

// PUT /api/companies/:id
router.put('/:id', companyController.updateCompany.bind(companyController));

// DELETE /api/companies/:id
router.delete('/:id', companyController.deleteCompany.bind(companyController));

export default router;