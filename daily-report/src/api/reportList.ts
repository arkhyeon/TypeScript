import axios from 'axios';

export interface Report {
  id: number;
  name: string;
  contents: string;
  input_dt: Date;
}
export interface ReportList {
  map(arg0: (report: Report) => string): import('react').ReactNode;
  reports: Report[];
}

export async function getReportList(name: string) {
  const response = await axios.get<ReportList>(`http://localhost:4000/reportList`, {
    withCredentials: true,
  });
  return response.data;
}
