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
import { FazBsGridCol } from "./grid-col";
import { FazBsGridHead } from "./grid-head";
import { FazBsGridRow } from "./grid-row";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsGrid extends FazBsElement {

    private tableItem: JSX.Element;

    constructor() {
        super();
        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "extraclasses":
                    this.setExtraClasses(attribute.value);
                    break;
            }
        }
    }

    get classNames() {
        let classes = ["table"];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        return classes.join(" ");
    }

    show() {
        this.tableItem = <table id={`faz-bs-table-${this.id}`} class={this.classNames}></table>;
        render(() => this.tableItem, this);
    }
}

customElements.define("faz-bs-grid", FazBsGrid);
customElements.define("faz-bs-grid-head", FazBsGridHead);
customElements.define("faz-bs-grid-row", FazBsGridRow);
customElements.define("faz-bs-grid-col", FazBsGridCol);
