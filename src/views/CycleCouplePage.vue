<template>
  <div>
    <div class="container-tittle">
      <p>
        Цикл пари
      </p>
      <hr class="hr_title">
    </div>
    <div class="container-cycle-couple">
      <div v-if="!mainClientAnswers.length && !partnerClientAnswers.length" class="no-cycle-message">
        <p>Цикл пари ще не заповнений психологом, завітайте пізніше 🤍</p>
      </div>
      <div v-else class="client-section">
        <div class="client-header">
          <img src="@/assets/photo/TG-interface-heart-1.png" alt="Heart Icon" class="heart-icon">
        </div>
        <div class="client-body">
          <table class="client-table">
            <tbody>
            <tr class="cients-line">
              <td class="client-ones">
                <span>{{ mainClientName }}</span>
                <img src="@/assets/photo/client-img.png" alt="clientphoto">
              </td>
              <td class="client-ones border-dashed-left">
                <span>{{ partnerClientName }}</span>
                <img src="@/assets/photo/client-img-1.png" alt="clientphoto">
              </td>
            </tr>
            <!-- Iterate over the questions and answers -->
            <template v-for="(question, index) in mainClientAnswers" :key="'question-answer-group-' + index">
              <tr class="border-dashed">
                <td class="field-title padding-right">{{ question.form_item_field_name }}</td>
                <td class="field-title border-dashed-left padding-left">
                  {{ partnerClientAnswers[index]?.form_item_field_name || question.form_item_field_name }}
                </td>
              </tr>
              <tr class="padding-bottom">
                <td class="field-content padding-right">{{ question.text_answer }}</td>
                <td class="field-content border-dashed-left padding-left">{{ partnerClientAnswers[index]?.text_answer }}</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="error-messages" v-if="errors.length">
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import apiService from "@/services/apiService";
import M from "materialize-css";

export default {
  name: "CycleCouple",
  setup() {
    const errors = ref([]);
    const mainClientAnswers = ref([]);
    const partnerClientAnswers = ref([]);
    const mainClientName = ref("");
    const partnerClientName = ref("");

    const fetchCycleCouple = async () => {
      //const telegramID = localStorage.getItem('telegram_user_id');
      const telegramID = 6112401748;
      try {
        const response = await apiService.getCycleCouple(telegramID);
        const data = response.data.data;

        if (data.main_client_couple_cycle) {
          mainClientAnswers.value = data.main_client_couple_cycle.answers;
          mainClientName.value = data.main_client_name; // Set main client name
        }

        if (data.partner_client_couple_cycle) {
          partnerClientAnswers.value = data.partner_client_couple_cycle.answers;
          partnerClientName.value = data.partner_name; // Set partner client name
        }
      } catch (error) {
        if (error.response && error.response.status === 502) {
          M.toast({ html: 'Помилка завантаження циклу пари' });
        } else {
          console.error("Error fetching cycle couple data:", error);
          //errors.value.push("Помилка при завантаженні даних циклу пари");
        }
      }
    };

    onMounted(fetchCycleCouple);

    return {
      errors,
      mainClientAnswers,
      partnerClientAnswers,
      mainClientName,
      partnerClientName,
    };
  },
};
</script>

