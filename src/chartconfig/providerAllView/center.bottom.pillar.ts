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
    top: '30',
    left: '85',
    right: '5%',
    bottom: '18%'
  },
  color: ['#16D4D2'],
  xAxis: {
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      textStyle: {
        color: '#388DD3',
        fontSize: 17
      }
    },
    axisLine: {
      lineStyle: {
        color: '#183888'
      }
    },
    data: ['公开招标', '邀请招标', '邀请招标', '邀请询价', '邀请谈判', '公开比选', '公开询价', '单一采购', '公开竞判', '电商采购']
  },
  yAxis: {
    axisTick: {
      lineStyle: {
        width: 2,
        color: '#398FD1'
      }
    },
    axisLabel: {
      textStyle: {
        color: '#398FD1',
        fontSize: 16
      }
    },
    splitLine: {
      lineStyle: {
        color: '#183888'
      }
    },
    axisLine: {
      //坐标轴轴线相关设置。数学上的x轴
      show: false
    }
  },
  series: [
    {
      type: 'bar',
      barWidth: '40%',
      label: {
        show: true,
        position: 'top'
      },
      data: [2.5, 2.8, 3.7, 0.7, 1.9, 4.7, 4.2, 2.5, 6.4, 3.5]
    }
  ]
}
export default option
