// src/composables/useTelegramPlatform.js
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

export function useTelegramPlatform() {
    const getInitialPlatform = () => {
        // If this code runs in a non-browser context, default to desktop-safe
        if (typeof window === "undefined") return "web";

        const tg = window.Telegram?.WebApp;
        if (tg?.platform) return tg.platform;

        const isDesktopByPointer = window.matchMedia?.("(pointer:fine)")?.matches ?? false;
        const isDesktopByWidth = window.matchMedia?.("(min-width: 769px)")?.matches ?? false;

        return (isDesktopByPointer || isDesktopByWidth) ? "web" : "mobile";
    };

    const platform = ref(getInitialPlatform());


    const DESKTOP_PLATFORMS = new Set(["tdesktop", "web", "macos", "windows", "linux"]);
    const MOBILE_PLATFORMS = new Set(["android", "ios", "iphone", "ipad", "mobile"]);

    const detectPlatform = () => {
        //const tg = window.Telegram?.WebApp;

        // Inside Telegram
        // if (tg?.platform) {
        //     platform.value = tg.platform; // android | ios | tdesktop | web | ...
        //     return;
        // }

        // Browser fallback (Chrome/Safari/etc.)
        const isDesktopByPointer = window.matchMedia?.("(pointer:fine)")?.matches ?? false;
        const isDesktopByWidth = window.matchMedia?.("(min-width: 769px)")?.matches ?? false;

        platform.value = (isDesktopByPointer || isDesktopByWidth) ? "web" : "mobile";
    };

    // Важливо: виклик одразу, щоб у браузері не висіло "unknown" до mounted
    onMounted(() => {
        detectPlatform();
        window.addEventListener("resize", detectPlatform);
    });
    onBeforeUnmount(() => window.removeEventListener("resize", detectPlatform));

    const isDesktop = computed(() => {
        const p = platform.value;
        if (DESKTOP_PLATFORMS.has(p)) return true;
        if (MOBILE_PLATFORMS.has(p)) return false;

        // якщо прилетіло щось нове/невідоме - для браузера безпечніше вважати desktop
        return true;
    });

    return { platform, isDesktop };
}