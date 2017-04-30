import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment_timezone from 'moment-timezone';
import styled from 'styled-components';

import { ContentWrapper } from './with-style';
import colors from './colors';

moment_timezone.tz.setDefault('Asia/Yerevan');
BigCalendar.momentLocalizer(moment_timezone);

const default_scroll_time = new Date(1970, 1, 1, 4);

const CalendarWrapper = styled.div`
  background-color: ${colors.site_colors.bg};
  height: 600px;
  box-shadow: 3px 3px 0px 0px ${colors.site_colors.banner};
  font-weight: 300;
  padding: 20px;
`;

export default class SDTechCalendar extends Component {

  event_selection_handler = e => {
    console.log('handled');
  }

  render () {
    return (
      <ContentWrapper>
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
