
require('./message-app.sass');

import React from 'react';
import ReactDOM from 'react-dom';

import * as debug from './debug';

import { Conversation } from './Conversation';
import { ConversationTabs } from './ConversationTabs';

//TODO remove that shit
let userCache = [];
// transform into some kind of service ?
function fetchAndCacheUser(id, callback, force=false) {
  console.log('fetching ', id);
  if(id in userCache || force) {
    return callback(userCache[id]);
  }
  debug.getUser(id, (user) => {
    console.log('caching ', user);
    userCache[id] = user;
    return callback(user);
  });
}

function getUser(id, callback) {
  if(! id in userCache) {
    fetchAndCacheUser(id);
  }
  return callback(userCache[id]);
}


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
    debug.getCurrentUser((user) => {
      this.setState({currentUser: user});
    });

    // query user conversations
    debug.getConversationData((data) => {
      this.setState({conversations: data});
    });
  }

  handleTabChange(tabId) {
    this.setState({activeConversationId: tabId});
  }

  handleMessageSubmit(message) {
    const messageObject = {
      destination: this.state.activeConversationId,
      content: message
    };
    console.log('sending ...', messageObject);

    debug.postMessage(messageObject, (response) => {
      this.setState((prevState, props) => {
        let convs = prevState.conversations;
        convs[response.destination].messages.push(response);
        return {conversations: convs};
      });
    });
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

