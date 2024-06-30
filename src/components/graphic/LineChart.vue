<!-- src/components/graphic/LineChart.vue -->
<template>
  <LineChart :chartData="chartData" :chartOptions="chartOptions" />
</template>

<script>
import { LineChart } from 'vue-chart-3';
import { Chart as ChartJS, Title, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler);

export default {
  name: 'LineChartComponent',
  components: {
    LineChart
  },
  setup() {
    const chartData = {
      labels: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 11, 12],
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.4
        },
        {
          label: 'Dataset 2',
          data: [5, 4, 3, 2, 1, 6, 7, 8, 9, 10, 5, 6],
          fill: true,
          backgroundColor: 'rgba(255,135,128,0.4)',
          borderColor: 'rgba(255,135,128,1)',
          tension: 0.4
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Monthly Data'
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Month'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value'
          }
        }
      }
    };

    return {
      chartData,
      chartOptions
    };
  }
};
</script>