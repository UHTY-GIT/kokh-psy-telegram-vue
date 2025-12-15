// src/composables/useTelegramPlatform.js
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

export function useTelegramPlatform() {
    const platform = ref("unknown");

    const detectPlatform = () => {
        const tg = window.Telegram?.WebApp;

        // Inside Telegram
        if (tg?.platform) {
            platform.value = tg.platform; // android | ios | tdesktop | web | ...
            return;
        }

        // Browser fallback (Chrome/Safari/etc.)
        const isDesktopByPointer = window.matchMedia?.("(pointer:fine)")?.matches ?? false;
        const isDesktopByWidth = window.matchMedia?.("(min-width: 769px)")?.matches ?? false;

        platform.value = (isDesktopByPointer || isDesktopByWidth) ? "web" : "mobile";
    };

    onMounted(() => {
        detectPlatform();
        window.addEventListener("resize", detectPlatform);
    });

    onBeforeUnmount(() => {
        window.removeEventListener("resize", detectPlatform);
    });

    const isDesktop = computed(() => ["tdesktop", "web"].includes(platform.value));

    return { platform, isDesktop };
}