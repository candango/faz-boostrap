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

import { FazBsElementItem } from "../../bs-item";
import { FazBsBreadcrumbItem } from "./breadcrumb-item";


export class FazBsBreadcrumb extends FazBsElementItem {

    private itemNav: HTMLElement;
    private itemOl: HTMLOListElement;

    constructor() {
        super();
        this.itemNav = document.createElement("nav");
        this.itemOl = document.createElement("ol");
    }

    get classNames() {
        let classes = ["breadcrumb"];
        return classes.join(" ");
    }

    get contentChild() {
        return this.itemOl;
    }

    show() {
        this.itemNav.setAttribute("id", `faz-bs-breadcrumb-${this.id}`);
        this.itemNav.setAttribute("aria-label", "breadcrumb");
        this.itemOl.setAttribute("class", this.classNames);
        this.itemNav.appendChild(this.itemOl);
        this.appendChild(this.itemNav);
        this.classList.add("faz-bs-breadcrumb-rendered");
    }
}

customElements.define("faz-bs-breadcrumb", FazBsBreadcrumb);
customElements.define("faz-bs-breadcrumb-item", FazBsBreadcrumbItem);
