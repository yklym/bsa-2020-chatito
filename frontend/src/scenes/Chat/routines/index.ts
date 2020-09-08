import { createRoutine } from 'redux-saga-routines';

export const setCurrentChatRoutine = createRoutine('SET_CURRENT_CHAT');
export const setPostsRoutine = createRoutine('SET_POSTS');
export const upsertDraftPostRoutine = createRoutine('UPSERT_DRAFT_POST');
export const upsertDraftPostWithSocketRoutine = createRoutine('UPSERT_DRAFT_POST_WITH_SOCKET');
export const usertDraftsPagePostRoutine = createRoutine('UPSER_DRAFT_PAGE_POST');
export const deleteDraftPostRoutine = createRoutine('DELETE_DRAFT_POST');
export const deleteDraftPostWithSocketRoutine = createRoutine('DELETE_DRAFT_POST_WITH_SOCKET');
export const deleteDraftPostFromDraftsRoutine = createRoutine('DELETE_DRAFT_POST_FROM_DRAFTS');
export const updatePostDraftCommentRoutine = createRoutine('UPDATE_POST_DRAFT_COMMENT');
export const addPostRoutine = createRoutine('ADD_POST');
export const createChatRoutine = createRoutine('CREATE_CHAT');
export const fetchChatUsersRoutine = createRoutine('FETCH_CHAT_USERS');
export const removeUserFromChatRoutine = createRoutine('REMOVE_USER_FROM_CHAT');
export const addPostWithSocketRoutine = createRoutine('ADD_POST_WITH_SOCKET');
export const editPostWithSocketRoutine = createRoutine('EDIT_POST_WITH_SOCKET');
export const addChatWithSocketRoutine = createRoutine('ADD_CHAT_WITH_SOCKET');
export const addReminderRoutine = createRoutine('ADD_REMINDER');
export const addUsersToChatRoutine = createRoutine('ADD_USERS_TO_CHAT');
export const fetchNavigationPostRoutine = createRoutine('FETCH_NAVIGATION_POST');
export const addReminderSuccessPostRoutine = createRoutine('ADD_REMINDER_SUCCESS_POST');
export const createChatAndAddPostRoutine = createRoutine('CREATE_CHAT_AND_ADD_POST');
export const joinChannelRoutine = createRoutine('JOIN_CHANNEL_ROUTINE');
export const fetchPublicChannelRoutine = createRoutine('FETCH_PUBLIC_CHANNEL');
export const toggleChatMuteRoutine = createRoutine('TOGGLE_CHAT_MUTE');
export const setChatMuteSocketRoutine = createRoutine('SET_CHAT_MUTE_SOCKET');
export const renderScrollDownButtonRoutine = createRoutine('RENDER_SCROLL_DOWN_BUTTON');
export const clickToScrollRoutine = createRoutine('CLICK_TO_SCROLL');
