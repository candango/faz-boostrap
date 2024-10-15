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

import { FazBsElementItem } from "../bs-item"

export class FazBsCollapse extends FazBsElementItem {

    public divCollapse: HTMLDivElement

    constructor() {
        super()
        this.divCollapse = document.createElement("div")
    }

    get classNames() {
        let classes = ["collapse"]
        if (this.parent?.tagName.toLowerCase().startsWith("faz-bs-navbar")) {
            classes.push("navbar-collapse")
        }
        return classes.join(" ")
    }

    show() {
        this.divCollapse.setAttribute("class", this.classNames)
        this.divCollapse.setAttribute("id", this.id)
        this.appendChild(this.divCollapse)
    }
}

customElements.define("faz-bs-collapse", FazBsCollapse)
