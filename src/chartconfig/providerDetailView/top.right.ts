import { chartFontStyle } from '../static'
const option = {
  textStyle: chartFontStyle,
  radar: {
    // shape: 'circle',
    radius: '80%',
    center: ['50%', '50%'],
    // startAngle: 0,
    triggerEvent: true,
    name: {
      textStyle: {
        color: '#C9EDFC',
        fontSize: '16',
        borderRadius: 3,
        padding: [3, 5]
      }
    },
    nameGap: '2',
    indicator: [
      {
        name: '应收账款周转率',
        max: 1
      },
      {
        name: '资产负债率',
        max: 1
      },
      {
        name: '净利润率',
        max: 1
      },
      {
        name: '现金流量比率',
        max: 1
      },
      {
        name: '列账金额同比率',
        max: 1
      }
    ],
    splitArea: {
      areaStyle: {
        color: ['rgba(0,255,255, 0.1)', 'rgba(0,255,255, 0.2)', '#4152BA', 'rgba(0,255,255, 0.4)', 'rgba(65,82,186, 0.5)', 'rgba(0,255,255, 0.6)'].reverse(),
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowBlur: 30,
        shadowOffsetX: 10,
        shadowOffsetY: 10
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(38,160,199)'
      }
    },
    splitLine: {
      lineStyle: {
        width: 1,
        color: ['rgba(26,99,180)', 'rgba(26,99,180)', 'rgba(26,99,180)', 'rgba(26,99,180))', 'rgba(26,99,180)', 'rgba(26,99,180)'].reverse()
      }
    }
  },
  series: [
    {
      name: '一级权重分析',
      type: 'radar',
      areaStyle: {
        normal: {
          color: 'rgba(34,180,205,0.9)'
        }
      },
      symbol: 'circle',
      symbolSize: 7,
      itemStyle: {
        color: '#fff',
        borderColor: 'rgba(31,204,210)',
        borderWidth: 2
      },
      lineStyle: {
        color: '#0755DA',
        width: 3
      },
      data: [[0.2, 0.4, 0.6, 0.7, 0.3]]
    }
  ]
}
export default option
