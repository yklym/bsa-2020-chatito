import React from 'react';
import styles from './styles.module.sass';

import ChatHeader from '../ChatHeader';
import ChatBody from '../ChatBody';
import NoChatReminder from '../NoChatReminder';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IChat } from 'common/models/chat/IChat';

interface IProps {
  chat?: IChat;
}

const ChatContainer: React.FC<IProps> = ({ chat }) => {
  if (!chat) {
    return (
      <div className={styles.chatContainerMessage}>
        <NoChatReminder />
      </div>
    );
  }

  return (
    <div className={styles.chatContainer}>
      <ChatHeader />
      <ChatBody />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  chat: state.chat.chat
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
