import React from 'react';
import styles from './styles.module.sass';

import {
  faHashtag,
  faLock,
  faUserPlus,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'react-bootstrap/Image';
import { IAppState } from 'common/models/store';
import { IChat } from 'common/models/chat/IChat';
import { IUser } from 'common/models/user/IUser';
import { userLogoDefaultUrl } from 'common/configs/defaults';
import { connect } from 'react-redux';
import InviteChatModal from 'scenes/Chat/containers/InviteChatModal';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ModalTypes } from 'common/enums/ModalTypes';
import { showModalRoutine } from 'routines/modal';
import ChatMembers from 'containers/ChatMembers';
import { ChatType } from 'common/enums/ChatType';
import { createDirectChannelName } from 'common/helpers/nameHelper';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const privateChannelIcon = (
  <FontAwesomeIcon icon={faLock} className={styles.iconChatType} />
);

const publicChannelIcon = (
  <FontAwesomeIcon icon={faHashtag} className={styles.iconChatType} />
);

interface IProps {
  chat?: IChat;
  showModal: IBindingCallback1<IModalRoutine>;
  currentUser: IUser;
}

const ChatHeader: React.FC<IProps> = ({ chat, showModal, currentUser }) => {
  const maxAvatarsDisplayed = 5;
  const userAvatars = (users: IUser[]) => {
    const usersToDisplay = users.slice(0, maxAvatarsDisplayed);
    return usersToDisplay.map(user => {
      const imageUrl = user.id === currentUser.id ? currentUser.imageUrl : user.imageUrl;
      return (
        <Image
          src={imageUrl || userLogoDefaultUrl}
          key={user.id}
          rounded
          className={styles.memberAvatarIcon}
        />
      );
    });
  };

  const onInviteUser = () => {
    showModal({ modalType: ModalTypes.InviteChat, show: true });
  };

  if (!chat) {
    return null;
  }

  const showChatMembers = () => {
    showModal({ modalType: ModalTypes.ChatMembers, show: true });
  };

  const chatName = chat.type === ChatType.DirectMessage
    ? createDirectChannelName(chat.users, currentUser)[0] : chat.name;

  const addPeoplePopover = (
    <Popover id="addPeoplePopover" className={styles.popOverWindow}>
      <span>
        Add people
        <br />
        to the channel
      </span>
    </Popover>
  );

  const viewMembersPopover = (
    <Popover id="viewMembersPopover" className={styles.popOverWindow}>
      <span>
        View all members
      </span>
    </Popover>
  );

  return (
    <div className={styles.chatContainer} key={chat.id}>

      <div className={styles.headerInfo}>
        <div className={styles.titleBlock}>
          {chat.isPrivate ? privateChannelIcon : publicChannelIcon}
          <div className={styles.title}>{chatName}</div>
          <FontAwesomeIcon icon={faStar} className={styles.icon} />
        </div>

      </div>

      <div className={styles.rightHeaderBlock}>
        {chat.type === ChatType.Channel && (
          <>
            <OverlayTrigger
              trigger={['hover', 'hover']}
              delay={{ show: 300, hide: 0 }}
              rootClose
              placement="bottom"
              overlay={viewMembersPopover}
            >
              <div
                role="button"
                className={styles.memberAvatarBlock}
                onClick={showChatMembers}
                onKeyDown={showChatMembers}
                tabIndex={0}
              >
                {userAvatars(chat.users)}
                <div className={styles.memberCounter}>{chat.users.length || 0}</div>
              </div>
            </OverlayTrigger>
            <OverlayTrigger
              trigger={['hover', 'hover']}
              delay={{ show: 300, hide: 0 }}
              rootClose
              placement="bottom"
              overlay={addPeoplePopover}
            >
              <button type="button" className="button-unstyled" onClick={onInviteUser}>
                <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
              </button>
            </OverlayTrigger>
            <InviteChatModal chatName={chat.name} chatId={chat.id} toggleModal={showModal} chatUsers={chat.users} />
            <ChatMembers />
          </>
        )}
        <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { chat } = state.chat;
  return {
    chat,
    currentUser: state.user.user as IUser
  };
};

const mapDispatchToProps = {
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
