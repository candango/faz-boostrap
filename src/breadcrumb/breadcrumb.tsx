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
import { FazBsBreadcrumbItem } from "./breadcrumb-item";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsBreadcrumb extends FazBsElement {

    private itemOl: JSX.Element;

    get classNames() {
        let classes = ["breadcrumb"];
        return classes.join(" ");
    }

    get contentChild() {
        return this.itemOl as ChildNode;
    }

    show() {
        this.itemOl = <ol class={this.classNames}></ol>;
        render(() => <nav id={`faz-bs-breadcrumb--${this.id}`}
               aria-label="breadcrumb">
               {this.itemOl} 
            </nav>, this);
        this.classList.add("faz-bs-breadcrumb-rendered");
    }
}

export { FazBsBreadcrumbItem } from "./breadcrumb-item";

customElements.define("faz-bs-breadcrumb", FazBsBreadcrumb);
customElements.define("faz-bs-breadcrumb-item", FazBsBreadcrumbItem);
