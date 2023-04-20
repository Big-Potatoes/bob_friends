import React, { useState } from 'react'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './../styles/s-components/Timepicker.css'
import add from 'date-fns/add'
import { ko } from 'date-fns/esm/locale'
import styled from 'styled-components'
const Timepicker = () => {
  const currentTime = new Date()
  const [selectedTime, setSelectedTime] = useState(currentTime)
  const maxTime = add(currentTime, { hours: 5 })
  const handleCurrent = (date) => {
    setSelectedTime(date)
  }
  const Wrapper = styled.div`
    width: 150px;
    position: relative;
  `
  return (
    <Wrapper className="timepicker__wrapper">
      <Datepicker
        selected={selectedTime}
        onChange={handleCurrent}
        showIcon
        showTimeSelect
        showTimeSelectOnly
        locale={ko}
        minTime={currentTime}
        maxTime={maxTime}
        timeIntervals={30}
        timeCaption="Time"
        dateFormat={'aa h:mm'}
      />
    </Wrapper>
  )
}

export default Timepicker
