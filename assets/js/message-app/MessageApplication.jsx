import React from 'react';
import ReactDOM from 'react-dom';

require('./message-app.sass');

const m1 = {id: 1, sender: 'Adrien', destination: 1, content: 'hé coucou'};
const m2 = {id: 2, sender: 'Adrien', destination: 1, content: '?? allo ?'};
const m3 = {id: 3, sender: 'Bob', destination: 1, content: 'yo ;)'};
const m4 = {id: 4, sender: 'John', destination: 2, content: 'SDKLfjsldkjf '};
const m5 = {id: 5, sender: 'Adrien', destination: 2, content: 'SDFKJ DSFJ SDF'};
const m6 = {id: 6, sender: 'John', destination: 2, content: 'sdf sdfbbvcb c'};
let mockConversationData = [{
  id: 1,
  participants: ['Adrien', 'Bob'],
  messages: [m1, m2, m3]
}, {
  id: 2,
  participants: ['Adrien', 'John'],
  messages: [m4, m5, m6]
}].reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});
const currentUser = 'Adrien';


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
      conversations: mockConversationData,
      currentUser: currentUser,
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
      sender: this.state.currentUser,
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
          <ConversationTabs conversations={this.state.conversations} currentUser={currentUser} onTabChange={this.handleTabChange} currentTabId={this.state.activeConversationId} />
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
