import { createReducer } from 'typesafe-actions';
import { ReportListAction, ReportListState } from './types';
import { asyncState, createAsyncReducer, transformToArray } from '../../lib/reducerUtils';
import { getReportListAsync } from './actions';

const initialState: ReportListState = {
  reportList: asyncState.initial(),
};

const reportList = createReducer<ReportListState, ReportListAction>(initialState).handleAction(
  transformToArray(getReportListAsync),
  createAsyncReducer(getReportListAsync, 'reportList'),
);

export default reportList;
