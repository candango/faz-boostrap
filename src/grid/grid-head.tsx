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

import { FazBsElementItem } from "../bs-item";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsGridHead extends FazBsElementItem {

    private headItem: JSX.Element;

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
        let classes = [""];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        return classes.join(" ");
    }

    show() {
        this.headItem = <thead id={`faz-bs-head-${this.id}`} class={this.classNames}></thead>;
        render(() => this.headItem, this);
    }
}
