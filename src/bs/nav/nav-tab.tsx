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

import { FazBsNav } from "./nav";
import { FazBsElementItem } from "../../bs-item";
import { toBoolean } from "faz";
import { Accessor, createSignal, Setter } from "solid-js";
import { render } from "solid-js/web";
import { JSX } from "solid-js/jsx-runtime";


export class FazBsNavTab extends FazBsElementItem {

    public fade: Accessor<boolean>;
    public setFade: Setter<boolean>;
    
    private navTabContainer: JSX.Element;

    constructor() {
        super();

        [this.fade, this.setFade] = createSignal<boolean>(false);

        for (let attribute of this.attributes) {
            switch (attribute.name) {
                case "fade":
                    this.setFade(toBoolean(attribute.value));
                    break;
            }
        }
    }

    get ariaLabelledby() {
        let labelledby = "";
        this.parent()?.items().forEach((item) => {
            if (this.id === item.link()) {
                labelledby = item.id;
                return;
            }
        });
        return labelledby;
    }

    get classNames() {
        let classes = ["tab-pane"];
        if (this.fade()) {
            classes.push("fade");
            if (this.active()) {
                classes.push("show");
            }
        }
        if (this.active()) {
            classes.push("anchor");
            classes.push("active");
        }
        return classes.join(" ");
    }

    get contentChild() {
        return this.navTabContainer as HTMLElement;
    }

    show() {
        this.navTabContainer = <div
            id={`nav_tab_container${this.id}`}
            class={this.classNames}
            role="tabpanel"
            aria-labelledby={this.ariaLabelledby}
        ></div>;
        const parent = this.parent() as unknown as FazBsNav;
        render(() => this.navTabContainer, parent.tabContentChild);
    }
}
