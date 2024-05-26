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


export class FazBsBreadcrumbItem extends FazBsElementItem {

    private itemLi: HTMLLIElement
    private itemA: HTMLAnchorElement

    constructor() {
        super()
        this.itemLi = document.createElement("li")
        this.itemA = document.createElement("a")
    }

    get classNames() {
        let classes = ["breadcrumb-item"]
        if (this.active) {
            classes.push("active")
        }
        return classes.join(" ")
    }

    get contentChild() {
        if (this.linkIsVoid) {
            return this.itemLi
        } 
        return this.itemA
    }

    get isEdge() {
        return this.parent?.items[this.parent?.items.length-1] === this
    }

    show() {
        this.itemLi.setAttribute("class", this.classNames)
        this.itemLi.setAttribute("id", `faz-bs-breadcrumb-item-${this.id}`)
        if (this.isEdge) {
            this.itemLi.setAttribute("aria-current", "page")
        }
        if (!this.linkIsVoid) {
            this.itemA.setAttribute("href", this.link)
            this.itemLi.appendChild(this.itemA)
        }
        this.parent?.contentChild?.appendChild(this.itemLi)
        this.classList.add("faz-bs-breadcrumb-item-rendered")
    }
}

