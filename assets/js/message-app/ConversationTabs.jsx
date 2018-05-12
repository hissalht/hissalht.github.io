
import React from 'react';
import { ConversationTab } from './ConversationTab';

/**
 * List the available conversations.
 */
export class ConversationTabs extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(e) {
    console.log('switching to conv ' + e.target.value);
    this.props.onTabChange(e.target.value);
  }

  render() {
    return (
      <div className="msg-conversation-tabs">
        <h4>Conversations</h4>
        {Object.keys(this.props.conversations).map((id) => (
          <ConversationTab conversation={this.props.conversations[id]}
            currentUser={this.props.currentUser}
            key={id}
            value={id}
            handleClick={this.handleTabChange}
            isActive={id == this.props.currentTabId}
          />
        ))}
      </div>
    );
  }
}
