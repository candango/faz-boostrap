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
import { FazBsNavbarBrand } from "./navbar-brand";
import { FazBsNavbarToggler } from "./navbar-toggler";
import { FazBsNavbarCollapse } from "./navbar-collapse";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

 
export class FazBsNavbar extends FazBsElementItem {

    // private _class: string = ""
    private container: JSX.Element;
    private nav: JSX.Element;

    get classNames() {
        const classes = ["navbar"];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        if (this.kind()) {
            classes.push(this.kind() as string);
        }
        return classes.join(" ");
    }

    get contentChild() {
        return this.container as ChildNode;
    }

    renderContainer(): JSX.Element {
        this.container = <div id={`navbar-container-${this.id}`} class="container-fluid"></div>;
        return this.container;
    }

    show() {
        this.nav = <nav id={`navbar-${this.id}`} class={this.classNames}>{this.renderContainer()}</nav>;
        render(() => this.nav, this);
    }
}

customElements.define("faz-bs-navbar", FazBsNavbar);
customElements.define("faz-bs-navbar-brand", FazBsNavbarBrand);
customElements.define("faz-bs-navbar-toggler", FazBsNavbarToggler);
customElements.define("faz-bs-navbar-collapse", FazBsNavbarCollapse);
