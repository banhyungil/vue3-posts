import { ref } from 'vue';

const alerts = ref([]);
// composable naming convention use<>
export function useAlert() {
  // alert
  const vAlert = (message, type = 'error') => {
    alerts.value.push({ message, type });

    setTimeout(() => {
      alerts.value.shift();
    }, 2000);
  };
  const vAlertS = (message) => vAlert(message, 'success');
  return {
    alerts,
    vAlert,
    vAlertS,
  };
}
