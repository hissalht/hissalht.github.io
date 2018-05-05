import React from 'react';
import ReactDOM from 'react-dom';

require('./message-app.sass');

const m1 = {id: 1, sender: 'Adrien', receiver: 'Bob', content: 'hé coucou'};
const m2 = {id: 2, sender: 'Adrien', receiver: 'Bob', content: '?? allo ?'};
const m3 = {id: 3, sender: 'Bob', receiver: 'Adrien', content: 'yo ;)'};
const mockData = [m1, m2, m3];

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
      <ul>
        {this.props.messages.map((msg) => (
          <Message message={msg} key={msg.id.toString()}/>
        ))}
      </ul>
    );
  }
}

class MessageInput extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="field has-addons">
        <div className="control">
          <input className="input" type="text" placeholder="Send a message"/>
        </div>
        <div className="control">
          <button className="button">Send</button>
        </div>
      </div>
    )
  }
}

class MesssageApplication extends React.Component {
  render() {
    return (
      <div>
        <Messages messages={mockData} />
        <MessageInput />
      </div>
    );
  }
}

ReactDOM.render(
  <MesssageApplication />,
  document.getElementById('message-app-root')
);
