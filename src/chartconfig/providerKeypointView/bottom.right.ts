import { chartFontStyle } from '../static'
const option = {
  textStyle: chartFontStyle,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#96B2CC'
      }
    },
    formatter: function(param: any) {
      console.log(param)
      return `<div class="test_triangle_border">
         <div class="popup">
          <span><em></em></span>
          <p class="name">${param[0].seriesName}</p>
          <p class="num">${param[0].value}</p>
          <p class="name">${param[1].seriesName}</p>
          <p class="num">${param[1].value}</p>
          <p class="name">${param[2].seriesName}</p>
          <p class="num">${param[2].value}</p>
      </div>
     </div>`
      // return param.data.name + '\n{b|' + param.data.value * 100 + '%'
    }
  },
  legend: {
    right: 120,
    top: '2%',
    textStyle: {
      color: '#C7EBF9',
      fontSize: 16
    },
    itemWidth: 15,
    itemHeight: 15,
    data: ['实缴资本', '实收资本', '资本差异']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    axisLabel: {
      interval: 0, //强制显示文字
      color: '#398FD1',
      fontSize: 16
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
    data: ['菜鸟网络', '长亭科技', '字节跳动', '字节跳动', '字节跳动', '字节跳动', '字节跳动']
  },
  yAxis: [
    {
      axisTick: {
        show: false
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
  color: ['#58ABF1', '#F4962F', '#F2DA32'],
  series: [
    {
      name: '实缴资本',
      type: 'bar',
      barWidth: '25%',
      stack: '广告',
      data: [4.2, 9, 6.5, 2.4, 4.3, 4.1, 7.5]
    },
    {
      name: '实收资本',
      type: 'bar',
      stack: '广告',
      data: [2, 0, 3, 1, 0, 4, 3]
    },
    {
      name: '资本差异',
      type: 'bar',
      stack: '广告',
      data: [2, 0, 3, 1, 0, 4, 3]
    }
  ]
}
export default option
