import { takeEvery } from 'redux-saga/effects';
import { GET_USER_PROFILE, getUserProfileAsync } from './index';
import { getUserProfile } from '../../api/github';
import createAsyncSaga from '../../lib/createAsyncSaga';

const getUserProfileSaga = createAsyncSaga(getUserProfileAsync, getUserProfile);

// function* getUserProfileSaga(action: ReturnType<typeof getUserProfileAsync.request>) {
//   try {
//     const userProfile: GithubProfile = yield call(getUserProfile, action.payload);
//     yield put(getUserProfileAsync.success(userProfile));
//   } catch (e: any) {
//     yield put(getUserProfileAsync.failure(e));
//   }
// }

export default function* githubSaga() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
}
