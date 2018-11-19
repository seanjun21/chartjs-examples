var data = {
  datasets: [
    {
      backgroundColor: ['#00D08A', '#FF0021','#FFDB69'],
      data: [254, 37, 13]
    }
  ]
};
var ctx = document.getElementById('myChart').getContext('2d');

Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      //Get ctx from string
      var ctx = chart.chart.ctx;

      //Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text;
      var color = centerConfig.color || '#000';
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
      //Start with a base font of 17px
      ctx.font = '17px ' + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = fontSizeToUse + 'px ' + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt.split(' ')[0], centerX, centerY - 20);
      ctx.fillText(txt.split(' ')[1], centerX, centerY);
      ctx.font = 'Bold 22px Roboto';
      ctx.fillText(txt.split(' ')[2], centerX, centerY + 25);
    }
  }
});


var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: data,

    // Configuration options go here
    options: {
      responsive: false,
      events: false,
      tooltips: {
        enabled: false
      },
      cutoutPercentage: 70,
      elements: {
        arc: {
          borderWidth: 0
        },
        center: {
          text: 'Total Completed ' + data.datasets[0].data.reduce((a, b) => a + b, 0),
          fontStyle: 'Roboto', //Default Arial
          sidePadding: 15 //Default 20%
        }
      }
    }
});
