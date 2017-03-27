import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment_timezone from 'moment-timezone';

moment_timezone.tz.setDefault('Asia/Yerevan');
BigCalendar.momentLocalizer(moment_timezone);

const default_scroll_time = new Date(1970, 1, 1, 4);

const s = {
  minHeight:'500px'
};

export default class SDTechCalendar extends Component {

  event_selection_handler = e => {
    console.log('handled');
  }

  render () {
    return (
      <div style={s}>
        <BigCalendar
          selectable
          scrollToTime={default_scroll_time}
          popup
          onSelectEvent={this.event_selection_handler}
          timeslots={1}
          events={[]}
          />
      </div>
    );
  }
}
