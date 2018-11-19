let data = {
  labels: ["Dec'17", "Jan'18", "Feb'18", "Mar'18", "Apr'18", "May'18", "June'18", "Jul'18", "Aug'18", "Sep'18"],
  datasets: [{
    radius: 0,
    cubicInterpolationMode: 'monotone',
    backgroundColor: '#FDB483',
    borderColor: '#FDB483',
    data: [700, 2500, 2500, 5000, 6000, 7500, 7500, 8000, 9000, 10000],
  }]
};

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: data,

  // Configuration options go here
  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
        }
      }],
    }
  }
});
