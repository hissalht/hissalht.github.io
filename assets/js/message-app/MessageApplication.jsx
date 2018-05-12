
require('./message-app.sass');

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import * as debug from './debug';


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
 * Message component. Display the message author and its content.
 */
class Message extends React.Component {
  constructor (props) {
    super(props);
    this.state = {author: '#' + props.message.sender};
  }

  componentDidMount() {
    fetchAndCacheUser(this.props.message.sender, (user) => {
      this.setState({author: user.username});
    });
  }

  render() {
    return (
      <div className="msg-message">
        <span className="msg-message-timestamp has-text-weight-light">
            {moment(this.props.message.postDate).format('H:mm:ss')}
        </span>
        <span className="msg-message-sender has-text-weight-semibold">
            {this.state.author}
        </span>
        <span className="msg-message-content">
          {this.props.message.content}
        </span>
      </div>
    );
  }
}

/**
 * Component listing messages.
 */
class Messages extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    const element = this.props.messages ?
      this.props.messages.map((msg) => (
        <Message message={msg} key={msg.id.toString()}/>
      ))
    :
      "Select a conversation or start a new one."
    ;

    return (
      <div className="msg-messages">
        {element}
      </div>
    );
  }
}

/**
 * Input component.
 */
class MessageInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.onSubmit(this.state.value);
    this.setState({value: ''});
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field has-addons msg-message-input">
          <div className="control">
            <input className="input"
                   onChange={this.handleChange}
                   type="text"
                   placeholder="Send a message"
                   value={this.state.value}
                   disabled={this.props.isDisabled}
            />
          </div>
          <div className="control">
            <button className="button" disabled={this.props.isDisabled}>Send</button>
          </div>
        </div>
      </form>
    );
  }
}

/**
 * Displays the selected conversation.
 */
class Conversation extends React.Component {
  constructor (props) {
    super(props);
    this.submitMessage = this.submitMessage.bind(this);
  }

  submitMessage(message) {
    console.log('submiting message: ' + message);
    this.props.onMessageSubmit(message);
  }

  render() {
    return (
      <div className="msg-conversation">
        <Messages messages={this.props.messages} />
        <MessageInput onSubmit={this.submitMessage} isDisabled={this.props.isDisabled} />
      </div>
    );
  }
}

/**
 * List the available conversations.
 */
class ConversationTabs extends React.Component {
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


/**
 * Displays a tab for each conversation available.
 */
class ConversationTab extends React.Component {
  constructor(props){
    super(props);

    // not display the current user
    const participants = props.conversation.participants.filter(value => value != props.currentUser.id);
    this.state = {participants: participants}
  }

  componentDidMount() {
    this.state.participants.forEach((userId, index) => {
      fetchAndCacheUser(userId, (user) => {
        this.setState((prev, props) => {
          let newParticipants = prev.participants;
          newParticipants[index] = user.username;
          return {participants: newParticipants};
        });
      });
    });
  }

  render() {
    const buttonText = this.state.participants.join(', ');

    let classes = 'button msg-conversation-tab';
    if(this.props.isActive) classes += ' is-primary';

    return (
      <div>
        <button className={classes} onClick={this.props.handleClick} value={this.props.conversation.id}>
          {buttonText}
        </button>
      </div>
    );
  }
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

