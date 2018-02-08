/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import styles from './SidebarSearchResults.css';

type Props = {
  count: number
};

function SearchResultCount(props: Props) {
  return (
    <Text
      className={styles.header}
      html
      tagName="header"
      id="SidebarSearchResults.count"
      values={{ count: String(props.count) }}
    />
  );
}

SearchResultCount.getComponentHeight = () => 32;

export default SearchResultCount;
