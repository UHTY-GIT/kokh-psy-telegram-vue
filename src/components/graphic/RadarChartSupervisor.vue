<!-- src/components/graphic/RadarChartSupervisor.vue -->
<template>
  <div class="sv-radar">
    <!-- CHART -->
    <div class="sv-radar__chart">
      <RadarChart :chartData="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue';
import { RadarChart } from 'vue-chart-3';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler
);

export default {
  name: 'RadarChartSupervisor',
  components: { RadarChart },
  props: {
    chartLabels: {
      type: Array,
      default: () => []
    },
    chartValues: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { chartLabels, chartValues } = toRefs(props);

    const RADAR_BG = 'rgba(218, 177, 137, 0.28)';
    const RADAR_BORDER = 'rgba(218, 177, 137, 0.95)';
    const RADAR_POINT = 'rgba(218, 177, 137, 1)';

    const wrapLabel = (label, maxWords = 2) => {
      const words = label.split(' ');
      const lines = [];
      for (let i = 0; i < words.length; i += maxWords) {
        lines.push(words.slice(i, i + maxWords).join(' '));
      }
      return lines;
    };

    const chartData = computed(() => ({
      labels: chartLabels.value.map(label => wrapLabel(label)),
      datasets: [
        {
          label: 'EFCT Competency Profile',
          data: chartValues.value,
          fill: true,
          backgroundColor: RADAR_BG,
          borderColor: RADAR_BORDER,
          pointBackgroundColor: RADAR_POINT,
          pointBorderColor: RADAR_BORDER,
          pointRadius: 3,
          borderWidth: 2
        }
      ]
    }));

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            boxWidth: 40,
            boxHeight: 12,
            font: { family: 'Nunito', size: 14, weight: '600' },
          }
        },
        tooltip: { enabled: true }
      },
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 100, // Fixed scale for 0-100%
          ticks: {
            stepSize: 20, // 0, 20, 40, 60, 80, 100
            showLabelBackdrop: false,
            font: { family: 'Nunito', size: 10 },
            color: '#494b55'
          },
          pointLabels: {
            font: (ctx) => {
              const width = ctx.chart.width;
              return {
                family: 'Nunito',
                size: width < 360 ? 10 : width < 500 ? 11 : 12,
                weight: '600'
              };
            },
            color: '#494b55'
          },
          grid: { color: '#494b55', lineWidth: 1 },
          angleLines: { color: '#494b55', lineWidth: 1 }
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