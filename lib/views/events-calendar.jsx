import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Modal from 'react-modal';
import moment_timezone from 'moment-timezone';
import TechEvent from './event';
import Routes from '../http-routes';

moment_timezone.tz.setDefault('Asia/Yerevan');

BigCalendar.momentLocalizer(moment_timezone);

const default_scroll_time = new Date(1970, 1, 1, 4);

const request_opts = body => {
  return {
    method:'post',
    headers: new Headers({
      'content-type':'application/json'
    }),
    body
  };
};

const modal_s = {
  overlay: {
    position:'fixed',
    top:'15vh',
    left:'20vw',
    right:'20vw',
    bottom:'35vh'
  },
  content:{ }
};

export default class TechCalendar extends Component {

  state = {
    events: [],
    modal_show: false,
    allDay:false,
    start_date: new Date,
    end_date: new Date,
    prompt_message: (start, end) => {
      const centered = { textAlign:'center'};
      return (
	<div>
	  <p style={centered}> Tech event from: </p>
	  <p style={centered}> {start.toLocaleString()} </p>
	  <p style={centered}> to </p>
	  <p style={centered}> {end.toLocaleString()} </p>
	  <br/>
	</div>
      );
    }
  }

  static defaultProps = {
    tech_calendar_s: {
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  componentDidMount() {
    window.__ALL_TECH_EVENTS__ =
      window.__ALL_TECH_EVENTS__.map(event => {
        const start = new Date(event.start);
        const end = new Date(event.end);
	      return {...event, start, end };
      });
    this.setState({...this.state, events: window.__ALL_TECH_EVENTS__});
  }

  selectedDate = e => {
    const s = this.state;
    if (e.start === e.end) s.allDay = true;
    s.start_date = new Date(e.start);
    s.end_date = new Date(e.end);
    s.modal_show = true;
    this.setState(s);
  }

  submit_event = event_details => {
    fetch(Routes.add_tech_event,
	  request_opts(JSON.stringify(event_details)))
      .then(resp => resp.json())
      .then(resp => {
	if (resp.result === 'failure') {
	  const s = this.state;
	  s.prompt_message = (_, __) => {
	    const style_em = {
	      textAlign:'center',
	      fontStyle:'italic'
	    };
	    return (
	      <div>
		<p style={style_em}>Could not create an event</p>
		<p style={style_em}>{resp.reason}</p>
		<br/>
	      </div>
	    );
	  };
	  console.error(`Could not submit event: ${resp.reason}`);
	  this.setState(s);
	} else {
	  const s = this.state;
    const start = new Date(event_details.start);
    const end = new Date(event_details.end);
	  window.__ALL_TECH_EVENTS__.push({
	    allDay:event_details.start === event_details.end,
	    title:event_details.event_title,
	    start,
	    desc:event_details.event_description,
	    end
	  });
	  s.events = window.__ALL_TECH_EVENTS__;
	  s.modal_show = false;
	  this.setState(s);
	}
      });
  }

  render () {
    const s = {
      backgroundColor:'white',
      minHeight:'80vh',
      minWidth:'100%',
      zIndex:this.props.z_value
    };
    // title_language is a prop
    return (
      <div style={this.props.tech_calendar_s}>
        <BigCalendar
          selectable
          style={s}
          scrollToTime={default_scroll_time}
          popup={true}
	  onSelectEvent={event => alert(`
Hosted by ${event.sourced_from}
${event.url}

${event.desc}
`)}
          timeslots={1}
          components={{
            event:event => Eventbyline({event, lang:this.props.title_language}),
            agenda:{event:EventAgenda}
          }}
          onSelectSlot={this.selectedDate}
          events={this.state.events}
          />
	<Modal
	  style={modal_s}
	  contentLabel={'Select dates'}
	  isOpen={this.state.modal_show}>
	  <TechEvent
	    submit_event={this.submit_event}
	    close_modal={() => {
	      const s = this.state;
	      s.modal_show = false;
	      this.setState(s);
	    }}
	    prompt_msg={(start, end) => this.state.prompt_message(start, end)}
	    start={this.state.start_date}
	    end={this.state.end_date}/>
	</Modal>
      </div>
    );
  }
};

function Eventbyline({event, lang}) {

  const titles = event.title.split('/');
  let title = null;

  switch (lang) {
  case 'Հայ': title = titles[2]; break;
  case 'Eng': title = titles[0]; break;
  case 'РУС': title = titles[1]; break;
  default: throw new Error('Unknown language');
  }

  return (
    <span>
      <p>{title}</p>
    </span>
  );
};

function EventAgenda({event}) {
  const langs = ['Eng', 'РУС', 'Հայ'];
  const text_style = {
    marginTop:'1rem',
    textIndent:'2rem',
    boxShadow: 'inset 0 0 10px #000000',
    padding:'1.5em 1.5em 1.5em 1.5em',
    marginBottom:'1rem'
  };
  const top = event.title.split('/').map((i, idx) => {
    return (
      <p key={idx} style={{paddingLeft:'0.25rem'}}>
        {langs[idx]} = {i}
      </p>
    );
  });
  return (
    <div>
      {top}
      <details style={{fontStyle:'italic', marginTop:'0.5rem'}}>
	<summary>
	  Hosted by {event.sourced_from}{' '}
	  <a href={event.url}>details</a>
	</summary>
	<p style={text_style}>{event.desc}</p>
      </details>
      <hr/>
    </div>
  );
};
