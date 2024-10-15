/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 *
 * See: https://getbootstrap.com/docs/5.3/customize/color-modes/#dark-mode
 */
import { Accessor, Setter } from "solid-js";
declare global {
    interface Window {
        getStoredTheme: () => string | null;
        setStoredTheme: (theme: string) => void;
        getPreferredTheme: () => string;
        theme: Accessor<string | undefined>;
        setTheme: Setter<string | undefined>;
    }
}
//# sourceMappingURL=bs-theme.d.ts.map