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
import { FazBsGridHead } from "./grid-head";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsGridRow extends FazBsElement {

    private rowItem: JSX.Element;

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

    get isHead() {
        if (!(this.parent() instanceof FazBsGridHead)) {
            return true;
        }
        return true;
    }

    get classNames() {
        let classes = [""];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        return classes.join(" ");
    }

    show() {
        this.rowItem = <tr id={`faz-bs-row-${this.id}`} class={this.classNames} ></tr>;
        render(() => this.rowItem, this);
    }
}
