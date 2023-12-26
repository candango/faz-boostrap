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

import { FazElementItem, toBoolean } from "faz";


export default class FazBsNavTabElement extends FazElementItem {

    private _fade: boolean = false;
    
    private navTabContainer: HTMLElement;

    constructor() {
        super();
        this.navTabContainer = document.createElement("div");
        for (let attribute of this.attributes) {
            switch (attribute.name) {
                case "fade":
                    this._fade = toBoolean(attribute.value);
                    break;
            }
        }
    }

    get fade(): boolean {
        return this._fade;
    }

    set fade(value: boolean) {
        if (this._fade !== value) {
            const oldValue = this._fade;
            this._fade = value;
            if (!this.loading) {
                const e = this.createEvent("fadeChanged", value, oldValue);
                this.dispatchEvent(e);
                this.onFadeChanged(e);
            }
        }
    }

    onFadeChanged(e: Event) {}

    get ariaLabelledby() {
        let labelledby = "";
        this.parent?.items.forEach((item) => {
            if (this.id === item.link) {
                labelledby = item.id;
                return;
            }
        });
        return labelledby;
    }

    get classNames() {
        let classes = ["tab-pane"];
        if (this.fade) {
            classes.push("fade");
            if (this.active) {
                classes.push("show");
            }
        }
        if (this.active) {
            classes.push("anchor");
            classes.push("active");
        }
        return classes.join(" ");
    }

    show() {
        this.navTabContainer.setAttribute("class", this.classNames);
        this.navTabContainer.setAttribute("id", `nav_tab_container${this.id}`);
        this.navTabContainer.setAttribute("role", "tabpanel");
        this.navTabContainer.setAttribute("aria-labelledby",
            this.ariaLabelledby);
        this.appendChild(this.navTabContainer);
    }
}
