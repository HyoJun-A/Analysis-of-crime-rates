// window.onload = function () {
//     var hw = document.getElementById('hw');
//     hw.addEventListener('click', function () {
//       alert('Hello world');
//     })
//   }


//TODO initMap()
function initMap() {

    var seoul = { lat: 37.5642135, lng: 127.0016985 };
    // 서울특별시 자치구별 이름 및 위도 경도 
    var locations = [
      ['강남구', 37.4959815, 127.0664088],
      ['광진구', 37.5481447, 127.085765],
      ['영등포구', 37.5206414, 126.9139239],
      ['송파구', 37.5048509, 127.1144708],
      ['양천구', 37.5270363, 126.8561354],
      ['금천구', 37.4600745, 126.9001525],
      ['구로구', 37.4956768, 126.8581205],
      ['강서구', 37.5657621, 126.8226558],
      ['은평구', 37.6176107, 126.9227001],
      ['서초구', 37.4769532, 127.0378001],
      ['강동구', 37.549233, 127.1464401],
      ['마포구', 37.5622933, 126.9087792],
      ['서대문구', 37.5828688, 126.9356676],
      ['용산구', 37.5311061, 126.9809422],
      ['노원구', 37.6552597, 127.0771199],
      ['도봉구', 37.6658587, 127.0317954],
      ['성북구', 37.6069889, 127.0232435],
      ['강북구', 37.6469903, 127.0147136],
      ['중랑구', 37.5953753, 127.093966],
      ['성동구', 37.5506718, 127.0409626],
      ['동대문구', 37.5837941, 127.0506879],
      ['종로구', 37.5991001, 126.986175],
      ['중구', 37.5579449, 126.9941953],
      ['동작구', 37.4965073, 126.9443079],
      ['관악구', 37.4654, 126.9438067]
    ];
    var test = 1
    // 마커안에 정보들이 들어갈 문자
    var Information = [
      ['<b>강남구</b> <br>CCTV : 12.1% <br> 생활인구(유동인구) : 2.5% <br> 학교: 5.8% <br> 5대범죄 발생률 : 7.9% <br> 5대범죄 검거율 : 7.8%'],
      ['광진구'],
      ['영등포구'],
      ['송파구'],
      ['양천구'],
      ['금천구'],
      ['구로구'],
      ['강서구'],
      ['은평구'],
      ['서초구'],
      ['강동구'],
      ['마포구'],
      ['서대문구'],
      ['<b>용산구</b> <br>CCTV : 1.6% <br> 생활인구(유동인구) : 2.4% <br> 학교: 2.4% <br> 5대범죄 발생률 : 3.2% <br> 5대범죄 검거율 : 3.0%'],
      ['노원구'],
      ['도봉구'],
      ['성북구'],
      ['강북구'],
      ['중랑구'],
      ['성동구'],
      ['동대문구'],
      ['종로구'],
      ['중구'],
      ['동작구'],
      ['관악구']
    ];
  
    // 구글맵을 통하여 지도를 구현
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: seoul,
    });
  
    // 마커에 정보를 저장하기 위하여 inforwindow 사용 --> inforwindow를 사용하게 된다면 마커를 클릭시 말풍선 형태의 텍스트를 사용할 수 있음 
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
  
    // locations의 길이만큼 반복하여 지도에 마커 표시 
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        id: i,
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
  
      // 마커를 클릭시 정보창을 뛰움 (inforwindow)
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infowindow.setContent(Information[i][0]);
          infowindow.open(map, marker);
        }
  
      })(marker, i));
  
      // 마커를 클릭시 줌(15)만큼, 마커를 지도의 중심으로 이동 
      if (marker) {
        marker.addListener('click', function () {
          map.setZoom(15);
          map.setCenter(this.getPosition());
        });
      }
    }
    map.data.loadGeoJson("/data/Seoul.geojson")
      map.data.setStyle({
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FFFFFF",
        fillOpacity: 0.4
      });
  }
  
  const chart1 = document.querySelector('.doughnut1');
  const chart2 = document.querySelector('.doughnut2');
  
  const makeChart = (percent, classname, color) => {
    let i = 1;
    let chartFn = setInterval(function() {
      if (i < percent) {
        colorFn(i, classname, color);
        i++;
      } else {
        clearInterval(chartFn);
      }
    }, 10);
  }
  
  const colorFn = (i, classname, color) => {
    classname.style.background = "conic-gradient(" + color + " 0% " + i + "%, #dedede " + i + "% 100%)";
  }
  
  
  
  
  $(document).ready(function () {
    $("#btn3").click(function () {
      makeChart(80, chart1, '#f5b914');
  
    });
  });
  $(document).ready(function () {
    $("#btn4").click(function () {
      makeChart(50, chart2, '#0A174E');
    });
  });
  
  // -----------------------------------
  // (function( $ ) {
  //   "use strict";
  //   $(function() {
  //       function animated_contents() {
  //           $(".zt-skill-bar > div ").each(function (i) {
  //               var $this  = $(this),
  //                   skills = $this.data('width');
  
  //               $this.css({'width' : skills + '%'});
  
  //           });
  //       }
        
  //       if(jQuery().appear) {
  //           $('.zt-skill-bar').appear().on('appear', function() {
  //               animated_contents();
  //           });
  //       } else {
  //           animated_contents();
  //       }
  //   });
  // }(jQuery));
  
  $(document).ready(function () {
    $("#btn2").click(function () {
      function animated_contents() {
        $(".zt-skill-bar > div ").each(function (i) {
            var $this  = $(this),
                skills = $this.data('width');
  
            $this.css({'width' : skills + '%'});
  
        });
    }
    
    if(jQuery().appear) {
        $('.zt-skill-bar').appear().on('appear', function() {
            animated_contents();
        });
    } else {
        animated_contents();
    }
    });
  });
  
