import { chartFontStyle } from '../static'
const option = {
  textStyle: chartFontStyle,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    textStyle: {
      color: '#C7EBF9',
      fontSize: 16
    },
    itemWidth: 10,
    itemHeight: 10,
    data: ['公开招标', '公开竞争性谈判', '公开比选', '单一来源采购(公示)', '单一来源采购(非公示)']
  },
  grid: {
    top: 160,
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      axisLabel: {
        color: '#398FD1',
        fontSize: 17
      },
      axisLine: {
        lineStyle: {
          color: '#183888'
        }
      },
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          width: 2,
          color: '#398FD1'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#183888'
        }
      },
      data: ['第一年', '第二年', '第三年']
    }
  ],
  yAxis: [
    {
      name: '单位：万元',
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
          color: '#183688'
        }
      },
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: false,
        lineStyle: {
          color: '#C9EFFA'
        }
      }
    }
  ],
  color: ['#16D4D2', '#F2DA32', '#58ABF1', '#6A50FF', '#D55CE7'],
  series: [
    {
      name: '公开招标',
      type: 'bar',
      barWidth: '25%',
      stack: '广告',
      data: [5, 3, 6]
    },
    {
      name: '公开竞争性谈判',
      type: 'bar',
      stack: '广告',
      data: [2, 0, 0]
    },
    {
      name: '公开比选',
      type: 'bar',
      stack: '广告',
      data: [1, 0, 0]
    },
    {
      name: '单一来源采购(公示)',
      type: 'bar',
      stack: '广告',
      data: [0, 4, 0]
    },
    {
      name: '单一来源采购(非公示)',
      type: 'bar',
      stack: '广告',
      data: [0, 0, 3]
    }
  ]
}
export default option
