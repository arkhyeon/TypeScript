import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { ReportList } from '../../api/reportList';

export const GET_REPORT_LIST = 'report/GET_REPORT_LIST';
export const GET_REPORT_LIST_SUCCESS = 'report/GET_REPORT_LIST_SUCCESS';
export const GET_REPORT_LIST_ERROR = 'report/GET_REPORT_LIST_ERROR';

export const getReportListAsync = createAsyncAction(
  GET_REPORT_LIST,
  GET_REPORT_LIST_SUCCESS,
  GET_REPORT_LIST_ERROR,
)<string, ReportList, AxiosError>();
