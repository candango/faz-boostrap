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

import { FazElementItem } from "faz/src"
import { JSX } from "solid-js/jsx-runtime"
import { render } from "solid-js/web";
 
export class FazBsNavbarBrand extends FazElementItem {

    private brand: JSX.Element;

    constructor() {
        super()
    }

    get classNames() {
        let classes = ["navbar-brand"]
        if (this.linkIsVoid) {
            classes.push("mb-0")
            classes.push("h1")
        }
        return classes.join(" ")
    }

    renderBrand(): JSX.Element {
        this.brand = <a id={`faz-bs-navbar-brand-${this.id}`} class={this.className}></a>;
        if (this.linkIsVoid) {
            this.brand = <span id={`faz-bs-navbar-brand-${this.id}`} class={this.className}></span>;
        }
        return this.brand;
    }

    show() {
        render(() => this.renderBrand(), this);
    }
}