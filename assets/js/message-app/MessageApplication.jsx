import React from 'react';
import ReactDOM from 'react-dom';

require('./message-app.sass');

const m1 = {id: 1, sender: 'Adrien', destination: 1, content: 'hé coucou'};
const m2 = {id: 2, sender: 'Adrien', destination: 1, content: '?? allo ?'};
const m3 = {id: 3, sender: 'Bob', destination: 1, content: 'yo ;)'};
const m4 = {id: 4, sender: 'John', destination: 2, content: 'SDKLfjsldkjf '};
const m5 = {id: 5, sender: 'Adrien', destination: 2, content: 'SDFKJ DSFJ SDF'};
const m6 = {id: 6, sender: 'John', destination: 2, content: 'sdf sdfbbvcb c'};
const mockConversationData = [{
  id: 1,
  participants: ['Adrien', 'Bob'],
  messages: [m1, m2, m3]
}, {
  id: 2,
  participants: ['Adrien', 'John'],
  messagse: [m4, m5, m6]
}]
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
    return (
      <div className="msg-messages">
        {this.props.messages.map((msg) => (
          <Message message={msg} key={msg.id.toString()}/>
        ))}
      </div>
    );
  }
}

class MessageInput extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="field has-addons msg-message-input">
        <div className="control">
          <input className="input" type="text" placeholder="Send a message"/>
        </div>
        <div className="control">
          <button className="button">Send</button>
        </div>
      </div>
    );
  }
}

class Conversation extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="msg-conversation">
        <Messages messages={this.props.messages} />
        <MessageInput />
      </div>
    );
  }
}

class ConversationTabs extends React.Component {
  render() {
    return (
      <div className="msg-conversation-tabs">
        {this.props.conversations.map(conversation => (
          <ConversationTab conversation={conversation} currentUser={this.props.currentUser} key={conversation.id} />
        ))}
      </div>
    );
  }
}

class ConversationTab extends React.Component {
  render() {
    const buttonText = this.props.conversation.participants.filter(name => name != this.props.currentUser)
    return (
      <div>
        <button className="button msg-conversation-tab">
          {buttonText}
        </button>
      </div>
    );
  }
}

class MesssageApplication extends React.Component {
  render() {
    return (
      <div className="columns">
        <div className="column is-narrow">
          <ConversationTabs conversations={mockConversationData} currentUser={currentUser}/>
        </div>
        <div className="column">
          <Conversation messages={mockConversationData[0].messages} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <MesssageApplication />,
  document.getElementById('message-app-root')
);
