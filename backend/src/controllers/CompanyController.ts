import { Request, Response, NextFunction } from 'express';
import { CompanyService } from '../services/CompanyService';
import { CreateCompanyDTO, UpdateCompanyDTO } from '../models/Company';

const companyService = new CompanyService();

export class CompanyController {
  async createCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: CreateCompanyDTO = req.body;
      const company = await companyService.createCompany(dto);
      res.status(201).json({
        success: true,
        data: company,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const company = await companyService.getCompanyById(id);

      if (!company) {
        res.status(404).json({
          success: false,
          error: 'Company not found',
        });
        return;
      }

      res.json({
        success: true,
        data: company,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCompaniesByIndustry(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { industry } = req.params;
      const companies = await companyService.getCompaniesByIndustry(industry);
      res.json({
        success: true,
        data: companies,
      });
    } catch (error) {
      next(error);
    }
  }

  async searchCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Query parameter "q" is required',
        });
        return;
      }

      const companies = await companyService.searchCompanies(q);
      res.json({
        success: true,
        data: companies,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const dto: UpdateCompanyDTO = req.body;
      const company = await companyService.updateCompany(id, dto);

      if (!company) {
        res.status(404).json({
          success: false,
          error: 'Company not found',
        });
        return;
      }

      res.json({
        success: true,
        data: company,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await companyService.deleteCompany(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Company not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Company deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const companies = await companyService.getAllCompanies();
      res.json({
        success: true,
        data: companies,
      });
    } catch (error) {
      next(error);
    }
  }
}