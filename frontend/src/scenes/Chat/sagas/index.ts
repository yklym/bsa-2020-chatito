import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  setCurrentChatRoutine,
  setPostsRoutine,
  addPostRoutine,
  createChatRoutine,
  fetchChatUsersRoutine,
  removeUserFromChatRoutine
} from '../routines';
import { Routine } from 'redux-saga-routines';
import { fetchChatPosts, addPost, createChat, fetchChatUsers, removeUserFromChat } from 'services/chatService';
import { IPost } from 'common/models/post/IPost';
import { toastrError } from 'services/toastrService';
import { showModalRoutine } from 'routines/modal';
import { IUser } from 'common/models/user/IUser';

function* fetchChatPostsRequest({ payload }: Routine<any>): Routine<any> {
  try {
    const responce: IPost[] = yield call(fetchChatPosts, payload);
    yield put(setPostsRoutine.success(responce));
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchPostsRequest() {
  yield takeEvery(setPostsRoutine.TRIGGER, fetchChatPostsRequest);
}

function* fetchAddPostRequest({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(addPost, payload);
  } catch (error) {
    yield call(toastrError, error.message);
  }
}

function* watchAddPostRequest() {
  yield takeEvery(addPostRoutine.TRIGGER, fetchAddPostRequest);
}

function* setCurrChat({ payload }: Routine<any>): Routine<any> {
  yield put(setCurrentChatRoutine.success(payload));
}

function* watchCurrChat() {
  yield takeEvery(setCurrentChatRoutine.TRIGGER, setCurrChat);
}

function* toggleCreateChatModal({ payload }: Routine<any>) {
  yield call(showModalRoutine, payload);
}

function* watchToggleCreateChatModal() {
  yield takeEvery(showModalRoutine.TRIGGER, toggleCreateChatModal);
}

function* createChatRequest({ payload }: Routine<any>) {
  try {
    const chat = yield call(createChat, payload);
    yield put(createChatRoutine.success(chat));
    yield put(showModalRoutine({ modalType: payload.type, show: false }));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(createChatRoutine.failure());
  }
}

function* watchCreateChatRequest() {
  yield takeEvery(createChatRoutine.TRIGGER, createChatRequest);
}

function* fetchChatUsersRequest({ payload }: Routine<any>) {
  try {
    const users: IUser[] = yield call(fetchChatUsers, payload);
    yield put(fetchChatUsersRoutine.success(users));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(fetchChatUsersRoutine.failure(error.message));
  }
}

function* watchFetchChatUsersRequest() {
  yield takeEvery(fetchChatUsersRoutine.TRIGGER, fetchChatUsersRequest);
}

function* removeUserFromChatRequest({ payload }: Routine<any>) {
  try {
    const { chatId, userId } = payload;
    yield call(removeUserFromChat, chatId, userId);
    yield put(removeUserFromChatRoutine.success(userId));
  } catch (error) {
    yield call(toastrError, error.message);
    yield put(removeUserFromChatRoutine.failure(error.message));
  }
}

function* watchRemoveUserFromChat() {
  yield takeEvery(removeUserFromChatRoutine.TRIGGER, removeUserFromChatRequest);
}

export default function* chatSaga() {
  yield all([
    watchPostsRequest(),
    watchCurrChat(),
    watchAddPostRequest(),
    watchCreateChatRequest(),
    watchToggleCreateChatModal(),
    watchFetchChatUsersRequest(),
    watchRemoveUserFromChat()
  ]);
}
