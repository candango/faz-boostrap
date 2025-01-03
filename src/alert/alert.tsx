/**
 * Copyright 2018-2025 Flavio Garcia
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

import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsAlert extends FazBsElement {

    private alertItem: JSX.Element;

    constructor() {
        super();
        if (this.kind() === undefined) {
            this.setKind("primary");
        }
    }

    get classNames() {
        let classes = ["alert"];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        if (this.kind()) {
            classes.push(`alert-${this.kind()}`);
        }
        return classes.join(" ");
    }

    show() {
        this.alertItem = <div role="alert" id={`faz-bs-alert-${this.id}`} class={this.classNames}>{this.content()}</div>;
        render(() => this.alertItem, this);
    }
}

customElements.define("faz-bs-alert", FazBsAlert);
