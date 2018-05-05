// message.jsx
// Messaging application

import React from 'react';
import ReactDOM from 'react-dom';


class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    console.log('message sent: ' + this.state.value);
    this.setState({value: ''});
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field has-addons">
          <div className="control">
            <input className="input" type="text" placeholder="Type your message here" onChange={this.handleChange} value={this.state.value}/>
          </div>
          <div className="control">
            <button className="button" type="submit">Send</button>
          </div>
        </div>
      </form>
    );
  }
}

ReactDOM.render(
  <MessageForm />,
  document.getElementById('message-app-root')
);
