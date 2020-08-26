import { createRoutine } from 'redux-saga-routines';

export const addCommentRoutine = createRoutine('ADD_COMMENT');
export const upsertDraftCommentRoutine = createRoutine('UPSERT_DRAFT_COMMENT');
export const upsertDraftCommentWithSocketRoutine = createRoutine('UPSERT_DRAFT_COMMENT_WITH_SOCKET');
export const deleteDraftCommentRoutine = createRoutine('DELETE_DRAFT_COMMENT');
export const deleteDraftCommentWithSocketRoutine = createRoutine('DELETE_DRAFT_COMMENT_WITH_SOCKET');
