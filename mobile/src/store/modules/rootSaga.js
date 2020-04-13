import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import saga from './user/sagas';

export default function* rootSaga() {
  return yield all([auth, saga]);
}
