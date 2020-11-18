import { chartFontStyle } from '../static'
const option = {
  textStyle: chartFontStyle,
  color: ['#16D4D2'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
    // formatter:function(params:any){
    //   return params +'万元'
    // },
  },
  xAxis: {
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
    data: ['0-3个月', '3-6个月', '6-12个月', '12个月以上']
  },
  yAxis: {
    name: '单位：万元',
    axisTick: {
      lineStyle: {
        width: 2,
        color: '#398FD1'
      }
    },
    axisLabel: {
      formatter: '{value}',
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
      show: false,
      lineStyle: {
        color: '#C9EFFA'
      }
    }
  },
  series: [
    {
      type: 'bar',
      barWidth: '18%',
      data: [2.5, 5.5, 4.7, 1.7]
    }
  ]
}
export default option
