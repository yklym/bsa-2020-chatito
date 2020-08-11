import React, { useState, useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import { IAppState } from 'common/models/store';
import { fetchWorkspacesRoutine } from 'routines/user';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WorkspaceItem from './components/WorkspaceItem';

export interface IWorkspaceString {
  [key: string]: string;
}

interface IProps {
  fetchWorkspaces: Function;
  workspaces: IWorkspaceString[];
  loading: boolean;
}
/* eslint-disable-next-line */
const WorkspaceToolbar: FunctionComponent<IProps> = (props: IProps) => {
  const [workspaces, setWorkspaces]: [IWorkspaceString[], Function] = useState([]);
  const tempUrl = 'https://miro.medium.com/max/1200/1*PmenN7tXUwWN019qGJQ_SQ.jpeg';

  useEffect(() => {
    // MOCK
    const fetchedTest = [{ name: 'first', id: '1', imgUrl: tempUrl }, { name: 'first', id: '2', imgUrl: tempUrl }];
    setWorkspaces(fetchedTest);
  }, []);

  return (
    <div className={styles.workspaceToolbarContainer}>
      {workspaces.map(workspace => <WorkspaceItem id={workspace.id} key={workspace.id} workspace={workspace} />)}

      <div className={styles.plusIconContainer}>
        <FontAwesomeIcon
          className={styles.plusIcon}
          icon={faPlus}
          size="2x"
          // onClick={() => { makeRedirect }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  loading: state.user.isLoading,
  workspaces: state.user.workspaceList
});

const mapDispatchToProps = {
  fetchWorkspaces: fetchWorkspacesRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceToolbar);
