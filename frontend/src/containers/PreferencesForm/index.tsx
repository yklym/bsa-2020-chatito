import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { IAppState } from 'common/models/store';
import { showModalRoutine } from 'routines/modal';
import { updateAudioRoutine, editProfileRoutine } from 'routines/user';
import styles from './styles.module.sass';
import { IUser } from 'common/models/user/IUser';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import AudioRecorder from 'containers/AudioRecorder';
import PlayAudioButton from 'components/PlayAudioButton';
import { uploadOnAWS, signS3Audio } from 'services/awsService';
import { toastr } from 'react-redux-toastr';
import LoaderWrapper from 'components/LoaderWrapper';
import { defaultNotificationAudio } from 'common/configs/defaults';
import { IncomingSoundOptions as soundOptTypes } from 'common/enums/IncomingSoundOptions';

interface IProps {
  editProfile: IBindingCallback1<IUser>;
  user?: IUser | null;
  isUserLoading: boolean;
  handleClose: IBindingAction;
  updateAudio: (url: string) => void;
}

const PreferencesForm: FunctionComponent<IProps> = ({
  handleClose,
  updateAudio,
  editProfile,
  isUserLoading,
  user = undefined
}: IProps) => {
  if (!user) return <></>;
  const [userAudio, setUserAudio] = useState(user.audio);
  const [newAudioBlob, setNewAudioBlob] = useState<Blob | null>(null);
  const [recordingErr, setRecordingErr] = useState('');
  const [isAudioLoading, setAudioLoading] = useState(false);
  const [isUserAudioDefault, setUserAudioDefault] = useState(defaultNotificationAudio === userAudio);
  const [incomingSoundOptions, setIncomingSoundOptions] = useState<soundOptTypes>(user.incomingSoundOptions || soundOptTypes.AllowCustom); // eslint-disable-line

  const saveAudio = async () => {
    try {
      setAudioLoading(true);
      const { signedRequest, fileName, link } = await signS3Audio();
      if (newAudioBlob) {
        await uploadOnAWS(signedRequest, newAudioBlob, fileName, 'mp3');
        setUserAudio(link);
        await updateAudio(link);
      }
      setAudioLoading(false);
    } catch (erorr) {
      toastr.error('Error', erorr.message);
    }
  };

  const onRecordingError = (error: string) => setRecordingErr(error);

  const handleSubmit = async () => {
    if (!isUserAudioDefault && newAudioBlob) {
      await saveAudio();
    }

    const editUserProps = { ...user, incomingSoundOptions };
    delete editUserProps.audio;
    delete editUserProps.imageUrl;
    if (isUserAudioDefault) {
      editUserProps.audio = defaultNotificationAudio;
      setUserAudio(defaultNotificationAudio);
    }
    editProfile(editUserProps);
  };

  const onRecord = (blob: Blob | null, blobUrl: string | null) => {
    onRecordingError('');
    if (blob && blobUrl) {
      setNewAudioBlob(blob);
      setUserAudio(blobUrl);
    } else {
      setUserAudio(user.audio);
      setNewAudioBlob(null);
    }
  };
  return (
    <LoaderWrapper loading={isAudioLoading || isUserLoading} height="100%">
      <header className={styles.modalHeader}>
        Preferences
      </header>
      <div className={styles.modalBody}>

        <div className={styles.modalNav}>
          <ul>Sounds</ul>
        </div>

        <div className={styles.mainWrapper}>
          <h3 className={styles.subHeader}>What you hear when users write you:</h3>

          <Form.Group controlId="formBasicCheckbox" className={styles.radioFormGroup}>
            <Form.Check
              type="radio"
              id="preferencesAudioRadioDefault"
              checked={isUserAudioDefault}
              onChange={() => setUserAudioDefault(true)}
              name="default"
              label="Default sound"
            />

            <Form.Check
              type="radio"
              id="preferencesAudioRadioCustom"
              checked={!isUserAudioDefault}
              onChange={() => setUserAudioDefault(false)}
              name="custom"
              label="Custom sound"
            />
          </Form.Group>

          <div className={`${styles.audioNotificationsWrapper}`}>
            <PlayAudioButton audioUrl={isUserAudioDefault ? defaultNotificationAudio : userAudio} />
            {!isUserAudioDefault
              && (
                <div className={styles.recorderWrapper}>
                  <AudioRecorder onRecord={onRecord} maxDuration={3} onError={onRecordingError} />
                </div>
              )}
          </div>

          {recordingErr && !isUserAudioDefault && (<div className={styles.recordingErr}>{recordingErr}</div>)}

          <h3 className={styles.subHeader}>What you hear when users write you:</h3>

          <Form.Group controlId="formIncomingSounds" className={styles.radioFormGroup}>
            <Form.Check
              type="radio"
              id="incomingOptAllo"
              checked={incomingSoundOptions === soundOptTypes.AllowCustom}
              onChange={() => setIncomingSoundOptions(soundOptTypes.AllowCustom)}
              name="allow"
              label="Allow custom"
            />

            <Form.Check
              type="radio"
              id="incomingOptDef"
              checked={incomingSoundOptions === soundOptTypes.UseDefault}
              onChange={() => setIncomingSoundOptions(soundOptTypes.UseDefault)}
              name="useCustom"
              label="Use default"
            />
            <Form.Check
              type="radio"
              id="incomingOptMute"
              checked={incomingSoundOptions === soundOptTypes.MuteAll}
              onChange={() => setIncomingSoundOptions(soundOptTypes.MuteAll)}
              name="mute"
              label="Mute All"
            />
          </Form.Group>
        </div>
      </div>

      <div className={`${styles.formFooter} w-100`}>
        <Button className={styles.primaryBtnCancel} variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button
          className={styles.primaryBtn}
          type="button"
          disabled={!!recordingErr}
          variant="success"
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </div>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.preferences,
  user: state.user.user,
  isUserLoading: state.user.isLoading
});

const mapDispatchToProps = {
  showModal: showModalRoutine,
  updateAudio: updateAudioRoutine,
  editProfile: editProfileRoutine
};

PreferencesForm.defaultProps = {
  user: null
};

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesForm);
