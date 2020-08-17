import React, { FunctionComponent } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { env } from 'env';
import styles from './styles.module.sass';
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  placeholder: string;
  height: number | string | 'auto';
  onSend: (text: string) => void;
  // onInputChange: IBindingAction;
}

const TextEditor: FunctionComponent<IProps> = ({ placeholder, height, onSend }) => {
  const onSendMessage = (editor: any) => {
    const content = editor.getContent();
    if (content) {
      onSend(editor.getContent());
      editor.setContent('');
    }
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
