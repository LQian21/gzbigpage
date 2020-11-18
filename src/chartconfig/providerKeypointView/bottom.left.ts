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
  grid: {
    top: '15%',
    left: '20%',
    right: '15%',
    bottom: '15%'
  },
  color: ['#D55CE7', '#6B51FE', '#E85089', '#AD6BE7', '#F5952F', '#58ABF1', '#F2DA32', '#16D4D2'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {d}%'
  },
  series: [
    {
      name: '统计',
      type: 'pie',
      radius: [60, 120],
      center: ['50%', '50%'],
      label: {
        show: true,
        // formatter: function (params: any) {
        //   return (params.value) * 100 + '%' + '\n' + params.name
        // },
        formatter: '{per|{d}%} \n {b|{b}}  ',
        rich: {
          b: {
            color: '#C6EBFA'
          }
        },
        textStyle: {
          fontSize: 16,
          color: '#4FFFE4'
        },
        position: 'outside'
      },
      labelLine: {
        lineStyle: {
          color: '#fff'
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
