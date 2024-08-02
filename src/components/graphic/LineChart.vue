<template>
  <LineChart :chartData="chartData" :options="chartOptions" />
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
      datasets: []
    });

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              family: 'Nunito',
              size: 14
            }
          }
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'К-сть сесій',
            font: {
              size: 14,
              family: "Nunito"
            }
          }
        },
        y: {
          display: true,
          title: {
            display: false,
            text: 'Значення',
            font: {
              size: 16,
              family: "Nunito"
            }
          },
          ticks: {
            stepSize: 1,
            callback: function(value) {
              if (Number.isInteger(value)) {
                return value;
              }
            }
          }
        }
      }
    };

    const fetchData = async () => {
      try {
        //const originType = 'individual';
        //const telegramID = 6112401748;
        const telegramID = localStorage.getItem('telegram_user_id');
        const originType = localStorage.getItem('origin_type'); // Get origin_type from local storage

        if (!telegramID) {
          throw new Error('Telegram ID not found in local storage');
        }

        const response = await apiService.getGraphicsClient(telegramID);
        const data = response.data.data;

        if (originType === 'individual') {
          const datasetSecond = data.dataset_second.value.map(Number);
          chartData.value.labels = datasetSecond.map((_, index) => index + 1);
          chartData.value.datasets = [
            {
              label: data.dataset_second.title_of_graphic,
              data: datasetSecond,
              fill: true,
              backgroundColor: 'rgba(255,135,128,0.4)',
              borderColor: 'rgba(255,135,128,1)',
              tension: 0.4
            }
          ];
        } else if (originType === 'couple_сlassic') {
          const datasetThird = data.dataset_third.value.map(Number);
          chartData.value.labels = datasetThird.map((_, index) => index + 1);
          chartData.value.datasets = [
            {
              label: data.dataset_third.title_of_graphic,
              data: datasetThird,
              fill: true,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.4
            }
          ];
        }
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
