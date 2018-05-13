
import React from 'react';

import * as debug from './debug';

import Service from './service';


/**
 * Displays a tab for each conversation available.
 */
export class ConversationTab extends React.Component {
  constructor(props){
    super(props);

    // not display the current user
    const participants = props.conversation.participants.filter(value => value != props.currentUser.id);
    this.state = {participants: participants}
  }

  componentDidMount() {
    this.state.participants.forEach((userId, index) => {
      Service.getUser(userId)
        .then(user => {
          this.setState((prev, props) => {
            let newParticipants = prev.participants;
            newParticipants[index] = user.username;
            return {participants: newParticipants};
          });
        })
        .catch(err => console.error(err));
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
