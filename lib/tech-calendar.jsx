import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';

const default_scroll_time = new Date(1970, 1, 1, 4);

const s = {
  minHeight:'100px'
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
