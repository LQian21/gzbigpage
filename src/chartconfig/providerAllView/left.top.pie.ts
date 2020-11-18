import { chartFontStyle } from '../static'
const option = {
  textStyle: chartFontStyle,
  title: {
    text: '供应商\n业务类型',
    left: 'center',
    top: '41%',
    textStyle: {
      fontSize: 20,
      color: '#fff',
      lineHeight: 32,
      fontWeight: 'bold'
    }
  },
  color: ['#F2DA32', '#16D4D2', '#AD6BE7', '#58ABF1'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [
    {
      name: '统计',
      type: 'pie',
      radius: [70, 140],
      center: ['50%', '50%'],
      roseType: 'radius',
      label: {
        show: true,
        color: '#fff',
        formatter: function(param: any) {
          return param.data.name + '\n{b|' + param.data.value * 100 + '%}'
        },
        // formatter: '{per|{d}%} \n {b|{b}}  ',
        rich: {
          b: {
            color: '#4FFFE4'
          }
        }
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        {
          value: 47.59,
          name: 'rose1'
        },
        {
          value: 32.41,
          name: 'rose2'
        },
        {
          value: 20,
          name: 'rose3'
        }
      ]
    }
  ]
}
export default option
