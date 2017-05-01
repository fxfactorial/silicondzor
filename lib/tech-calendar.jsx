import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment_timezone from 'moment-timezone';
import styled from 'styled-components';

import { ContentWrapper, SubmitBanner, CalendarWrapper } from './with-style';
import colors from './colors';

moment_timezone.tz.setDefault('Asia/Yerevan');
BigCalendar.momentLocalizer(moment_timezone);

const default_scroll_time = new Date(1970, 1, 1, 4);

export default class SDTechCalendar extends Component {

  event_selection_handler = e => {
    console.log('handled');
  }

  render () {
    return (
      <ContentWrapper>
        <SubmitBanner>Tech events in Armenia</SubmitBanner>
        <CalendarWrapper>
          <BigCalendar
            selectable
            scrollToTime={default_scroll_time}
            popup
            onSelectEvent={this.event_selection_handler}
            timeslots={1}
            events={[]}
            />
        </CalendarWrapper>
      </ContentWrapper>
    );
  }
}
