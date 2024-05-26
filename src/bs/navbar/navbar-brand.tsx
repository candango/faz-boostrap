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

import { FazElementItem } from "faz"

 
export class FazBsNavbarBrand extends FazElementItem {

    private elBrand: HTMLElement

    constructor() {
        super()
        if (this.linkIsVoid) {
            this.elBrand = document.createElement("span")
        } else {
            this.elBrand = document.createElement("a")
        }
    }

    get classNames() {
        let classes = ["navbar-brand"]
        if (this.linkIsVoid) {
            classes.push("mb-0")
            classes.push("h1")
        }
        return classes.join(" ")
    }

    show() {
        this.elBrand.setAttribute("class", this.classNames)
        this.elBrand.setAttribute("id", `navbar-brand-${this.id}`)
        this.appendChild(this.elBrand)
    }
}
