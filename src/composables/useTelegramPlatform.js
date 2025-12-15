// Перевіряємо тип платформи з якої користувач відкриває наш miniapps
import { ref, computed, onMounted } from "vue";

export function useTelegramPlatform() {
    const platform = ref("unknown");

    onMounted(() => {
        const tg = window.Telegram?.WebApp;
        platform.value = tg?.platform || "unknown"; // android | ios | tdesktop | web | ...
    });

    const isDesktop = computed(() => ["tdesktop", "web"].includes(platform.value));
    return { platform, isDesktop };
}