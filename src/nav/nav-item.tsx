/**
 * Copyright 2018-2025 Flavio Garcia
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

import { FazBsNav } from "./nav";
import { FazBsElement } from "../bs-element";
import { Accessor, createSignal, JSX, Setter } from "solid-js";
import { MountableElement, render } from "solid-js/web";


export class FazBsNavItem extends FazBsElement {


    public linkClasses: Accessor<string>;
    public setLinkClasses: Setter<string>;

    private navItemLi: JSX.Element;
    private navItemLink: JSX.Element;
    private navItemUl: JSX.Element;

    public previousChild: FazBsNavItem | null = null;

    constructor() {
        super();

        [this.linkClasses, this.setLinkClasses] = createSignal<string>("");

        this.previousChild = null;
    }

    get contentChild() {
        if (this.content() === undefined) {
            return this.navItemLink as ChildNode;
        }
        return this.navItemUl as ChildNode;
    }

    get isRoot() {
        if (this.parent() !== undefined) {
            if (this.parent() instanceof FazBsNav) {
                return true;
            }
        }
        return false;
    }

    get isDropdown() {
        return this.fazChildren().length > 0;
    }

    get classNames() {
        const classes = [];
        if(this.isRoot) {
            classes.push("nav-item");
            if (this.isDropdown) {
                classes.push("dropdown");
            }
        } else {
            if (this.isDropdown) {
                classes.push("dropdown-submenu");
            }
        }
        return classes.join(" ");
    }

    resolveLink() {
        const link = super.resolveLink();
        if (!this.isDropdown) {
            if (this.isRoot && this.root?.hasTabs) {
                return `#${link}`;
            }
        }
        return link;
    }

    get linkClassNames() {
        let classes = ["nav-link"];
        const active = this.active();
        const disabled = this.disabled();

        if (!this.isRoot) {
            classes.pop();
            classes.push("dropdown-item");
        }
        if (active && !disabled) {
            classes.push("active");
        }
        if (disabled) {
            classes.push("disabled");
        }
        if (this.isDropdown) {
            classes.push("dropdown-toggle");
        }
        return classes.join(" ");
    }

    get dropdownClassNames() {
        let classes = ["dropdown-menu"];
        if (this.active() && this.isDropdown && !this.disabled()) {
            classes.push("show");
        }
        return classes.join(" ");
    }

    get roleType() {
        const parent = this.parent() as FazBsNav;
        if (this.isRoot && parent.vertical() && parent.hasTabs) {
            return "tab";
        }
        if (this.isDropdown && this.isRoot) {
            return "button";
        }
        if (!this.isDropdown && !this.isRoot) {
            return "tab";
        }
    }

    get root(): FazBsNav | undefined {
        if (this.isRoot) {
            return this.parent() as FazBsNav;
        }
        if (!this.parent()) {
            return undefined;
        }
        return (this.parent() as FazBsNavItem).root;
    }

    get navItemChildren() {
        return this.fazChildren().filter(child => {
            return child instanceof FazBsNavItem;
        })
    }

    get ariaExpandedValue() {
        if (this.isDropdown) {
            return this.active;
        }
    }

    get dataBsToggleValue() {
        if (this.isDropdown && this.isRoot) {
            return "dropdown";
        }
    }

    addChild<T extends Node>(node: T): T {
        if (node instanceof FazBsNavItem) {
            (this.navItemUl as Node).appendChild(node);
            return node;
        }
        (this.contentChild as Node)?.appendChild(node);
        return node;
    }

    activate() {
        this.parent()?.activeFazChildren.forEach(child => {
            if (child instanceof FazBsNavItem) {
                (child as FazBsNavItem).deactivate();
                this.previousChild = child;
            }
        })
        this.setActive(true);
        if (this.root) {
            this.root.current = this;
        }
        if (this.root?.hasTabs) {
            this.root?.tabChildren.forEach((tabChild) => {
                const resolvedLink = this.resolveLink() as string;
                if(tabChild.id === resolvedLink.replace("#", "")){
                    tabChild.setActive(true);
                    return;
                }
                tabChild.setActive(false);
            })
        }
    }

    deactivate() {
        this.previousChild = null;
        this.setActive(false);
        if (this.isDropdown) {
            this.activeFazChildren.forEach(activeChild => {
                if (activeChild instanceof FazBsNavItem) {
                    const child = activeChild as FazBsNavItem;
                    child.deactivate();
                }
            })
        }
    }

    disable() {
        if (this.previousChild != null) {
            this.previousChild.activate();
        }
        this.setDisabled(true);
    }

    onClick(item: FazBsNavItem, event: Event) {
        if (item.linkIsVoid) {
            event.preventDefault();
        }
        item.activate();
    }

    renderDropdown() {
        if (this.isDropdown) {
            this.navItemUl = <ul class={this.dropdownClassNames}></ul>;
            return this.navItemUl;
        }
    }

    renderItem() {
        this.navItemLink = <a class={this.linkClassNames}
            id={`nav_item_link${this.id}`} role={this.roleType}
            onclick={[this.onClick, this]} href={this.resolveLink()}
            aria-expanded={this.ariaExpandedValue ? "true" : undefined}
            data-bs-toggle={this.dataBsToggleValue ? "true" : undefined}
        >{this.content()}</a>;
        this.navItemLi = <li class={this.classNames}
            id={`nav_item_container${this.id}`} >
            {this.navItemLink}
            {this.renderDropdown()}
        </li>;
        return this.navItemLi;
    }

    show() {
        const item = this.renderItem();
        const parent = this.parent() as FazBsNav;
        if (this.isRoot && parent.fill()){
            render(() => item, parent.contentChild as MountableElement);
            return;
        }
        render(() => item, this);
    }
}
