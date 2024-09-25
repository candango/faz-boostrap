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
import { MountableElement, render } from "solid-js/web"
import { JSX } from "solid-js/jsx-runtime"


export class FazBsBreadcrumbItem extends FazBsElementItem {

    private itemLi: JSX.Element
    private itemA: JSX.Element

    constructor() {
        super()
    }

    get classNames() {
        let classes = ["breadcrumb-item"]
        if (this.active()) {
            classes.push("active")
        }
        return classes.join(" ")
    }

    get contentChild() {
        if (this.linkIsVoid) {
            return this.itemLi as ChildNode
        } 
        return this.itemA as ChildNode
    }

    get isEdge() {
        return this.parent?.items[this.parent?.items.length-1] === this
    }

    get ariaCurrentAttr(): "page"|undefined {
        if (this.isEdge) {
            return "page"
        }
        return undefined
    }

    show() {
        this.itemA = <a href={this.link}></a>
        this.itemLi = <li 
               id={`faz-bs-breadcrumb-item-${this.id}`}
               class={this.classNames}
               aria-current={this.ariaCurrentAttr}
               aria-label="breadcrumb">
               {this.itemA}
               </li>
        render(() => this.itemLi, this.parentElement as MountableElement)
        this.classList.add("faz-bs-breadcrumb-item-rendered")
    }
}

