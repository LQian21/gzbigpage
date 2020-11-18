import { chartFontStyle } from '../static'
const option = {
  textStyle: chartFontStyle,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: 10,
    left: 20,
    itemWidth: 15,
    itemHeight: 15,
    textStyle: {
      color: '#BFE4F2',
      padding: [3, 0, 0, 0]
    },
    data: ['重点供应商', '非重点供应商']
  },
  grid: {
    left: '3%',
    right: '10%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    position: 'top',
    type: 'value',
    boundaryGap: [0, 0.01],
    axisLabel: {
      color: '#388DD3'
    },
    axisLine: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#163485'
      }
    }
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      color: '#BFE3F2',
      fontSize: 17
    },
    axisLine: {
      //坐标轴轴线相关设置。数学上的x轴
      show: false
    },
    data: ['新增合同额', '列账', '付款', '余额']
  },
  series: [
    {
      name: '重点供应商',
      type: 'bar',
      barWidth: '25%',
      data: [4.24, 6.23, 3.06, 1.54],
      itemStyle: {
        color: '#16D4D2'
      },
      label: {
        show: true,
        position: 'right',
        color: '#BFE3F2',
        fontSize: 14,
        offset: [10, 0]
      }
    },
    {
      name: '非重点供应商',
      type: 'bar',
      barWidth: '25%',
      data: [2.15, 3.86, 4.53, 3.23],
      itemStyle: {
        color: '#F2DA32'
      },
      label: {
        show: true,
        position: 'right',
        color: '#BFE3F2',
        fontSize: 14,
        offset: [10, 0]
      }
    }
  ]
}
export default option
