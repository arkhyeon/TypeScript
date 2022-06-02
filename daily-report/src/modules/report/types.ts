import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AsyncState } from '../../lib/reducerUtils';
import { ReportList } from '../../api/reportList';

export type ReportListAction = ActionType<typeof actions>;

export type ReportListState = {
  reportList: AsyncState<ReportList, Error>;
};
