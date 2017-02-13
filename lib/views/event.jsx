import React, {Component} from 'react';

const close_btn_s = {
  position:'absolute',
  top:'0.25em',
  right:'0.25em',
  fontSize:'large',
  width:'10px',
  cursor:'pointer'
};

export default class TechEvent extends Component {

  state = {
    event_title:'',
    event_description:''
  }

  submit_event = e => {
    e.preventDefault();
    this.props.submit_event({
      ...this.state,
      start:this.props.start,
      end:this.props.end
    });
  }

  render() {
    const tech_s = {
      display:'flex',
      flexDirection:'column'
    };
    const centered = { textAlign:'center'};
    return (
      <div>
	<form>
	  <p style={close_btn_s} onClick={_ => this.props.close_modal()}> x </p>
	  {this.props.prompt_msg(this.props.start, this.props.end)}
	  <hr/>
	  <div style={tech_s} className={'modal-inputs'}>
	    <label> Event title </label>
	    <input type={'text'}
		   value={this.state.event_title}
		   onChange={e =>
	      this.setState({...this.state, event_title:e.target.value})}/>
	      <label> Event Description </label>
	      <textarea type={'text'}
			rows={8}
			value={this.state.event_description}
			onChange={e =>
		this.setState({...this.state, event_description:e.target.value})}/>
		<input type={'submit'}
		       value={'Create Event'}
		       onClick={this.submit_event}/>
	  </div>
	</form>
      </div>
    );
  }
};
