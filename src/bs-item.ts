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

    private _kind: string|null = "primary";
    private _target: string|null = null;
    private _theme: string|null = null;

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

    get kind(): string|null {
        return this._kind;
    }

    set kind(value: string|null) {
        if (this._kind !== value) {
            const oldKind = this._kind;
            this._kind = value;
            this.onKindChange(value, oldKind);
        }
    }

    onKindChange(newValue: string|null, oldValue: string|null) {}

    get target(): string|null {
        return this._target;
    }

    set target(value: string|null) {
        if (this._target !== value) {
            const oldTarget = this._target;
            this._target = value;
            this.onTargetChange(value, oldTarget);
        }
    }

    onTargetChange(newValue: string|null, oldValue: string|null) {}

    get theme(): string|null {
        return this._theme;
    }

    set theme(value: string|null) {
        if (this._theme !== value) {
            const oldTheme = this._theme;
            this._theme = value;
            this.onThemeChange(value, oldTheme);
        }
    }

    onThemeChange(newValue: string|null, oldValue: string|null) {}
}
