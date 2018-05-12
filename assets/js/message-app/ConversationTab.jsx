
import React from 'react';

import * as debug from './debug';

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
