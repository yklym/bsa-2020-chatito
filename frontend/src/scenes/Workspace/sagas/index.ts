import {
  addWorkspaceRoutine,
  setActiveThreadRoutine,
  fetchUserChatsRoutine,
  fetchPostCommentsRoutine
} from 'scenes/Workspace/routines';
import { Routine } from 'redux-saga-routines';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { addWorkspace } from 'services/workspaceService';
import { fetchPostComments } from 'services/threadsService';
import { Routes } from 'common/enums/Routes';
import { push } from 'connected-react-router';
import { fetchUserChats } from 'services/chatServise';
import { toastrError } from 'services/toastrService';

function* addWorkspaceReq({ payload }: Routine<any>) {
  try {
    const workspace = yield call(addWorkspace, payload);
    yield put(addWorkspaceRoutine.success(workspace));
    yield put(push(Routes.Workspace.replace(':whash', workspace.hash)));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(addWorkspaceRoutine.failure(error));
  }
}

function* watchPostWorkspaceName() {
  yield takeEvery(addWorkspaceRoutine.TRIGGER, addWorkspaceReq);
}

function* fetchPostCommentsRequest({ payload }: Routine<any>) {
  try {
    const comments = yield call(fetchPostComments, payload);
    yield put(fetchPostCommentsRoutine.success(comments));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchPostCommentsRoutine.failure());
  }
}

function* watchFetchPostCommentsRequest() {
  yield takeEvery(fetchPostCommentsRoutine.TRIGGER, fetchPostCommentsRequest);
}

function* setActiveThread({ payload }: Routine<any>) {
  try {
    const { id } = payload;
    yield put(fetchPostCommentsRoutine.trigger(id));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(setActiveThreadRoutine.failure());
  }
}

function* watchSetActiveThread() {
  yield takeEvery(setActiveThreadRoutine.TRIGGER, setActiveThread);
}

function* fetchUserChatsRequest() {
  try {
    const response = yield call(fetchUserChats);
    yield put(fetchUserChatsRoutine.success(response));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchUserChatsRoutine.failure(error.message));
  }
}

function* watchFetchUserChatsRequest() {
  yield takeEvery(fetchUserChatsRoutine.TRIGGER, fetchUserChatsRequest);
}

export default function* workspaceSaga() {
  yield all([
    watchPostWorkspaceName(),
    watchFetchPostCommentsRequest(),
    watchSetActiveThread(),
    watchFetchUserChatsRequest()
  ]);
}
