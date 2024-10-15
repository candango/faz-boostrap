/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 *
 * See: https://getbootstrap.com/docs/5.3/customize/color-modes/#dark-mode
 */

// See: https://stackoverflow.com/a/59499895/2887989

import { Accessor, createSignal, createEffect, Setter } from "solid-js";

declare global {
    interface Window {
        getStoredTheme: () => string | null;
        setStoredTheme: (theme: string) => void;
        getPreferredTheme: () => string;
        theme: Accessor <string | undefined>;
        setTheme: Setter <string | undefined>;
    } 
}

[window.theme, window.setTheme] = createSignal<string|undefined>(undefined);

window.getStoredTheme = () => localStorage.getItem("theme");
window.setStoredTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    window.setTheme(theme);
}

window.getPreferredTheme = () => {
    const storedTheme = window.getStoredTheme();
    if (storedTheme) {
        return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

createEffect(() => {
    if (!window.theme() || window.theme()==="auto") {
        document.documentElement.setAttribute('data-bs-theme', window.getPreferredTheme());
        return;
    }
    document.documentElement.setAttribute('data-bs-theme', window.theme() as string);
}, undefined);
