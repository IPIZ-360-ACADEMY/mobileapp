import { Company, CreateCompanyDTO, UpdateCompanyDTO } from '../models/Company';

export class CompanyService {
  // In-memory storage for skeleton - replace with database later
  private companies: Company[] = [];
  private nextId = 1;

  async createCompany(dto: CreateCompanyDTO): Promise<Company> {
    const company: Company = {
      id: this.nextId.toString(),
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.companies.push(company);
    this.nextId++;

    return company;
  }

  async getCompanyById(id: string): Promise<Company | null> {
    return this.companies.find(company => company.id === id) || null;
  }

  async getCompaniesByIndustry(industry: string): Promise<Company[]> {
    return this.companies.filter(company => company.industry === industry);
  }

  async searchCompanies(query: string): Promise<Company[]> {
    const lowerQuery = query.toLowerCase();
    return this.companies.filter(company =>
      company.name.toLowerCase().includes(lowerQuery) ||
      company.description.toLowerCase().includes(lowerQuery) ||
      company.industry.toLowerCase().includes(lowerQuery)
    );
  }

  async updateCompany(id: string, dto: UpdateCompanyDTO): Promise<Company | null> {
    const index = this.companies.findIndex(company => company.id === id);
    if (index === -1) return null;

    this.companies[index] = {
      ...this.companies[index],
      ...dto,
      updatedAt: new Date(),
    };

    return this.companies[index];
  }

  async deleteCompany(id: string): Promise<boolean> {
    const index = this.companies.findIndex(company => company.id === id);
    if (index === -1) return false;

    this.companies.splice(index, 1);
    return true;
  }

  async getAllCompanies(): Promise<Company[]> {
    return [...this.companies];
  }
}