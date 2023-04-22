import React, { useEffect } from 'react'
import styled from 'styled-components'

const MapBox = styled.div`
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  &.halfHeight {
    padding-bottom: 50%;
  }
  margin-top: ${(props) => props.marginTop || '0'};
`
const { kakao } = window

const MapContainer = ({
  mapid,
  lat = 33.450701,
  lng = 126.57066,
  address,
  isHalf,
  marginTop,
}) => {
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
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    })
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map)
    if (address) {
      const geocoder = new kakao.maps.services.Geocoder()
      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result)
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x)
          marker = new kakao.maps.Marker({
            map,
            position: coords,
          })
          const infowindow = new kakao.maps.Infowindow({
            content: `<div style="width:100px;text-align:center;padding:6px 0">${'또래오래 OO지점'}</div>`,
          })
          infowindow.open(map, marker)
        }
      })
    }
  }, [mapid, address])

  return (
    <MapBox
      id={`${mapid}`}
      className={isHalf ? 'halfHeight' : null}
      marginTop={marginTop}
      style={{
        width: '100%',
      }}
    ></MapBox>
  )
}

export default MapContainer
