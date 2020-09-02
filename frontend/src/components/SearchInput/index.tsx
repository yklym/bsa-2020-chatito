import React, { FunctionComponent, useRef, useState, SyntheticEvent } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.sass';
import { useKey } from 'common/hooks/onInputSubmit';

interface IProps {
  onSearch: (query: string) => void;
  stylesClassName?: string;
}

const SearchInput: FunctionComponent<IProps> = ({ onSearch, stylesClassName = '' }) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useKey({ key: 'enter', callback: () => onSearch(text), ref: inputRef });

  const onSubmit = () => {
    onSearch(text);
  };

  const onChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setText(target.value);
  };

  return (
    <div className={`${stylesClassName} ${styles.wrapper}`}>
      <FormControl
        ref={inputRef}
        aria-label="header search"
        onChange={onChange}
      />
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} onClick={onSubmit} />
    </div>
  );
};

export default SearchInput;
