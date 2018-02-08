/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import Emoji from '../Emoji/Emoji';
import ErrorView from '../Error/Error';
import styles from './SidebarSearchResults.css';

type Props = {
  error: Error
};

function SearchMessagesError(props: Props) {
  return (
    <div className={styles.text}>
      <Emoji char="❗" size={50} className={styles.textEmoji} />
      <ErrorView className={styles.error}>
        <Text
          html
          tagName="div"
          id="SidebarSearchResults.error"
          values={{ error: props.error.message }}
        />
      </ErrorView>
    </div>
  );
}

SearchMessagesError.getComponentHeight = () => 20;

export default SearchMessagesError;
