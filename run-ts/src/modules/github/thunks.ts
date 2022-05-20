import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';
import { getUserProfile } from '../../api/github';
import { getUserProfileAsync } from './actions';
import { GithubAction } from './types';

export default function getUserProfileThunk(
  username: string,
): ThunkAction<void, RootState, null, GithubAction> {
  return async (dispatch) => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      const userProfile = await getUserProfile(username);
      dispatch(success(userProfile));
    } catch (e: any) {
      dispatch(failure(e));
    }
  };
}
