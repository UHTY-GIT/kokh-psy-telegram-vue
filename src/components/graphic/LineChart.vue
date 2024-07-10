<template>
  <LineChart :chartData="chartData" :chartOptions="chartOptions" />
</template>

<script>
import { ref, onMounted } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart as ChartJS, Title, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler } from 'chart.js';
import apiService from '@/services/apiService';

ChartJS.register(Title, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler);

export default {
  name: 'LineChartComponent',
  components: {
    LineChart
  },
  setup() {
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Dataset 1',
          data: [],
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.4
        },
        {
          label: 'Dataset 2',
          data: [],
          fill: true,
          backgroundColor: 'rgba(255,135,128,0.4)',
          borderColor: 'rgba(255,135,128,1)',
          tension: 0.4
        }
      ]
    });

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

    const fetchData = async () => {
      try {
        const telegramID = localStorage.getItem('telegram_user_id'); // Ensure you have the telegram ID set in local storage
        if (!telegramID) {
          throw new Error('Telegram ID not found in local storage');
        }

        const response = await apiService.getGraphicsClient(telegramID);
        const data = response.data.data;

        const datasetFirst = data.dataset_first.value.map(Number); // Convert values to numbers if needed
        const datasetSecond = data.dataset_second.value.map(Number); // Convert values to numbers if needed

        chartData.value.labels = datasetFirst.map((_, index) => index + 1); // Creating labels based on the number of elements
        chartData.value.datasets[0].label = data.dataset_first.title_of_graphic;
        chartData.value.datasets[0].data = datasetFirst;

        chartData.value.datasets[1].label = data.dataset_second.title_of_graphic;
        chartData.value.datasets[1].data = datasetSecond;
      } catch (error) {
        console.error('Error fetching graphics data:', error);
      }
    };

    onMounted(fetchData);

    return {
      chartData,
      chartOptions
    };
  }
};
</script>