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
  color: ['#D55CE7', '#6B51FE', '#E85089', '#AD6BE7', '#F5952F', '#58ABF1', '#F2DA32', '#16D4D2'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [
    {
      name: '统计',
      type: 'pie',
      radius: [60, 120],
      center: ['50%', '50%'],
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
          value: 4.37,
          name: 'rose1'
        },
        {
          value: 1.46,
          name: 'rose2'
        },
        {
          value: 12.5,
          name: 'rose3'
        },
        {
          value: 14.58,
          name: 'rose4'
        },
        {
          value: 15.0,
          name: 'rose5'
        },
        {
          value: 19.38,
          name: 'rose6'
        },
        {
          value: 16.67,
          name: 'rose7'
        },
        {
          value: 16.04,
          name: 'rose8'
        }
      ]
    }
  ]
}
export default option
