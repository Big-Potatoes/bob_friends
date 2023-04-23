import React, { useState } from 'react'
import Datepicker from 'react-datepicker'
import dayjs from 'dayjs'
import 'react-datepicker/dist/react-datepicker.css'
import './../styles/s-components/Timepicker.css'
import add from 'date-fns/add'
import { ko } from 'date-fns/esm/locale'
import styled from 'styled-components'
dayjs.locale(ko)

const Wrapper = styled.div`
  width: 150px;
  position: relative;
`

const Timepicker = ({ handleInput }) => {
  const now = dayjs()
  const currentTime = now.toDate()
  const [selectedTime, setSelectedTime] = useState(currentTime)
  const currentHour = now.get('hour')

  const getMaxTime = () => {
    // 5시간을 더한 시간이 00시 이하 -> 그대로
    // 5시간을 더해서 00시 이상으로 넘어가면 23:30
    let maxTime = 0

    if (currentHour + 5 > 24) {
      // 당일 23시 59분의 날짜 객체
      maxTime = now.toDate().setHours(23, 59)
    } else {
      maxTime = add(currentTime, { hours: 5 })
    }
    return maxTime
  }
  const handleCurrent = (date) => {
    const selecedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss')

    setSelectedTime(date)
    handleInput(selecedDate)
  }
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
        maxTime={getMaxTime()}
        timeIntervals={30}
        timeCaption="Time"
        disabled={currentHour < 8}
        dateFormat={'aa h:mm'}
      />
    </Wrapper>
  )
}

export default Timepicker
