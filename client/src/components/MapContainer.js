/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './../styles/s-components/MapContainer.css'

const MapBox = styled.div`
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  margin-top: ${(props) => props.marginTop || '0'};
  &.halfHeight,
  &.result {
    padding-bottom: 50%;
  }
`
const MenuWrapper = styled.div`
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const ResultTitle = styled.h4`
  font-weight: var(--fw-bold);
  padding: 5px 0;
  text-align: center;
`
const AlertText = styled.p`
  margin-top: 10px;
  min-height: 15px;
  text-align: center;
  color: var(--black-200);
`
const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 180px;
  overflow-y: auto;
  /* border: 1px solid red; */
  font-size: var(--fz-sm);
  padding: 10px;
`
const Pagination = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`
const { kakao } = window

const MapContainer = ({
  mapid,
  lat = 33.450701,
  lng = 126.57066,
  address,
  keyword,
  handleAddressInput,
  isModal = false,
  isHalf,
  marginTop,
  handleAddressModal,
}) => {
  const [isValid, setIsValid] = useState(true)
  const [latitude, setLatitude] = useState(lat)
  const [longitude, setLongitude] = useState(lng)
  useEffect(() => {
    const container = document.getElementById(`${mapid}`)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      })
    }
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)
    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(latitude, longitude)
    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    })
    const searchOptions = {
      location: markerPosition,
      radius: 5000,
    }
    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map)
    if (address) {
      setIsValid(true)
      const geocoder = new kakao.maps.services.Geocoder()
      geocoder.addressSearch(address, function (result, status) {
        console.log(result)
        if (status === kakao.maps.services.Status.OK) {
          const { address_name, building_name, x, y } = result[0]
          const coords = new kakao.maps.LatLng(y, x)
          marker = new kakao.maps.Marker({
            map,
            position: coords,
          })

          //* 빌딩 이름이 있으면 라벨 노출 -> 이름 노출 라벨 스타일 수정하기
          if (building_name) {
            const address = building_name || address_name
            infowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:auto;">${address}</div>`,
            })
            infowindow.open(map, marker)
          }

          map.setCenter(coords)
        } else {
          setIsValid(false)
        }
      })
    } else if (keyword && isModal) {
      // 키워드로 장소를 검색합니다
      search(keyword, map, infowindow, searchOptions)
      map.setLevel(2)
    }
  }, [mapid, address, keyword, latitude, longitude])

  const search = (keyword, map, infowindow, option) => {
    searchPlaces(keyword, option)
    let markers = []

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces(keyword) {
      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places()

      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!')
        return false
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB, option)
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        setIsValid(true)
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        console.log(data)
        displayPlaces(data)

        // 페이지 번호를 표출합니다
        displayPagination(pagination)
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setIsValid(false)
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.')
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      const listEl = document.getElementById('placesList')
      const menuEl = document.getElementById('menu_wrap')
      const fragment = document.createDocumentFragment()
      const bounds = new kakao.maps.LatLngBounds()
      // const listStr = ''

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl)

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker()

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x)
        const marker = addMarker(placePosition, i)
        const itemEl = getListItem(i, places[i]) // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition)

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        ;(function (marker, title) {
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            displayInfowindow(marker, title)
          })

          kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close()
          })

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title)
          }

          itemEl.onmouseout = function () {
            infowindow.close()
          }
        })(marker, places[i].place_name)

        fragment.appendChild(itemEl)
      }

      // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
      listEl.appendChild(fragment)
      menuEl.scrollTop = 0

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds)
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      const getPlaceData = (e, data) => {
        const { place_name, road_address_name, x, y } = data
        if (keyword) {
          handleAddressInput('store', {
            locationDescription: place_name,
            address: road_address_name,
            latitude: y,
            longitude: x,
          })
          handleAddressModal('')(e)
        } else if (address) {
          handleAddressInput('pickup', {
            locationDescription: place_name,
            address: road_address_name,
            latitude: y,
            longitude: x,
          })
        }
      }
      const el = document.createElement('li')
      let itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        '   <h5>' +
        places.place_name +
        '</h5>'

      if (places.road_address_name) {
        itemStr +=
          '    <span>' +
          places.road_address_name +
          '</span>' +
          '   <span class="jibun gray">' +
          places.address_name +
          '</span>'
      } else {
        itemStr += '    <span>' + places.address_name + '</span>'
      }

      itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>'

      el.innerHTML = itemStr
      el.className = 'item'
      el.addEventListener('click', (e) => getPlaceData(e, places))
      return el
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png' // 마커 이미지 url, 스프라이트 이미지를 씁니다
      const imageSize = new kakao.maps.Size(36, 37) // 마커 이미지의 크기
      const imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      }
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions
      )
      const marker = new kakao.maps.Marker({
        position, // 마커의 위치
        image: markerImage,
      })

      marker.setMap(map) // 지도 위에 마커를 표출합니다
      markers.push(marker) // 배열에 생성된 마커를 추가합니다

      return marker
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
      }
      markers = []
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
      const paginationEl = document.getElementById('pagination')
      const fragment = document.createDocumentFragment()
      let i

      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i

        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }

        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
      const content = '<div style="padding:5px;z-index:1;">' + title + '</div>'

      infowindow.setContent(content)
      infowindow.open(map, marker)
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild)
      }
    }
  }

  return (
    <div className="wrapper">
      {!isValid ? <AlertText>검색 결과가 없습니다.</AlertText> : null}
      <div id="menu_wrap" className="bg_white">
        <MapBox
          id={`${mapid}`}
          className={`${
            isValid && (isHalf || keyword || address) ? 'halfHeight' : null
          }`}
          marginTop={marginTop}
          style={{
            width: '100%',
          }}
        ></MapBox>
        {isModal && isValid && (keyword || address) ? (
          <MenuWrapper className="list">
            <ResultTitle> - 검색 결과 - </ResultTitle>
            <MenuList id="placesList"></MenuList>
            <Pagination id="pagination"></Pagination>
          </MenuWrapper>
        ) : null}
      </div>
    </div>
  )
}

export default MapContainer
