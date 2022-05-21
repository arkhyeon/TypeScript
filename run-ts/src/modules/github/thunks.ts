import { getUserProfile } from '../../api/github';
import { getUserProfileAsync } from './actions';
import createAsyncThunk from '../../lib/createAsyncThunk';

const getUserProfileThunk = createAsyncThunk(getUserProfileAsync, getUserProfile);

export default getUserProfileThunk;

// export default function getUserProfileThunk(
//   username: string,
// ): ThunkAction<void, RootState, null, GithubAction> {
//   return async (dispatch) => {
//     const { request, success, failure } = getUserProfileAsync;
//     dispatch(request());
//     try {
//       const userProfile = await getUserProfile(username);
//       dispatch(success(userProfile));
//     } catch (e: any) {
//       dispatch(failure(e));
//     }
//   };
// }
