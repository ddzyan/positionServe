var markerArr = [{
        addr: "120.792084,30.740111",
        descrip: "老丁1"
    },
    {
        addr: "120.832257,30.741601",
        descrip: "老丁2"
    },
    {
        addr: "120.803942,30.753674",
        descrip: "老丁3"
    }
];

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

    //标记经纬度地点
    for (var i = 0; i < markerArr.length; i++) {
        var p0 = markerArr[i].addr.split(",")[0];
        var p1 = markerArr[i].addr.split(",")[1];
        var maker = addMarker(new window.BMap.Point(p0, p1), i);
        //addInfoWindow(maker, markerArr[i], i);     
    }
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
        url: 'http://127.0.0.1:3000/positions',
        dataType: 'json',
        success: function (msg) {
            console.info(msg);
        }

    });
}

function map_load() {
    var load = document.createElement("script");
    load.src = "http://api.map.baidu.com/api?v=1.4&callback=map_init";
    document.body.appendChild(load);
}
window.onload = map_load;