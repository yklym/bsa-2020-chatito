import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import {
  getAllChatPosts,
  addChat,
  getAllUserChats,
  getAllChatUsers,
  removeUserFromChat,
  addUsersToChat } from '../../services/chatService';
import { addReminder } from '../../services/reminderService';

const router = Router();

router
  .get('/:id/posts', run((req: Request) => getAllChatPosts({
    chatId: req.params.id,
    userId: req.user.id,
    ...req.query
  })))
  .get('/', run((req: Request) => getAllUserChats(req.user.id)))
  .get('/:id/users', run((req: Request) => getAllChatUsers(req.params.id)))
  .delete('/:id/users/:userId', run((req: Request) => removeUserFromChat(req.params.id, req.params.userId)))
  .post('/', run(async (req: Request) => {
    const chat = await addChat(req.user.id, req.body);
    req.io.of('/chat').emit('joinChat', chat.id);
    return chat;
  }))
  .post('/:id/reminders', run((req: Request) => addReminder(
    {
      chatId: req.params.id,
      userId: req.user.id,
      body: req.body
    }
  )))
  .post('/invite-users', run((req: Request) => addUsersToChat(req.body.chatId, req.body.userIds)));

export default router;
