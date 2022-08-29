// window.onload = function () {
//     var hw = document.getElementById('hw');
//     hw.addEventListener('click', function () {
//       alert('Hello world');
//     })
//   }
// 추정한 범죄율 리스트 
let crime_rate = [['종로구', 4.8415],
['중구', 9.5940],
['용산구', 6.8635],
['성동구', 5.6144],
['광진구', 7.7380],
['동대문구', 6.9200],
['중랑구', 7.2864],
['성북구', 5.4990],
['강북구', 5.7873],
['도봉구', 4.3960],
['노원구', 8.7210],
['은평구', 7.1749],
['서대문구', 5.9682],
['마포구', 8.2008],
['양천구', 6.8853],
['강서구', 8.6618],
['구로구', 9.6638],
['금천구', 4.9259],
['영등포구', 12.3372],
['동작구', 6.8058],
['관악구', 9.4061],
['서초구', 12.3576],
['강남구', 19.8755],
['송파구', 13.4001],
['강동구', 9.6492]
]

// select_box에서 선택한 자치구의 text 저장
var list = [];
$("select[name = district]").change(function () {
  var district = $("select[name=district] option:selected").text();
  list.push(district);
});

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
  map.data.loadGeoJson("/data/District.geojson")
  map.data.setStyle({
    strokeColor: "#000000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFFFF",
    fillOpacity: 0.4
  });

  var num = 0;
  // 자치구확인 > selet_box에서 선택된 자치구의 값을 토대로 범죄율, 자치구 위도 경도 사용
  var button = document.getElementById('btn6');
  button.addEventListener('click', changeCenter);

  function changeCenter() {
    var lat1 =[];
    var lng1 =[];
    for(i=0; i<locations.length; i++){
      if(locations[i][0]==list[0]){
        lat1.push(locations[i][1]);
        lng1.push(locations[i][2]);
      }
    };
    // 위도 경도 지정
    map.panTo({ 
      lat: lat1[0], 
      lng: lng1[0] 
    });
    // 구글맵 zoom_in
    map.setZoom(15);
    // map스타일 초기화
    map.data.setStyle({});
    for(i=0; i<crime_rate.length; i++){
      if(crime_rate[i][0]==list[0]){
        if(crime_rate[i][1] < 4){
          map.data.setStyle({
            fillColor: "#008000"
          });
        }
        else if(crime_rate[i][1] < 7){
          map.data.setStyle({
            fillColor: "#FFFF00"
          });
        }
        else if(crime_rate[i][1] < 10){
          map.data.setStyle({
            fillColor: "#FF8c00"
          });
        }
        else{
          map.data.setStyle({
            fillColor: "#FF0000"
          });
        };
      };
    };
    
  }
}

const chart1 = document.querySelector('.doughnut1');
const chart2 = document.querySelector('.doughnut2');

const makeChart = (percent, classname, color) => {
  let i = 1;
  let chartFn = setInterval(function () {
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




// $(document).ready(function () {
//   $("#btn3").click(function () {
//     makeChart(80, chart1, '#f5b914');

//   });
// });

// $(document).ready(function () {
//   $("#btn4").click(function () {
//     makeChart(50, chart2, '#0A174E');
//   });
// });

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
        var $this = $(this),
          skills = $this.data('width');

        $this.css({ 'width': skills + '%' });

      });
    }

    if (jQuery().appear) {
      $('.zt-skill-bar').appear().on('appear', function () {
        animated_contents();
      });
    } else {
      animated_contents();
    }
  });
});

