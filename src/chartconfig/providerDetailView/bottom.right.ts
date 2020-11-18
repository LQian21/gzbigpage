import { chartFontStyle } from '../static'
const option = {
  textStyle: chartFontStyle,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: '12%',
    bottom: '8%',
    containLabel: true
  },
  legend: {
    itemGap: 20,
    right: '2%',
    top: '2%',
    textStyle: {
      color: '#C7EBF9',
      fontSize: 16
    },
    itemWidth: 15,
    itemHeight: 15,
    data: ['列账', '付款']
  },
  xAxis: [
    {
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: '#388DD3'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#388DD3',
          fontSize: 16
        }
      },
      axisLine: {
        lineStyle: {
          color: '#183888'
        }
      },
      data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
    }
  ],
  yAxis: {
    name: '单位：万元',
    axisTick: {
      lineStyle: {
        width: 2,
        color: '#398FD1'
      }
    },
    axisLabel: {
      textStyle: {
        color: '#398FD1'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#183888'
      }
    },
    axisLine: {
      //坐标轴轴线相关设置。数学上的x轴
      show: false,
      lineStyle: {
        color: '#C9EFFA'
      }
    }
  },
  series: [
    {
      name: '列账',
      type: 'bar',
      barWidth: 20,
      barGap: '0%',
      color: '#16D4D2',
      itemStyle: {
        normal: {
          barBorderRadius: 3
        }
      },
      data: [370, 250, 180, 320, 340, 220, 550, 370, 250, 180, 320, 340]
    },
    {
      name: '付款',
      type: 'bar',
      barWidth: 20,
      color: '#F2DA32',
      itemStyle: {
        normal: {
          barBorderRadius: 3
        }
      },
      data: [160, 320, 120, 160, 350, 240, 440, 160, 320, 120, 160, 350]
    }
  ]
}
export default option
