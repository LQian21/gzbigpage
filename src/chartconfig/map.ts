// import { GZProvinceCityEnum } from './static'

// for (const a in GZProvinceCityEnum) {
//   console.log(a, GZProvinceCityEnum[a])
// }
const data = [
  {
    name: '贵阳',
    value: [106.713478, 26.578343]
  },
  {
    name: '六盘水',
    value: [104.846743, 26.584643]
  },
  {
    name: '遵义',
    value: [106.937265, 27.706626]
  },
  {
    name: '安顺',
    value: [105.932188, 26.245544]
  },
  {
    name: '毕节',
    value: [105.28501, 27.301693]
  },
  {
    name: '铜仁',
    value: [109.191555, 27.718346]
  },
  {
    name: '黔西南',
    value: [104.897971, 25.08812]
  },
  {
    name: '黔东南',
    value: [107.977488, 26.583352]
  },
  {
    name: '黔南',
    value: [107.517156, 26.258219]
  }
]
const LableData = [
  {
    name: '安徽',
    coords: [
      [117.2461, 32.0361],
      [109.8632, 47.9899],
      [105.8632, 47.9899]
    ], // 线条位置[开始位置，结束位置]
    value: [10.21, 1.2]
  },
  {
    name: '江苏',
    coords: [
      [120.0586, 32.915],
      [126.7382, 32.915],
      [126.7382, 22.4764]
    ], // 线条位置[开始位置，结束位置]
    value: [10.21, 1.2]
  },
  {
    name: '重庆',
    coords: [
      [107.7539, 30.1904],
      [100.371, 19.4764],
      [95.371, 19.4764]
    ], // 线条位置[开始位置，结束位置]
    value: [10.21, 1.2]
  }
]

const map: any = {
  title: {
    text: '各地区占比分布',
    textStyle: {
      color: '#fff',
      fontSize: 26,
      fontWeight: 'bold'
    },
    left: 0,
    top: 0
  },
  tooltip: {
    trigger: 'item',
    formatter: function(param: any) {
      if (!param.data || !param.data.name) {
        return ''
      } else {
        return '<p>' + param.data.name + '</p>' + '<p>占比:' + (param.data.value * 100).toFixed(0) + '%</p>'
      }
    }
  },
  //   visualMap: {
  //     type: 'continuous',
  //     // orient: 'vertical',
  //     orient: 'horizontal',
  //     itemWidth: 20,
  //     itemHeight: 225,
  //     // text: ['低', '高'],
  //     text: ['', ''],
  //     showLabel: true,
  //     seriesIndex: [0],
  //     min: 0,
  //     max: 200,
  //     inRange: {
  //       color: ['#E74335', '#E56B09', '#F1C54F', '#03D9D1', '#1D7FC3'].reverse()
  //     },
  //     textStyle: {
  //       color: '#fff'
  //     },
  //     x: 0,
  //     y2: 20
  //   },
  geo: {
    id: 1,
    map: 'guizhou',
    zoom: 1,
    zlevel: 0,
    layoutCenter: ['50%', '50%'], //地图位置
    layoutSize: '100%',
    label: {
      show: false,
      emphasis: {
        show: false
      }
    },
    // roam: true,
    itemStyle: {
      normal: {
        borderColor: 'rgba(147, 235, 248, .2)',
        borderWidth: 1,
        areaColor: '#1D7FC4',
        // areaColor: {
        //   type: 'radial',
        //   x: 0.5,
        //   y: 0.5,
        //   r: 0.8,
        //   colorStops: [
        //     {
        //       offset: 0,
        //       color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
        //     },
        //     {
        //       offset: 1,
        //       color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
        //     }
        //   ],
        //   globalCoord: false // 缺省为 false
        // },
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowOffsetX: 8,
        shadowOffsetY: 25,
        shadowBlur: 15
        // borderColor: 'rgba(0,63,140,0.2)',
        // shadowColor: 'rgba(0,63,140,0.2)',
        // shadowOffsetY: 20,
        // shadowBlur: 30
      }
    }
  },
  //   roam: true,
  series: [
    {
      type: 'map',
      //   geoIndex: 0,
      map: 'guizhou',
      zoom: 1,
      layoutCenter: ['50%', '50%'], //地图位置
      layoutSize: '100%',
      data: [
        // { name: '安徽', value: 175 },
        // { name: '江苏', value: 90 },
        // { name: '重庆', value: 200 }
      ],
      itemStyle: {
        normal: {
          label: {
            show: false,
            color: 'rgba(255, 255, 255, 0.8)'
          },
          borderColor: 'rgba(81, 199, 241, 0.87)',
          //   borderWidth: 3,
          //   areaColor: '#083c88',
          //   shadowColor: 'rgba(255,255,255,0.2)',
          //   //   shadowColor: 'rgba(0,0,0,0.5)',
          //   //   shadowColor: '#299df4',
          //   shadowBlur: 2,
          //   shadowOffsetX: 2,
          //   shadowOffsetY: 2
          borderWidth: 3,
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(147, 235, 248, .4)' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          },
          shadowColor: 'rgba(128, 217, 248, 1)',
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10
        },
        emphasis: {
          areaColor: '#2B98DC',
          label: {
            show: false,
            color: 'rgba(255, 255, 255, 0.8)'
          }
        }
      }
    },
    // {
    //   type: 'lines',
    //   zlevel: 3,
    //   polyline: true,
    //   symbol: 'circle',
    //   symbolSize: [5, 5],
    //   color: '#ff8003',
    //   opacity: 1,
    //   lineStyle: {
    //     type: 'solid',
    //     color: '#fff',
    //     width: 0.5,
    //     opacity: 1
    //   },
    //   data: LableData
    // },
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 4,
      symbolSize: 8,
      label: {
        normal: {
          show: false,
          position: 'right',
          formatter: '{b}',
          color: 'white'
        }
      },
      itemStyle: {
        normal: {
          color: '#50fee5'
        }
      },
      rippleEffect: {
        scale: 3,
        brushType: 'stroke'
      },
      data: data
    }
  ]
}

export default map
