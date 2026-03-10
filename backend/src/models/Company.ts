export interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  industry: string;
  location: string;
  contactEmail: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCompanyDTO {
  name: string;
  description: string;
  logo?: string;
  website?: string;
  industry: string;
  location: string;
  contactEmail: string;
  contactPhone?: string;
}

export interface UpdateCompanyDTO {
  name?: string;
  description?: string;
  logo?: string;
  website?: string;
  industry?: string;
  location?: string;
  contactEmail?: string;
  contactPhone?: string;
}