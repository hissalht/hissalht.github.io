import React from 'react';
import moment from 'moment';

import * as debug from './debug';
import Service from './service';

/**
 * Message component. Display the message author and its content.
 */
export class Message extends React.Component {
  constructor (props) {
    super(props);
    this.state = {message: null};
  }

  componentDidMount() {
    Service.getMessage(this.props.messageId)
      .then(message => this.setState({message: message}))
      .catch(err => console.error(err));
  }

  render() {
    if(this.state.message == null)
      return null;
    return (
      <div className="msg-message">
        <span className="msg-message-timestamp has-text-weight-light">
            {moment(this.state.message.postDate).format('H:mm:ss')}
        </span>
        <span className="msg-message-sender has-text-weight-semibold">
            {this.state.message.author}
        </span>
        <span className="msg-message-content">
          {this.state.message.content}
        </span>
      </div>
    );
  }
}
