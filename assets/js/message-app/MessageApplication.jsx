
require('./message-app.sass');

import React from 'react';
import ReactDOM from 'react-dom';

import * as debug from './debug';

import Service from './service';
import { Conversation } from './Conversation';
import { ConversationTabs } from './ConversationTabs';

/**
 * Main app component.
 */
class MesssageApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      currentUser: null,
      activeConversationId: null
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentDidMount() {
    // query current user
    Service.getCurrentUser()
      .then(user => this.setState({currentUser: user}))
      .catch(err => console.error(err));

    // query user conversations
    Service.getConversations()
      .then(data => this.setState({conversations: data}))
      .catch(err => console.error(err));
  }

  handleTabChange(tabId) {
    this.setState({activeConversationId: tabId});
  }

  handleMessageSubmit(message) {
    const messageObject = {
      destination: this.state.activeConversationId,
      content: message
    };

    Service.postMessage(messageObject)
      .then(response => {
        Service.getMessage(response)
          .then(data => {
            this.setState((prevState, props) => {
              let convs = prevState.conversations;
              convs[data.destination].messages.push(data.id);
              return {conversations: convs};
            });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  render() {
    const activeConversation = this.state.conversations[this.state.activeConversationId];
    const messages = activeConversation ? activeConversation.messages : null;

    return (
      <div className="columns">
        <div className="column is-narrow">
          <ConversationTabs conversations={this.state.conversations} currentUser={this.state.currentUser} onTabChange={this.handleTabChange} currentTabId={this.state.activeConversationId} />
        </div>
        <div className="column">
          <Conversation messages={messages} onMessageSubmit={this.handleMessageSubmit} isDisabled={!this.state.activeConversationId}/>
        </div>
      </div>
    );
  }
}

$(document).ready(() => {
  ReactDOM.render(
    <MesssageApplication />,
    document.getElementById('message-app-root')
  );
});

