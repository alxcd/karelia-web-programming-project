const chartDom = document.getElementById('main');
const myChart = echarts.init(chartDom);

const myChartOption = {
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
      roam: true,
      label: {
        show: true
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
        fontSize: 20
      },
      itemStyle: {
        color: '#add8e6'
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

myChartOption && myChart.setOption(myChartOption);

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