/* global kakao */
import { useEffect } from "react";

function MedicalPharmacy() {
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    let lat, lon;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        initMap();
      },
      () => {
        lat = 36.326473;
        lon = 127.40814;
        initMap();
      }
    );

    function initMap() {
      // 지도를 생성
      var mapContainer = document.getElementById("map");
      var mapOption = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 3,
      };
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 지도 타입 컨트롤 추가
      var mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소 컨트롤 추가
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 키워드로 장소 검색
      var ps = new kakao.maps.services.Places();
      let option = {
        location: new kakao.maps.LatLng(lat, lon),
        radius: 1000,
      };
      ps.keywordSearch("내 주변 약국", (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          var bounds = new kakao.maps.LatLngBounds();

          for (var i = 0; i < data.length; i++) {
            displayMarker(data[i], map);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
        }
      }, option);
    }

    function displayMarker(place, map) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
        );
        infowindow.open(map, marker);
      });
    }
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mt-16"> 내 주변 약국 </h1>
      <div className="w-4/5 aspect-video m-auto my-8">
        <div id="map" style={{ width: "100%", aspectRatio: "3/2" }}></div>
      </div>
    </div>
  );
}

export default MedicalPharmacy;
