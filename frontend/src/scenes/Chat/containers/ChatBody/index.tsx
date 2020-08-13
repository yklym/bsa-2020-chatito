import React from 'react';
import styles from './styles.module.sass';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IPost } from 'common/models/post/IPost';
import Post from 'components/Post/index';

interface IProps {
  messages: IPost[];
}

const ChatBody: React.FC<IProps> = ({ messages }) => (
  <div className={styles.chatBody}>
    {messages.map(m => <Post post={m} />)}
  </div>
);

const mapStateToProps = (state: IAppState) => ({
  messages: state.chat.posts
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
