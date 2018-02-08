/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import Spinner from '../Spinner/Spinner';
import styles from './SidebarSearchResults.css';

function SearchSpinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <Spinner className={styles.spinner} size="large" />
    </div>
  );
}

SearchSpinner.getComponentHeight = () => 20;

export default SearchSpinner;
