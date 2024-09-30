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
import { FazBsCollapse } from "../collapse/collapse";
import FazBsNavItemElement from "./nav-item";
import FazBsNavItemContentElement from "./nav-item-content";
import FazBsNavTabElement from "./nav-tab";
import FazBsNavBar from "../navbar/navbar";
import { FazElementItem, toBoolean } from "faz";
import { Accessor, createSignal, Setter } from "solid-js";
import { render } from "solid-js/web";
import { JSX } from "solid-js/jsx-runtime";

 
export default class FazBsNavElement extends FazBsElementItem {

    public fill: Accessor<boolean>;
    public setFill: Setter<boolean>;
    public justify: Accessor<string>;
    public setJustify: Setter<string>;
    public pills: Accessor<boolean>;
    public setPills: Setter<boolean>;
    public vertical: Accessor<boolean>;
    public setVertical: Setter<boolean>;
    private _tabClasses: string = "";
   
    private navContainer: JSX.Element;
    private navUl: JSX.Element;
    private tabContainer: JSX.Element;

    public current: FazBsNavItemElement | undefined;

    private timeout: NodeJS.Timeout | undefined;

    constructor() {
        super();

        [this.fill, this.setFill] = createSignal<boolean>(false);
        [this.justify, this.setJustify] = createSignal<string>("");
        [this.pills, this.setPills] = createSignal<boolean>(false);
        [this.vertical, this.setVertical] = createSignal<boolean>(false);

        for (let attribute of this.attributes) {
            switch (attribute.name) {
                case "fill":
                    this.setFill(toBoolean(attribute.value));
                    break;
                case "justify":
                    this.setJustify(attribute.value);
                    break;
                case "pills":
                    this.setPills(toBoolean(attribute.value));
                    break;
                case "vertical":
                    this.setVertical(toBoolean(attribute.value));
                    break;
            }
        }
    }

    get activeNavItem() {
        let active: FazBsNavItemElement | null = null;
        this.navItemItemsActive.forEach(item => {
            active = item as FazBsNavItemElement;
            return active;
        })
        return active;
    }

    get contentChild() {
        return this.navUl as ChildNode;
    }

    get tabContentChild() {
        return this.tabContainer as ChildNode;
    }

    get classNames() {
        const classes = [ "nav" ];
        if (this.parent instanceof FazBsNavBar) {
            classes[0] = "navbar-nav";
        }
        if (this.parent() instanceof FazBsCollapse &&
            this.parent()?.parent() as unknown as FazElementItem instanceof FazBsNavBar) {
            classes[0] = "navbar-nav";
        }
        if (this.disabled()) {
            classes.push("disabled");
        }
        if (this.pills()) {
            classes.push("nav-pills");
        }
        if (this.fill()) {
            classes.push("nav-fill");
        }
        const justify = this.justify();
        if (justify === "center") {
            classes.push("justify-content-center");
        }
        if (justify === "right") {
            classes.push("justify-content-end");
        }
        if (this.hasTabs) {
            classes.push("nav-tabs");
        }
        if (this.vertical()) {
            classes.push("flex-column");
        }  
        return classes.join(" ");
    }

    get hasTabs() {
        return this.tabItems.length > 0;
    }

    get navItemItems() {
        return this.items().filter(item => {
            return item instanceof FazBsNavItemElement;
        })
    }

    get navItemItemsActive() {
        const items = this.items();
        return items.filter(item => {
            return item instanceof FazBsNavItemElement && item.active;
        })
    }

    get onEdge() {
        if(this.current) {
            return !this.current?.isDropdown;
        }
        return false;
    }

    get navClassNames() {
        const classes = ["faz-nav-container"];
        if (this.hasTabs && this.vertical()) {
            classes.push("d-flex");
            classes.push("align-items-start");
        }
        return classes.join(" ");
    }

    get tabClassNames() {
        const classes = ["tab-content"];
        if (!this.hasTabs) {
            classes.push("invisible");
        }
        return classes.join(" ");
    }

    get tabItems() {
        return this.items().filter(item => {
            return item instanceof FazBsNavTabElement;
        })
    }

    addChild<T extends Node>(node: T): T {
        if (this.hasTabs && this.vertical()) {
            if (node instanceof FazBsNavTabElement) {
                (this.tabContainer as HTMLElement).appendChild(node);
                return node;
            }
            this.children[0].children[0].firstChild?.appendChild(node);
            return node;
        }
        if (node instanceof FazBsNavTabElement) {
            (this.tabContainer as HTMLElement).appendChild(node);
            return node;
        }
        (this.contentChild as HTMLElement).appendChild(node);
        return node ;
    }

    beOverMe(fazNav: FazBsNavElement, _: Event) {
        clearTimeout(fazNav.timeout);
    }

    leaveMe(fazNav: FazBsNavElement, _: Event) {
        clearTimeout(fazNav.timeout);
        fazNav.timeout = setTimeout(() => {
            fazNav.activeItems.forEach(item => {
                const navItem = item as FazBsNavItemElement;
                if (navItem.isDropdown && !fazNav.onEdge) {
                    navItem.deactivate();
                }
            });
        }, 250);
    }

    renderNav() {
        this.navUl = <ul id={`nav${this.id}`} class={this.classNames} role="tablist"></ul>;
        return this.navUl;
    }

    renderTabs() {
        if (this.hasTabs) {
            this.tabContainer = <div class={this.tabClassNames}></div>;
            return this.tabContainer;
        }
    }

    show() {
        this.navContainer = <div
            id={`nav-container${this.id}`}
            class={this.navClassNames}
            onmouseover={[this.beOverMe, this]}
            onmouseleave={[this.leaveMe, this]}
        >{this.renderNav()}{this.renderTabs()}</div>;
        render(() => this.navContainer, this);
    }

    placeBackChildren(children:Node[]) {
        super.placeBackChildren(children);
        if (this.loading() && this.hasTabs) {
            if (this.activeNavItem === null) {
                (this.navItemItems[0] as FazBsNavItemElement).setActive(true);
            }
            (this.navItemItemsActive[0] as FazBsNavItemElement).activate();
        }
    }
}

customElements.define("faz-bs-nav", FazBsNavElement);
customElements.define("faz-bs-nav-item", FazBsNavItemElement);
customElements.define("faz-bs-nav-tab", FazBsNavTabElement);
customElements.define("faz-bs-nav-item-content", FazBsNavItemContentElement);
