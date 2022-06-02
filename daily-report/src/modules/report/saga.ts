import { takeEvery } from 'redux-saga/effects';
import { getReportList } from '../../api/reportList';
import { GET_REPORT_LIST, getReportListAsync } from './actions';
import createAsyncSaga from '../../lib/createAsyncSaga';

const getReportListSaga = createAsyncSaga(getReportListAsync, getReportList);

export default function* reportListSaga() {
  yield takeEvery(GET_REPORT_LIST, getReportListSaga);
}
