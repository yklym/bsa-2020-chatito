import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { env } from '../../env';

interface IProps {
  placeholder: string;
  height: number | 'auto';
  onSend: (message: string) => void;
}

const TextEditor: FunctionComponent<IProps> = ({ placeholder, height, onSend }) => {
  const onSendMessage = (editor: any) => {
    onSend(editor.getContent());
  };

  return (
    <div className={styles.wrapper} style={{ height }}>
      <Editor
        apiKey={env.apiKeys.textEditor}
        init={{
          placeholder,
          menubar: false,
          width: '100%',
          height: '100%',
          statusbar: false,
          contextmenu: false,
          plugins: [
            'paste wordcount emoticons'
          ],
          toolbar:
            'undo redo | bold italic | bullist numlist | emoticons | myCustomToolbarButton',
          skin: 'naked',
          toolbar_location: 'bottom', // eslint-disable-line @typescript-eslint/camelcase

          setup: (editor: any) => {
            editor.ui.registry.addButton('myCustomToolbarButton', {
              icon: 'arrow-right',
              text: 'Send message',
              onAction: () => onSendMessage(editor)
            });

            editor.on('keydown', (event: KeyboardEvent) => {
              if (event.keyCode === 13) {
                event.preventDefault();
                onSendMessage(editor);
              }
            });
          }
        }}
      />
    </div>

  );
};

export default TextEditor;
