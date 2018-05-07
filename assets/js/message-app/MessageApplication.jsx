import React from 'react';
import ReactDOM from 'react-dom';

require('./message-app.sass');

import * as debug from './debug';

console.log(debug.generateMessageId('mlsdkfjj'));


/**
 * Message component. Display the message author and its content.
 */
class Message extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="msg-message">
        <span className="msg-message-sender has-text-weight-semibold">
            {this.props.message.sender}
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
            />
          </div>
          <div className="control">
            <button className="button">Send</button>
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
        <MessageInput onSubmit={this.submitMessage}/>
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
  }

  render() {
    const buttonText = this.props.conversation.participants.filter(name => name != this.props.currentUser);
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
      conversations: debug.getMockData(),
      currentUser: debug.getCurrentUser(),
      activeConversationId: 1
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
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
    //TODO send the message to api
    // on success
    const messageFromApi = {
      id: Object.keys(this.state.conversations[messageObject.destination].messages).length * 6,
      destination: messageObject.destination,
      sender: messageObject.sender,
      content: messageObject.content
    };

    this.setState((prevState, props) => {
      let convs = prevState.conversations;
      convs[messageFromApi.destination].messages.push(messageFromApi);
      return {conversations: convs};
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
          <Conversation messages={messages} onMessageSubmit={this.handleMessageSubmit} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <MesssageApplication />,
  document.getElementById('message-app-root')
);
