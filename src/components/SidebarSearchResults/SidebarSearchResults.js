/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SidebarSearchResultsProps as Props } from './types';
import React, { PureComponent } from 'react';
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import classNames from 'classnames';
import SearchSpinner from './SearchSpinner';
import SearchResultCount from './SearchResultCount';
import SearchMessagesError from './SearchMessagesError';
import SidebarPeerItem from '../SidebarPeerItem/SidebarPeerItem';
import SidebarSearchItem from './SidebarSearchItem/SidebarSearchItem';
import styles from './SidebarSearchResults.css';

class SidebarSearchResults extends PureComponent<Props> {
  cache: CellMeasurerCache;

  constructor(props: Props) {
    super(props);

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: SidebarSearchItem.getComponentHeight(true, true)
    });

    this.updateCache(props);
  }

  getRowCount(): number {
    const { peers, messages } = this.props;

    return peers.length + ((messages.pending || messages.error) ? 1 : 1 + messages.value.length);
  }

  updateCache(props: Props) {
    const peerHeight = SidebarPeerItem.getComponentHeight();
    for (let i = 0; i < props.peers.length; i++) {
      this.cache.set(i, 0, props.width, peerHeight);
    }

    if (props.messages.pending) {
      this.cache.set(props.peers.length, 0, props.width, SearchSpinner.getComponentHeight());
    } else if (props.messages.error) {
      this.cache.set(props.peers.length, 0, props.width, SearchMessagesError.getComponentHeight());
    } else {
      this.cache.set(props.peers.length, 0, props.width, SearchResultCount.getComponentHeight());
    }
  }

  renderRow = ({ index, key, style, parent }: *) => {
    const { peers, messages } = this.props;
    if (index < peers.length) {
      const peerInfo = peers[index];

      return (
        <div key={key} style={style}>
          <SidebarPeerItem
            info={peerInfo}
            active={false}
            counter={0}
            onSelect={this.props.onGoToPeer}
          />
        </div>
      );
    }

    if (index === peers.length) {
      return (
        <div key={key} style={style}>
          {this.renderMessagesState()}
        </div>
      );
    }

    if (index < peers.length + messages.value.length) {
      const messageIndex = index - peers.length;
      const message = messages.value[messageIndex];

      return (
        <CellMeasurer
          key={key}
          parent={parent}
          cache={this.cache}
          rowIndex={index}
          columnIndex={0}
        >
          {({ measure }) => (
            <div style={style}>
              <SidebarSearchItem
                info={message.info}
                before={message.before}
                after={message.after}
                focus={message.focus}
                onMeasure={measure}
                onGoToPeer={this.props.onGoToPeer}
                onGoToMessage={this.props.onGoToMessage}
              />
            </div>
          )}
        </CellMeasurer>
      );
    }

    return null;
  };

  renderEmpty = () => {
    return null;
  };

  renderMessagesState() {
    const { messages } = this.props;

    if (messages.pending) {
      return <SearchSpinner />;
    }

    if (messages.error) {
      return <SearchMessagesError error={messages.error} />;
    }

    return <SearchResultCount count={messages.value.length} />;
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <List
          width={this.props.width}
          height={this.props.height}
          rowCount={this.getRowCount()}
          rowHeight={this.cache.rowHeight}
          rowRenderer={this.renderRow}
          noRowsRenderer={this.renderEmpty}
          deferredMeasurementCache={this.cache}
        />
      </div>
    );
  }
}

export default SidebarSearchResults;
