import React, { useEffect } from 'react'
import styled from 'styled-components'

const MapBox = styled.div`
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  &.halfHeight {
    padding-bottom: 50%;
  }
`
const { kakao } = window

const MapContainer = ({ mapid, lat, lng }) => {
  useEffect(() => {
    const container = document.getElementById(`${mapid}`)
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)
    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(lat, lng)
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    })
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map)
  }, [mapid])

  return (
    <MapBox
      id={`${mapid}`}
      style={{
        width: '100%',
      }}
    ></MapBox>
  )
}

export default MapContainer
