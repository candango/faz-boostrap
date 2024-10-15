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
import { createEffect } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsBreadcrumbItem extends FazBsElementItem {

    private itemLi: JSX.Element;
    private itemA: JSX.Element;
    private itemSpam: JSX.Element;

    get aClassNames() {
        let classes = [];
        if (this.linkIsVoid) {
            classes.push("d-none");
        }
        return classes.join(" ");
    }

    get spamClassNames() {
        let classes = [];
        if (!this.linkIsVoid) {
            classes.push("d-none");
        }
        return classes.join(" ");
    }

    get classNames() {
        let classes = ["breadcrumb-item"];
        if (this.active()) {
            classes.push("active");
        }
        return classes.join(" ");
    }

    get contentChild() {
        if (this.linkIsVoid) {
            return this.itemSpam as ChildNode;
        } 
        return this.itemA as ChildNode;
    }

    get isEdge(): boolean {
        const parent = this.parent();
        if (parent === undefined) {
            return false;
        }
        return parent?.items()[parent?.items()?.length-1] === this;
    }

    private ariaCurrentValue(): "page"|undefined {
        if (this.isEdge) {
            return "page";
        }
        return undefined;
    }

    afterShow(): void {
        createEffect((orig) => {
            if (orig != this.link()){
                let itemOrig = this.itemSpam as ChildNode;
                let itemTarget = this.itemA as ChildNode;
                if (this.linkIsVoid) {
                    itemOrig = this.itemA as ChildNode;
                    itemTarget = this.itemSpam as ChildNode;
                }
                if (itemOrig.firstChild != null) {
                    while(itemOrig.firstChild) {
                        itemTarget.appendChild(itemOrig.firstChild);
                    }
                }
            }
        }, this.link());
    }

    show() {
        this.itemA = <a class={this.aClassNames} href={this.link()}></a>;
        this.itemSpam = <span class={this.spamClassNames}></span>;
        this.itemLi = <li 
               id={`faz-bs-breadcrumb-item-${this.id}`}
               class={this.classNames}
               aria-current={this.ariaCurrentValue()}
               aria-label="breadcrumb">
               {this.itemA}{this.itemSpam}
               </li>;
        render(() => this.itemLi, this);
    }
}
