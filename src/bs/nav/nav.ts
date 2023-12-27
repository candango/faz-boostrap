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
import { FazBsCollapse } from "../collapse/collapse";
import FazBsNavItemElement from "./nav-item";
import FazBsNavItemContentElement from "./nav-item-content";
import FazBsNavTabElement from "./nav-tab";
import FazBsNavBar from "../navbar/navbar";

 
export default class FazBsNavElement extends FazElementItem {

    private _fill: boolean = false;
    private _justify: string = "";
    private _pills: boolean = false;
    private _vertical: boolean = false;
    private _tabClasses: string = "";
   
    private navContainer: HTMLDivElement;
    private navUl: HTMLUListElement;
    private tabContainer: HTMLDivElement;

    public current: FazBsNavItemElement | undefined;

    private timeout: NodeJS.Timeout | undefined;

    constructor() {
        super();
        this.navContainer = document.createElement("div");
        this.navUl = document.createElement("ul");
        this.tabContainer = document.createElement("div");

        for (let attribute of this.attributes) {
            switch (attribute.name) {
                case "fill":
                    this._fill = toBoolean(attribute.value);
                    break;
                case "justify":
                    this._justify = attribute.value;
                    break;
                case "pills":
                    this._pills = toBoolean(attribute.value);
                    break;
                case "vertical":
                    this._vertical = toBoolean(attribute.value);
                    break;
            }
        }

    }


    get fill(): boolean {
        return this._fill;
    }

    set fill(value: boolean) {
        if (this._fill !== value) {
            const oldValue = this._fill;
            this._fill = value;
            if (!this.loading) {
                const e = this.createEvent("fillchange", value, oldValue);
                this.dispatchEvent(e);
                this.onFillChange(e);
            }
        }
    }

    onFillChange(e: Event) {}

    get justify(): string {
        return this._justify;
    }

    set justify(value: string) {
        if (this._justify !== value) {
            const oldValue = this._justify;
            this._justify = value;
            if (!this.loading) {
                const e = this.createEvent("justifychange", value, oldValue);
                this.dispatchEvent(e);
                this.onJustifyChange(e);
            }
        }
    }

    onJustifyChange(e: Event) {}

    get pills(): boolean {
        return this._pills;
    }

    set pills(value: boolean) {
        if (this._pills !== value) {
            const oldValue = this._pills;
            this._pills = value;
            if (!this.loading) {
                const e = this.createEvent("pillschange", value, oldValue);
                this.dispatchEvent(e);
                this.onPillsChange(e);
            }
        }
    }

    onPillsChange(e: Event) {}

    get vertical(): boolean {
        return this._vertical;
    }

    set vertical(value: boolean) {
        if (this._vertical !== value) {
            const oldValue = this._vertical;
            this._vertical = value;
            if (!this.loading) {
                const e = this.createEvent("verticalchange", value, oldValue);
                this.dispatchEvent(e);
                this.onVerticalChange(e);
            }
        }
    }

    onVerticalChange(e: Event) {}

    get activeNavItem() {
        let active: FazBsNavItemElement | null = null;
        this.navItemItemsActive.forEach(item => {
            active = item as FazBsNavItemElement;
            return active;
        });
        return active;
    }

    get contentChild() {
        return this.navUl;
    }

    get tabContentChild() {
        return this.tabContainer;
    }

    get classNames() {
        const classes = [ "nav" ];
        if (this.parent instanceof FazBsNavBar) {
            classes[0] = "navbar-nav";
        }
        if (this.parent instanceof FazBsCollapse &&
            this.parent?.parent instanceof FazBsNavBar) {
            classes[0] = "navbar-nav";
        }
        if (this.disabled) {
            classes.push("disabled");
        }
        if (this.pills) {
            classes.push("nav-pills");
        }
        if (this.fill) {
            classes.push("nav-fill");
        }
        if (this.justify === "center") {
            classes.push("justify-content-center");
        }
        if (this.justify === "right") {
            classes.push("justify-content-end");
        }
        if (this.hasTabs) {
            classes.push("nav-tabs");
        }
        if (this.vertical) {
            classes.push("flex-column");
        }  
        return classes.join(" ");
    }

    get hasTabs() {
        return this.tabItems.length > 0;
    }

    get navItemItems() {
        return this.items.filter(item => {
            return item instanceof FazBsNavItemElement;
        });
    }

    get navItemItemsActive() {
        const items = this.items;
        return items.filter(item => {
            return item instanceof FazBsNavItemElement && item.active;
        });
    }

    get onEdge() {
        if(this.current) {
            return !this.current?.isDropdown;
        }
        return false;
    }

    get tabClassNames() {
        const classes = [ "tab-content" ];
        if (!this.hasTabs) {
            classes.push("invisible");
        }
        return classes.join(" ");
    }

    get tabItems() {
        return this.items.filter(item => {
            return item instanceof FazBsNavTabElement;
        });
    }

    addChild<T extends Node>(node: T): T {
        if (this.hasTabs && this.vertical) {
            if (node instanceof FazBsNavTabElement) {
                this.tabContainer.appendChild(node);
                return node;
            }
            this.children[0].children[0].firstChild?.appendChild(node);
            return node;
        }
        if (node instanceof FazBsNavTabElement) {
            this.tabContainer.appendChild(node);
            return node;
        }
        this.contentChild?.appendChild(node);
        return node; 
    }

    beOverMe(_: Event) {
        clearTimeout(this.timeout);
    }

    leaveMe(_: Event) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.activeItems.forEach(item => {
                const navItem = item as FazBsNavItemElement;
                if (navItem.isDropdown && !this.onEdge) {
                    navItem.deactivate();
                }
            })
        }, 250);
    }

    renderNav(element: HTMLElement) {
        this.navUl.setAttribute("class", this.classNames);
        this.navUl.setAttribute("role", "tablist");
        this.navUl.setAttribute("id", `nav${this.id}`);
        element.appendChild(this.navUl);
    }

    renderTabs(element: HTMLElement) {
        this.tabContainer.setAttribute("class", this.tabClassNames);
        element.appendChild(this.tabContainer);
    }

    show() {
        this.navContainer.setAttribute("class", "faz-nav-container");
        this.navContainer.setAttribute("id", `nav-container${this.id}`);
        this.navContainer.onmouseover = (e) => this.beOverMe(e);
        this.navContainer.onmouseleave = (e) => this.leaveMe(e);
        this.appendChild(this.navContainer);
        if (this.hasTabs && this.vertical) {
            this.navContainer.setAttribute("class",
                                           "d-flex align-items-start");
            this.renderNav(this.navContainer);
            this.tabContainer.setAttribute("class", "tab-content");
            this.renderTabs(this.navContainer);
            return
        }
        this.renderNav(this.navContainer);
        if (this.hasTabs) {
            this.renderTabs(this);
        }
        // if (this.hasTabs && this.vertical) {
        //     render(() => <div onMouseOver={(e) => this.beOverMe(e)}
        //         onMouseLeave={(e) => this.leaveMe(e)}
        //         class="faz-nav-container row" id={`nav-container${this.id}`}>
        //             <div class="col-3">
        //                 {this.renderNav()}
        //             </div>
        //             <div class="col-9">
        //                 <div class="tab-content">
        //                     {this.renderTabs()}
        //                 </div>
        //             </div>
        //         </div>, this);
        //     return;
        // }
        // render(() => <div onMouseOver={(e) => this.beOverMe(e)}
        //     onMouseLeave={(e) => this.leaveMe(e)}
        //     class="faz-nav-container" id={`nav-container${this.id}`}>
        //     {this.renderNav()}
        //     {this.hasTabs ? this.renderTabs() : ""}
        // </div>, this);
    }

    afterShow(children:Node[]) {
        super.afterShow(children);
        if (this.loading && this.hasTabs) {
            if (this.activeNavItem === null) {
                (this.navItemItems[0] as FazBsNavItemElement).active =
                    true;
            }
            (this.navItemItemsActive[0] as FazBsNavItemElement).activate();
        }
    }
}

customElements.define("faz-bs-nav", FazBsNavElement);
customElements.define("faz-bs-nav-item", FazBsNavItemElement);
customElements.define("faz-bs-nav-tab", FazBsNavTabElement);
customElements.define("faz-bs-nav-item-content", FazBsNavItemContentElement)
