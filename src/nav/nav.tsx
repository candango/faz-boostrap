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
import { FazBsCollapse } from "../collapse/collapse";
import { FazBsNavItem } from "./nav-item";
import { FazBsNavItemContent } from "./nav-item-content";
import { FazBsNavTab } from "./nav-tab";
import { FazBsNavbar } from "../navbar/navbar";
import { toBoolean } from "faz";
import { Accessor, createSignal, Setter } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";
import { FazBsNavbarCollapse } from "../navbar/navbar-collapse";

type AriaAttributesRole =  "alert" | "alertdialog" | "application" | "article"
    | "banner" | "button" | "cell" | "checkbox" | "columnheader" | "combobox"
    | "complementary" | "contentinfo" | "definition" | "dialog" | "directory"
    | "document" | "feed" | "figure" | "form" | "grid" | "gridcell" | "group"
    | "heading" | "img" | "link" | "list" | "listbox" | "listitem" | "log"
    | "main" | "marquee" | "math" | "menu" | "menubar" | "menuitem"
    | "menuitemcheckbox" | "menuitemradio" | "meter" | "navigation" | "none"
    | "note" | "option" | "presentation" | "progressbar" | "radio"
    | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar"
    | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status"
    | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox"
    | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem"
    | undefined;

 
export class FazBsNav extends FazBsElementItem {

    public fill: Accessor<boolean>;
    public setFill: Setter<boolean>;
    public justify: Accessor<string>;
    public setJustify: Setter<string>;
    public pills: Accessor<boolean>;
    public setPills: Setter<boolean>;
    public vertical: Accessor<boolean>;
    public setVertical: Setter<boolean>;
    private _tabClasses: string = "";
   
    private outerContainer: JSX.Element;
    private tabList: JSX.Element;
    private tabContainer: JSX.Element;

    public current: FazBsNavItem | undefined;

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
        let active: FazBsNavItem | null = null;
        this.navItemItemsActive.forEach(item => {
            active = item as FazBsNavItem;
            return active;
        })
        return active;
    }

    get contentChild() {
        return this.tabList as ChildNode;
    }

    get tabContentChild() {
        return this.tabContainer as ChildNode;
    }

    get navListRole(): AriaAttributesRole {
        if (this.insideNavbar || this.insideNavbarCollapse) {
            return undefined;
        }
        return "tablist"
    }

    get classNames() {
        const baseClass = this.insideNavbar || this.insideNavbarCollapse ? "navbar-nav" : "nav";
        const classes = [ baseClass ];
        if (this.disabled()) {
            classes.push("disabled");
        }
        if (this.extraClasses()) {
            console.log(this.extraClasses());
            classes.push(this.extraClasses());
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

    get insideNavbarCollapse(): boolean {
        const parent =  this.parent();
        if (!parent) {
            return false;
        }
        if (!(parent instanceof FazBsNavbarCollapse)) {
            return false;
        }
        return true;
    }

    get insideNavbar(): boolean {
        const parent =  this.parent();
        if (!parent) {
            return false;
        }
        if (!(parent instanceof FazBsNavbar)) {
            return false;
        }
        return true;
    }

    get hasTabs() {
        return this.tabItems.length > 0;
    }

    get navItemItems() {
        return this.items().filter(item => {
            return item instanceof FazBsNavItem;
        })
    }

    get navItemItemsActive() {
        const items = this.items();
        return items.filter(item => {
            return item instanceof FazBsNavItem && item.active;
        })
    }

    get onEdge() {
        if(this.current) {
            return !this.current?.isDropdown;
        }
        return false;
    }

    get outerContainerId() {
        if (this.insideNavbar) {
            return `faz-bs-navbar-collapse-${this.id}`;
        }
        return `faz-bs-nav-container-${this.id}`;
    }

    get outerContainerClassNames() {
        const classes = [];
        if (this.insideNavbar) {
            classes.push("collapse");
            classes.push("navbar-collapse");
        }
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
            return item instanceof FazBsNavTab;
        })
    }

    addChild<T extends Node>(node: T): T {
        if (this.hasTabs && this.vertical()) {
            if (node instanceof FazBsNavTab) {
                (this.tabContainer as HTMLElement).appendChild(node);
                return node;
            }
            (this.tabList as HTMLElement).appendChild(node);
            return node;
        }
        if (node instanceof FazBsNavTab) {
            (this.tabContainer as HTMLElement).appendChild(node);
            return node;
        }
        (this.contentChild as HTMLElement).appendChild(node);
        return node ;
    }

    beOverMe(fazNav: FazBsNav, _: Event) {
        clearTimeout(fazNav.timeout);
    }

    leaveMe(fazNav: FazBsNav, _: Event) {
        clearTimeout(fazNav.timeout);
        fazNav.timeout = setTimeout(() => {
            fazNav.activeItems.forEach(item => {
                const navItem = item as FazBsNavItem;
                if (navItem.isDropdown && !fazNav.onEdge) {
                    navItem.deactivate();
                }
            });
        }, 250);
    }

    renderTabList() {
        this.tabList = <div id={`faz-bs-nav-${this.id}`} class={this.classNames}
            role={this.navListRole} onmouseover={[this.beOverMe, this]}
            onmouseleave={[this.leaveMe, this]}></div>;
        return this.tabList;
    }

    renderTabs() {
        if (this.hasTabs) {
            this.tabContainer = <div class={this.tabClassNames}></div>;
            return this.tabContainer;
        }
    }

    show() {
        if (this.insideNavbarCollapse) {
            render(() => this.renderTabList(), this);
            return
        }
        this.outerContainer = <div
            id={this.outerContainerId}
            class={this.outerContainerClassNames}
        >{this.renderTabList()}{this.renderTabs()}</div>;
        render(() => this.outerContainer, this);
    }

    placeBackChildren(children:Node[]) {
        super.placeBackChildren(children);
        if (this.loading() && this.hasTabs) {
            if (this.activeNavItem === null) {
                (this.navItemItems[0] as FazBsNavItem).setActive(true);
            }
            (this.navItemItemsActive[0] as FazBsNavItem).activate();
        }
    }
}

customElements.define("faz-bs-nav", FazBsNav);
customElements.define("faz-bs-nav-item", FazBsNavItem);
customElements.define("faz-bs-nav-tab", FazBsNavTab);
customElements.define("faz-bs-nav-item-content", FazBsNavItemContent);
