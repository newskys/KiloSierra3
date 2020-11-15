import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'

const CalendarContainer: React.FC = () => {
  return (
    <>
      <FullCalendar
        // height={%'}
        headerToolbar={{
          start: '',
          center: 'title',
          end: '',
        }}
        footerToolbar={{
          start: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: '',
          end: 'today prev,next'
        }}
        stickyHeaderDates={true}
        titleFormat={{ year: 'numeric', month: 'short' }}
        plugins={[ dayGridPlugin, timeGridPlugin ]}
        initialView="timeGridWeek"
        expandRows={false}
        allDaySlot={false}
        slotMinTime={"09:00:00"}
        slotMaxTime={"22:00:00"}
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short'
        }}
        nowIndicator={true}
      />
    </>
  )
}

export default CalendarContainer
