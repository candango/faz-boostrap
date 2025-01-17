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


export class FazBsBadge extends FazBsElement {

    private badgeItem: JSX.Element;

    get classNames() {
        let classes = ["badge"];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        if (this.kind()) {
            classes.push(`text-bg-${this.kind()}`);
        }
        return classes.join(" ");
    }

    renderBadge(): JSX.Element {
        if (this.linkIsVoid) {
            this.badgeItem = <span id={`faz-bs-badge-${this.id}`} class={this.classNames}></span>;
            return this.badgeItem;
        }
        this.badgeItem = <a id={`faz-bs-badge-${this.id}`} href={this.link()} class={this.classNames}></a>;
        return this.badgeItem;
    }

    show() {
        render(() => this.renderBadge(), this);
    }
}

customElements.define("faz-bs-badge", FazBsBadge);
