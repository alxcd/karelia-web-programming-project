var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
  title: {
    text: 'Connections'
  },
  tooltip: {
    formatter: function (params) {
      if (params.dataType === 'node') {
        return `
          <div">
            <img src="${params.data.image}" style="width: 150px;" /><br />
          </div>
        `;
      }
      return params.name;
    }
  },
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'none',
      symbol: 'roundRect',
      symbolSize: function (value, params) {
        return [params.data.name.length * 10, 30];
      },
      roam: false,
      label: {
        show: true
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
        fontSize: 20
      },
      itemStyle: {
        color: '#0d253f'
      },
      lineStyle: {
        color: '#0d253f',
      },
      data: [],
      links: [],
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0
      }
    }
  ]
};

option && myChart.setOption(option);

function updateChart(data, links) {
  myChart.setOption({
    series: [
      {
        data,
        links
      }
    ]
  });
}

myChart.on('click', function (params) {
  if (params.dataType === 'node') {
    console.log('Node clicked: ' + params.data.name);
  }
});