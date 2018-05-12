
import React from 'react';
import { Messages } from './Messages';
import { MessageInput } from './MessageInput';

/**
 * Displays the selected conversation.
 */
export class Conversation extends React.Component {
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
