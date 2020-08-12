import { Entity, Column, ManyToOne, OneToMany, JoinColumn, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { Chat } from './Chat';
import { Comment } from './Comment';
import { PostReaction } from './PostReaction';

@Entity()
export class Post extends AbstractEntity {
  @Column()
  text: string;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @RelationId((post: Post) => post.createdByUser)
  readonly createdByUserId: string;

  @ManyToOne(() => Chat, chat => chat.posts)
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @RelationId((post: Post) => post.chat)
  readonly chatId: string;

  @OneToMany(() => PostReaction, postReaction => postReaction.reaction)
  postReactions: PostReaction[];
}
