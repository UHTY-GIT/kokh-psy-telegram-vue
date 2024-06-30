<!-- src/views/StatisticPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>
        Статистика
      </p>
      <hr class="hr_title">
    </div>
    <div class="container-statistic">
      <LineChartComponent />
    </div>
  </div>
</template>

<script>
import LineChartComponent from '@/components/graphic/LineChart.vue';

export default {
  name: 'StatisticPage',
  components: {
    LineChartComponent
  }
};
</script>
