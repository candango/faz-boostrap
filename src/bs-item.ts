/**
 * Copyright 2018-2024 Flavio Garcia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FazElementItem } from "faz";


export class FazBsElementItem extends FazElementItem {

    private _kind: string | null = "primary";
    private _target: string | null = null;
    private _theme: string | null = null;

    constructor() {
        super();
        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "kind":
                    this.kind = attribute.value.toLowerCase();
                    break;
                case "target":
                    this.target = attribute.value;
                    break;
                case "theme":
                    this.theme = attribute.value;
                    break;
            }
        }
    }

    get kind(): string | null {
        return this._kind;
    }

    set kind(value: string | null) {
        if (this._kind !== value) {
            const oldValue = this._kind;
            this._kind = value;
            if (!this.loading) {
                const e = this.createEvent("kindChanged", value, oldValue);
                this.dispatchEvent(e);
                this.onKindChange(e);
            }
        }
    }

    onKindChange(e: Event) { }

    get target(): string | null {
        return this._target;
    }

    set target(value: string | null) {
        if (this._target !== value) {
            const oldValue = this._target;
            this._target = value;
            if (!this.loading) {
                const e = this.createEvent("targetChanged", value, oldValue);
                this.dispatchEvent(e);
                this.onTargetChange(e);
            }
        }
    }

    onTargetChange(e: Event) { }

    get theme(): string | null {
        return this._theme;
    }

    set theme(value: string | null) {
        if (this._theme !== value) {
            const oldValue = this._theme;
            this._theme = value;
            if (!this.loading) {
                const e = this.createEvent("themeChanged", value, oldValue);
                this.dispatchEvent(e);
                this.onThemeChange(e);
            }
        }
    }

    onThemeChange(e: Event) { }
}
