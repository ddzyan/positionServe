var map; //Map实例
function map_init() {
  map = new BMap.Map("map");
  //设置中心点，嘉兴市
  var point = new BMap.Point(120.762189, 30.75265);
  //初始化地图
  map.centerAndZoom(point, 13);
  map.addControl(new BMap.NavigationControl());
  //启用滚轮
  map.enableScrollWheelZoom(true);
  //添加缩放控件
  var ctrlNav = new window.BMap.NavigationControl({
    anchor: BMAP_ANCHOR_TOP_LEFT,
    type: BMAP_NAVIGATION_CONTROL_LARGE
  });
  map.addControl(ctrlNav);
  //添加比例尺控件
  var ctrlSca = new window.BMap.ScaleControl({
    anchor: BMAP_ANCHOR_BOTTOM_LEFT
  });
  map.addControl(ctrlSca);

  ajax_get();
  setInterval(ajax_get, 5000);
}

// 添加标注和谷歌坐标转换
function addMarker(longitude, latitude, title) {
  const ggPoint = new BMap.Point(latitude, longitude);

  var convertor = new BMap.Convertor();
  var pointArr = [];
  pointArr.push(ggPoint);
  convertor.translate(pointArr, 3, 5, function (data) {
    const marker = new BMap.Marker(data.points[0]);
    map.addOverlay(marker);
    const label = new BMap.Label(title, { offset: new BMap.Size(20, -10) });
    marker.setLabel(label); //添加百度label
  })
}

function ajax_get() {
  $.ajax({
    type: "GET",
    url: "/positions",
    dataType: "json",
    success: function (msg) {
      map.clearOverlays();
      for (let i = 0; i < msg.data.length; i++) {
        const {
          longitude,
          latitude,
          title
        } = msg.data[i];
        console.log(`经度 :${longitude}`);
        console.log(`纬度 :${latitude}`);
        console.log(`标题 :${title}`);
        addMarker(latitude, longitude, title)
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function map_load() {
  var load = document.createElement("script");
  load.src =
    "http://api.map.baidu.com/api?v=2.0&ak=fhfsGtQVwTxwkCw4iA3QHsElDii3P8RE&callback=map_init";
  document.body.appendChild(load);
}

window.onload = map_load;