import React from 'react';
import moment from 'moment';

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
 * Message component. Display the message author and its content.
 */
export class Message extends React.Component {
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
