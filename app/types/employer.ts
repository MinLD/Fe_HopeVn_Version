export interface CompanyFormValues {
  name: string;
  description: string;
  industry: string;
  website: string;
  phoneNumber: string;
  email: string;
  address: string;
  size: "Small" | "Medium" | "Large";
  companyImage?: File;
  taxCode: string;
}
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  industry: string;
  urgent: boolean;
  postedAt: Date;
  employerId: string;
  applicants: number;
}
