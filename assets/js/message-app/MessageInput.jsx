import React from 'react';
/**
 * Input component.
 */
export class MessageInput extends React.Component {
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
                   disabled={this.props.isDisabled}
            />
          </div>
          <div className="control">
            <button className="button" disabled={this.props.isDisabled}>Send</button>
          </div>
        </div>
      </form>
    );
  }
}
