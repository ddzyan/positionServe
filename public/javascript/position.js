var markerArr = [{
    latitude: "120.792084",
    longitude: "30.740111"
},
{
    latitude: "120.832257",
    longitude: "30.741601"
}];

var map; //Map实例    
function map_init() {
    map = new BMap.Map("map");
    //设置中心点，嘉兴市    
    var point = new BMap.Point(120.762189, 30.75265);
    //初始化地图    
    map.centerAndZoom(point, 13);
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
}

// 添加标注    
function addMarker(point, index) {
    var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png",
        new BMap.Size(23, 25), {
            offset: new BMap.Size(10, 25),
            imageOffset: new BMap.Size(0, 0 - index * 25)
        });
    var marker = new BMap.Marker(point, {
        icon: myIcon
    });
    map.addOverlay(marker);
    return marker;
}

function ajax_get() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/positions',
        dataType: 'json',
        success: function (msg) {
            console.log(msg.data);
            for (let i = 0; i < msg.data.length; i++) {
                markerArr.push({
                    latitude: `${msg.data[i].latitude}`,
                    longitude: `${msg.data[i].longitude}`
                })
            }
            for (var i = 0; i < markerArr.length; i++) {
                console.log(markerArr[i]);
                addMarker(new window.BMap.Point(markerArr[i].latitude, markerArr[i].longitude), i);
                //addInfoWindow(maker, markerArr[i], i);     
            }
            console.log(markerArr);
        },
        error: function (error) {
            console.log(error);
        }

    });
}

function map_load() {
    var load = document.createElement("script");
    load.src = "http://api.map.baidu.com/api?v=1.4&callback=map_init";
    document.body.appendChild(load);
}
window.onload = map_load;