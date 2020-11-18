const GZProvinceCityEnum: Record<string, string> = {
  A52: '贵州省',
  A5201: '贵阳市',
  A5208: '六盘水市',
  A5202: '遵义市',
  A5203: '安顺市',
  A5207: '毕节市',
  A5206: '铜仁市',
  A5209: '黔西南布依族苗族自治州',
  A5205: '黔东南苗族侗族自治州',
  A5204: '黔南布依族苗族自治州',
  A5212: '贵安新区'
}
const GZProvinceCityItem: Record<string, string> = {
  A52: '全省',
  A5200: '省公司',
  A5201: '贵阳',
  A5202: '遵义',
  A5203: '安顺',
  A5204: '黔南',
  A5205: '黔东南',
  A5206: '铜仁',
  A5207: '毕节',
  A5208: '六盘水',
  A5209: '黔西南',
  A5210: '政企客户事业部',
  A5211: '视频增值运营中心',
  A5212: '贵安新区'
}
const indexdata = [
  {
    viewCode: '2001',
    chnlType: '00',
    chartCode: 'GYSZT_00_01',
    chartOrd: 1,
    idxs: [
      { id: 'A2D6BB192E40430BE0531501A8C10009', chartCode: 'GYSZT_00_01', idxCde: 'GYSZT_01_0001', idxOrd: '1' },
      { id: 'A2D6BB192E40430BE0531501A8C10010', chartCode: 'GYSZT_00_01', idxCde: 'GYSZT_02_0001', idxOrd: '2' },
      { id: 'A2D6BB192E40430BE0531501A8C10011', chartCode: 'GYSZT_00_01', idxCde: 'GYSZT_03_0001', idxOrd: '3' },
      { id: 'A2D6BB192E40430BE0531501A8C10012', chartCode: 'GYSZT_00_01', idxCde: 'GYSZT_04_0001', idxOrd: '4' }
    ]
  },
  {
    viewCode: '2001',
    chnlType: '00',
    chartCode: 'GYSZT_00_02',
    chartOrd: 2,
    idxs: [
      { id: 'A2D6BB192E40430BE0531501A8C10013', chartCode: 'GYSZT_00_02', idxCde: 'GYSZT_00_0001', idxOrd: '1' },
      { id: 'A2D6BB192E40430BE0531501A8C10018', chartCode: 'GYSZT_00_02', idxCde: 'GYSZT_00_0002', idxOrd: '2' },
      { id: 'A2D6BB192E40430BE0531501A8C10023', chartCode: 'GYSZT_00_02', idxCde: 'GYSZT_00_0003', idxOrd: '3' },
      { id: 'A2D6BB192E40430BE0531501A8C10028', chartCode: 'GYSZT_00_02', idxCde: 'GYSZT_00_0004', idxOrd: '4' },
      { id: 'A2D6BB192E40430BE0531501A8C10033', chartCode: 'GYSZT_00_02', idxCde: 'GYSZT_00_0005', idxOrd: '5' },
      { id: 'A2D6BB192E40430BE0531501A8C10038', chartCode: 'GYSZT_00_02', idxCde: 'GYSZT_00_0006', idxOrd: '6' },
      { id: 'A2D6BB192E40430BE0531501A8C10043', chartCode: 'GYSZT_00_02', idxCde: 'GYSZT_00_0007', idxOrd: '7' },
      { id: 'A2D6BB192E40430BE0531501A8C10048', chartCode: 'GYSZT_00_02', idxCde: 'GYSZT_00_0008', idxOrd: '8' }
    ]
  },
  { viewCode: '2001', chnlType: '00', chartCode: 'GYSZT_00_03', chartOrd: 3, idxs: [{ id: 'A2D6BB192E40430BE0531501A8C10053', chartCode: 'GYSZT_00_03', idxCde: 'GYSZT_00_0009', idxOrd: '1' }] },
  {
    viewCode: '2001',
    chnlType: '00',
    chartCode: 'GYSZT_00_04',
    chartOrd: 4,
    idxs: [
      { id: 'A2D6BB192E40430BE0531501A8C10058', chartCode: 'GYSZT_00_04', idxCde: 'GYSZT_00_0010', idxOrd: '1' },
      { id: 'A2D6BB192E40430BE0531501A8C10063', chartCode: 'GYSZT_00_04', idxCde: 'GYSZT_00_0011', idxOrd: '2' },
      { id: 'A2D6BB192E40430BE0531501A8C10068', chartCode: 'GYSZT_00_04', idxCde: 'GYSZT_00_0012', idxOrd: '3' },
      { id: 'A2D6BB192E40430BE0531501A8C10073', chartCode: 'GYSZT_00_04', idxCde: 'GYSZT_00_0013', idxOrd: '4' },
      { id: 'A2D6BB192E40430BE0531501A8C10078', chartCode: 'GYSZT_00_04', idxCde: 'GYSZT_00_0014', idxOrd: '5' },
      { id: 'A2D6BB192E40430BE0531501A8C10083', chartCode: 'GYSZT_00_04', idxCde: 'GYSZT_00_0015', idxOrd: '6' },
      { id: 'A2D6BB192E40430BE0531501A8C10088', chartCode: 'GYSZT_00_04', idxCde: 'GYSZT_00_0016', idxOrd: '7' },
      { id: 'A2D6BB192E40430BE0531501A8C10093', chartCode: 'GYSZT_00_04', idxCde: 'GYSZT_00_0017', idxOrd: '8' }
    ]
  },
  {
    viewCode: '2001',
    chnlType: '00',
    chartCode: 'GYSZT_00_05',
    chartOrd: 5,
    idxs: [
      { id: 'A2D6BB192E40430BE0531501A8C10098', chartCode: 'GYSZT_00_05', idxCde: 'GYSZT_00_0018', idxOrd: '1' },
      { id: 'A2D6BB192E40430BE0531501A8C10103', chartCode: 'GYSZT_00_05', idxCde: 'GYSZT_00_0019', idxOrd: '2' },
      { id: 'A2D6BB192E40430BE0531501A8C10108', chartCode: 'GYSZT_00_05', idxCde: 'GYSZT_00_0020', idxOrd: '3' },
      { id: 'A2D6BB192E40430BE0531501A8C10113', chartCode: 'GYSZT_00_05', idxCde: 'GYSZT_00_0021', idxOrd: '4' },
      { id: 'A2D6BB192E40430BE0531501A8C10118', chartCode: 'GYSZT_00_05', idxCde: 'GYSZT_00_0022', idxOrd: '5' },
      { id: 'A2D6BB192E40430BE0531501A8C10123', chartCode: 'GYSZT_00_05', idxCde: 'GYSZT_00_0023', idxOrd: '6' }
    ]
  },
  {
    viewCode: '2001',
    chnlType: '00',
    chartCode: 'GYSZT_00_06',
    chartOrd: 6,
    idxs: [
      { id: 'A2D6BB192E40430BE0531501A8C10128', chartCode: 'GYSZT_00_06', idxCde: 'GYSZT_00_0024', idxOrd: '1' },
      { id: 'A2D6BB192E40430BE0531501A8C10133', chartCode: 'GYSZT_00_06', idxCde: 'GYSZT_00_0025', idxOrd: '2' },
      { id: 'A2D6BB192E40430BE0531501A8C10138', chartCode: 'GYSZT_00_06', idxCde: 'GYSZT_00_0026', idxOrd: '3' },
      { id: 'A2D6BB192E40430BE0531501A8C10143', chartCode: 'GYSZT_00_06', idxCde: 'GYSZT_00_0027', idxOrd: '4' },
      { id: 'A2D6BB192E40430BE0531501A8C10148', chartCode: 'GYSZT_00_06', idxCde: 'GYSZT_00_0028', idxOrd: '5' },
      { id: 'A2D6BB192E40430BE0531501A8C10153', chartCode: 'GYSZT_00_06', idxCde: 'GYSZT_00_0029', idxOrd: '6' },
      { id: 'A2D6BB192E40430BE0531501A8C10158', chartCode: 'GYSZT_00_06', idxCde: 'GYSZT_00_0030', idxOrd: '7' },
      { id: 'A2D6BB192E40430BE0531501A8C10163', chartCode: 'GYSZT_00_06', idxCde: 'GYSZT_00_0031', idxOrd: '8' },
      { id: 'A2D6BB192E40430BE0531501A8C10168', chartCode: 'GYSZT_00_06', idxCde: 'GYSZT_00_0032', idxOrd: '9' },
      { id: 'A2D6BB192E40430BE0531501A8C10173', chartCode: 'GYSZT_00_06', idxCde: 'GYSZT_00_0033', idxOrd: '10' }
    ]
  },
  { viewCode: '2001', chnlType: '00', chartCode: 'GYSZT_00_07', chartOrd: 7, idxs: [{ id: 'A2D6BB192E40430BE0531501A8C10178', chartCode: 'GYSZT_00_07', idxCde: 'GYSZT_00_0034', idxOrd: '1' }] }
]
const chartFontStyle: Record<string, any> = {
  color: '#17d3ba',
  fontStyle: 'normal',
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  fontSize: 17
}

export { GZProvinceCityEnum, GZProvinceCityItem, indexdata, chartFontStyle }
