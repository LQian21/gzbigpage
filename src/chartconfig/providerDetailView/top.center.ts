import echarts from 'echarts'
const dataArr = 95.36
import { chartFontStyle } from '../static'
const option = {
  textStyle: chartFontStyle,
  title: {
    show: true,
    text: '得分情况',
    x: '50%',
    y: '57%',
    z: 8,
    textAlign: 'center',
    textStyle: {
      color: '#f1f7fe',
      fontSize: 14,
      fontWeight: 'normal'
    }
  },
  series: [
    {
      name: '内部（环形）进度条',
      type: 'gauge',
      radius: '60%',
      splitNumber: 10,
      axisLine: {
        lineStyle: {
          color: [
            [
              dataArr / 100,
              new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#42C6F7'
                },
                {
                  offset: 1,
                  color: '#D155EF'
                }
              ])
            ],
            [1, '#2E47A4']
          ],
          width: 15
        }
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      pointer: {
        show: false
      }
    },
    {
      name: '外部刻度',
      type: 'gauge',
      //  center: ['20%', '50%'],
      radius: '70%',
      min: 0, //最小刻度
      max: 100, //最大刻度
      splitNumber: 10, //刻度数量
      startAngle: 225,
      endAngle: -45,
      axisLine: {
        show: false
      },
      //仪表盘文字
      axisLabel: {
        show: true,
        color: '#3888CB',
        distance: -20,
        formatter: function(v: any) {
          switch (v + '') {
            case '0':
              return '0'
            case '10':
              return '10'
            case '20':
              return '20'
            case '30':
              return '30'
            case '40':
              return '40'
            case '50':
              return '50'
            case '60':
              return '60'
            case '70':
              return '70'
            case '80':
              return '80'
            case '90':
              return '90'
            case '100':
              return '100'
          }
        }
      },
      //刻度标签
      axisTick: {
        show: true,
        splitNumber: 7,
        lineStyle: {
          // color: '#3082FE', //用颜色渐变函数不起作用
          // width: 1,
        },
        length: -8
      }, //刻度样式
      splitLine: {
        show: true,
        length: -15,
        lineStyle: {
          color: '#6F45BA' //用颜色渐变函数不起作用
        }
      },
      //分隔线样式
      detail: {
        show: false
      },
      pointer: {
        show: false
      }
    },
    /*内部*/
    {
      type: 'pie',
      radius: '45%',
      center: ['50%', '50%'],
      z: 8,
      hoverAnimation: false,
      data: [
        {
          name: '得分情况',
          value: dataArr,
          itemStyle: {
            color: '#21378C'
          },
          label: {
            normal: {
              formatter: function(params: any) {
                return params.value
              },
              color: '#FFFFFF',
              fontSize: 27,
              fontWeight: 'bold',
              position: 'center',
              show: true
            }
          },
          labelLine: {
            show: false
          }
        }
      ]
    }
  ]
}
export default option
