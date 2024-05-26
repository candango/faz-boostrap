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

import { FazBsElementItem } from "../../bs-item"
import { FazBsNavbarBrand } from "./navbar-brand"
import { FazBsNavbarToggler } from "./navbar-toggler"

 
export default class FazBsNavbarElement extends FazBsElementItem {

    // private _class: string = ""
    private navContainer: HTMLElement
    private divContainer: HTMLDivElement

    constructor() {
        super()
        this.navContainer = document.createElement("nav")
        this.divContainer = document.createElement("div")

        // for (let attribute of this.attributes) {
        //     switch (attribute.name.toLowerCase()) {
        //         case "classnames":
        //             this._class = attribute.value
        //             break
        //     }
        // }
    }

    get classNames() {
        const classes = ["navbar"]
        if (this.extraClasses) {
            classes.push(this.extraClasses)
        }
        if (this.kind) {
            classes.push(this.kind)
        }
        return classes.join("")
    }

    get contentChild() {
        return this.children[0].firstChild
    }

    renderNav(element: HTMLElement) {
        this.divContainer.setAttribute("class", "container-fluid")
        this.divContainer.setAttribute("id", `div-container-${this.id}`)
        element.appendChild(this.divContainer)
    }

    show() {
        this.navContainer.setAttribute("class", "faz-bs-navbar-container")
        this.navContainer.setAttribute("id", `nav-container-${this.id}`)
        // this.navContainer.onmouseover = (e) => this.beOverMe(e)
        // this.navContainer.onmouseleave = (e) => this.leaveMe(e)
        this.appendChild(this.navContainer)
        this.renderNav(this.navContainer)
    }
}

customElements.define("faz-bs-navbar", FazBsNavbarElement)
customElements.define("faz-bs-navbar-brand", FazBsNavbarBrand)
customElements.define("faz-bs-navbar-toggler", FazBsNavbarToggler)
