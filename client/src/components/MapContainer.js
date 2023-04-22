/* eslint-disable */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './../styles/s-components/MapContainer.css'

const MapBox = styled.div`
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  &.halfHeight {
    padding-bottom: 50%;
  }
  &.result {
    padding-bottom: 30%;
  }
  margin-top: ${(props) => props.marginTop || '0'};
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
const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 250px;
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
  lat,
  lng,
  address,
  keyword,
  isModal = false,
  isHalf,
  marginTop,
}) => {
  const [isValid, setIsValid] = useState(true)
  const [location, setLocation] = useState({
    lat: 33.450701,
    lng: 126.57066,
  })
  const onGeoOk = (position) => {
    lat = position.coords.latitude
    lng = position.coords.longitude
    setLocation({
      lat,
      lng,
    })
    console.log(lat, lng)
  }
  const onGeoError = () => {
    //이거 에러 핸들링 어떻게 하지?
    console.log('위치 정보를 확인할 수 없습니다.')
  }
  useEffect(() => {
    console.log('여기 타니?')
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)
  }, [])
  useEffect(() => {
    const container = document.getElementById(`${mapid}`)
    const options = {
      center: new kakao.maps.LatLng(location.lat, location.lng),
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)
    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(lat, lng)
    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    })
    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map)
    if (address) {
      const geocoder = new kakao.maps.services.Geocoder()
      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const { address_name, building_name, x, y } = result[0]
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x)
          marker = new kakao.maps.Marker({
            map,
            position: coords,
          })

          //* 빌딩 이름이 있으면 라벨 노출 -> 이름 노출 라벨 스타일 수정하기
          if (building_name) {
            infowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:auto;">${building_name}</div>`,
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
      search(keyword, map, infowindow)
    }
  }, [mapid, address, keyword])

  const search = (keyword, map, infowindow) => {
    searchPlaces(keyword)
    let markers = []

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces(keyword) {
      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places()

      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!')
        return false
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB)
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data)

        // 페이지 번호를 표출합니다
        displayPagination(pagination)
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.')
        return
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.')
        return
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = ''

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl)

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker()

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]) // 검색 결과 항목 Element를 생성합니다

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
      var el = document.createElement('li'),
        itemStr =
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

      return el
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      var imageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        })

      marker.setMap(map) // 지도 위에 마커를 표출합니다
      markers.push(marker) // 배열에 생성된 마커를 추가합니다

      return marker
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
      }
      markers = []
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i

      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
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
      var content = '<div style="padding:5px;z-index:1;">' + title + '</div>'

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
      {!isValid ? <span>검색 결과가 없습니다.</span> : null}
      <div id="menu_wrap" class="bg_white">
        <MapBox
          id={`${mapid}`}
          className={`${isHalf ? 'halfHeight' : null} ${
            isModal && keyword ? 'result' : null
          }`}
          marginTop={marginTop}
          style={{
            width: '100%',
          }}
        ></MapBox>
        {isModal && keyword ? (
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
