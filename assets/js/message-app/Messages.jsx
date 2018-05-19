import React from 'react';
import { Message } from './Message';

/**
 * Component listing messages.
 */
export class Messages extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    const element = this.props.messages ?
      this.props.messages.map((msg) => (
        <Message messageId={msg} key={msg}/>
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
