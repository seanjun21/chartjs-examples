var min = -100
var value = 29;
var max = 100;

var data = {
  datasets: [{
    data: [value],
    backgroundColor: value > 0 ? '#00D08A' : '#C1000D'
  }, {
    data: value > 0 ? [max - value] : [max],
    backgroundColor: '#F2F6F8',
  }, {
    data: value > 0 ? [min] : [min - value],
    backgroundColor: '#F2F6F8'
  }]
}

var bar_ctx = document.getElementById('myChart');
var bar_chart = new Chart(bar_ctx, {
  type: 'horizontalBar',
  data: data,
  options: {
    responsive: false,
    events: false,
    tooltips: {
      enabled: false
    },
    legend: {
      display: false
    },
    animation: {
      duration: 1,
      onComplete: function () {
        var chartInstance = this.chart,
            ctx = chartInstance.ctx;
        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize,
                                            Chart.defaults.global.defaultFontStyle,
                                            Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        value > 0 ? ctx.fillStyle = '#00D08A' : ctx.fillStyle = '#C1000D';

        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var metaData = dataset.data[index];
            if (metaData === value) {
              ctx.fillText(metaData, bar._model.x, bar._model.y - 24);
            }
          });
        });
      }
    },
    scales: {
      xAxes: [{
        position: 'top',
        gridLines: {
          drawBorder: false,
          display: false,
          color: '#F2F6F8'
        },
        stacked: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 2,
          min: -100,
          max: 100
        }
      }],
      yAxes: [{
        display: false,
        stacked: true
      }],
    }
  }
});
