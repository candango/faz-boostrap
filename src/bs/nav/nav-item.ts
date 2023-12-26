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

import { FazElementItem } from "faz";
import FazBsNavElement from "./nav";


export default class FazBsNavItemElement extends FazElementItem {

    private _linkClasses: string = "";

    private navItemLi: HTMLLIElement;
    private navItemLink: HTMLAnchorElement;
    private navItemUl: HTMLUListElement;

    public previousItem: FazBsNavItemElement | undefined;
    constructor() {
        super();
        this.navItemLi = document.createElement("li");
        this.navItemLink = document.createElement("a");
        this.navItemUl = document.createElement("ul");
        
        this.addEventListener("activeChanged", (e) => this.updateClassNames());
        this.addEventListener("disabledChanged", (e) =>
            this.updateClassNames());
    }

    get linkClasses(): string {
        return this._linkClasses;
    }

    set linkClasses(value: string) {
        if (this._linkClasses !== value) {
            const oldValue = this._linkClasses;
            this._linkClasses = value;
            if (!this.loading) {
                const e = this.createEvent("linkClassesChanged",
                    value, oldValue);
                this.dispatchEvent(e);
                this.onLinkClassesChanged(e);
            }
        }
    }

    onLinkClassesChanged(e: Event) {}

    get contentChild() {
        if (this.content === null) {
            return this.navItemLink;
        }
        return this.navItemUl;
    }

    get isRoot() {
        if (this.parent !== null) {
            if (this.parent instanceof FazBsNavElement) {
                return true;
            }
        }
        return false;
    }

    get isDropdown() {
        this.loading;
        return this.items.length > 0;
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
        if (this.active) {
            classes.push("active");
        }
        if (this.disabled) {
            classes.push("disabled");
        }
        return classes.join(" ");
    }

    get link() {
        const link = super.link;
        if (!this.isDropdown) {
            if (this.isRoot && this.root?.hasTabs) {
                return `#${super.link}`
            }
        }
        return link;
    }

    get linkClassNames() {
        let classes = ["nav-link"];

        if (!this.isRoot) {
            classes.pop();
            classes.push("dropdown-item");
        }
        if (this.active && !this.disabled) {
            classes.push("active");
            if (this.root) {
                this.root.current = this;
            }
        }
        if (this.disabled) {
            classes.push("disabled");
        }
        if (this.isDropdown) {
            classes.push("dropdown-toggle");
        }
        return classes.join(" ");
    }

    get dropdownClassNames() {
        let classes = ["dropdown-menu"];
        if (this.active && this.isDropdown && !this.disabled) {
            classes.push("show");
        }
        return classes.join(" ");
    }

    get roleType() {
        if (this.isDropdown && this.isRoot) {
            return "button";
        }
        if (!this.isDropdown && !this.isRoot) {
            return "tab";
        }
    }

    get root(): FazBsNavElement | undefined {
        if (this.isRoot) {
            return this.parent as FazBsNavElement;
        }
        if (!this.parent) {
            return undefined;
        }
        return (this.parent as FazBsNavItemElement).root;
    }

    get navItemItems() {
        return this.items.filter(item => {
            return item instanceof FazBsNavItemElement;
        });
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
        if (node instanceof FazBsNavItemElement) {
            this.navItemUl.appendChild(node);
            return node;
        }
        this.contentChild?.appendChild(node);
        return node; 
    }

    deactivate() {
        this.previousItem = undefined;
        this.active = false;
        if (this.isDropdown) {
            this.activeItems.forEach(activeItem => {
                if (activeItem instanceof FazBsNavItemElement) {
                    const item = activeItem as FazBsNavItemElement;
                    item.deactivate();
                }
            });
        }
    }

    activate() {
        this.parent?.activeItems.forEach(item => {
            if (item instanceof FazBsNavItemElement) {
                this.previousItem = item;
                (item as FazBsNavItemElement).deactivate();
            }
        });
        this.active = true;
        if (this.root?.hasTabs) {
            this.root?.tabItems.forEach((item) => {
                if(item.id === this.link.replace("#", "")){
                    item.active = true;
                    return;
                }
                item.active = false;
            });
        }
    }

    itemClick(event: Event) {
        if (this.linkIsVoid) {
            event.preventDefault();
        }
        this.activate();
    }

    renderDropdown(element: HTMLElement) {
        this.navItemUl.className = this.dropdownClassNames;
        element.appendChild(this.navItemUl);
    }

    updateClassNames() {
        this.navItemLi.className = this.classNames
        this.navItemLink.className = this.linkClassNames;
        this.navItemUl.className = this.dropdownClassNames;
    }

    show() {
            // <li className={this.classNames} id={this.containerId}>
            //     <a id={this.state.id} className={this.linkClassNames}
            //        role={this.role} target={this.state.target} href={this.link}
            //        onClick={(event) => {this.handleClick(event)}}
            //        aria-expanded={this.ariaExpanded}
            //        data-bs-toggle={this.dataBsToggle}
            //     >{this.content}</a>
            //     {this.isDropdown ? this.renderItems() : ""}
            // </li>
        this.navItemLi.id = `nav_item_container${this.id}`;
        this.navItemLi.className = this.classNames;
        this.navItemLink.id = `nav_item_link${this.id}`;
        this.navItemLink.className = this.linkClassNames;
        if (this.roleType) {
            this.navItemLink.setAttribute("role", this.roleType);
        }
        this.navItemLink.setAttribute("href", this.link);
        this.navItemLink.onclick = (e) => this.itemClick(e);
        this.navItemLink.setAttribute("aria-expanded",
            this.ariaExpandedValue ? "true" : "false");
        this.navItemLink.setAttribute("data-bs-toggle",
            this.dataBsToggleValue ? "true" : "");
        if (this.content !== null) {
            this.navItemLink.innerHTML = this.content;
        }
        this.navItemLi.appendChild(this.navItemLink);
        if (this.isDropdown) {
            this.renderDropdown(this.navItemLi);
        }
        if (this.isRoot) {
            this.root?.contentChild?.appendChild(this.navItemLi);
            return;
        }
        this.appendChild(this.navItemLi);
        // const navItem = <li id={`nav_item_container${this.id}`} 
        //     class={this.classNames}>
        //         <a id={`nav_item_link${this.id}`} class={this.linkClassNames} 
        //             role={this.roleType} href={this.link}
        //             onClick={(e) => this.itemClick(e)}
        //             aria-expaded={this.ariaExpandedValue}
        //             data-bs-toggle={this.dataBsToggleValue}>{this.content()} 
        //         </a>
        //         {this.isDropdown ? this.renderDropdown() : ""}
        //     </li>;
    }
}
