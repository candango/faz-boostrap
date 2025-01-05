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
import { FazBsElement } from "../bs-element";
import { FazBsNavItem } from "./nav-item";
import { FazBsNavTab } from "./nav-tab";
import { Accessor, Setter } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
type AriaAttributesRole = "alert" | "alertdialog" | "application" | "article" | "banner" | "button" | "cell" | "checkbox" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "dialog" | "directory" | "document" | "feed" | "figure" | "form" | "grid" | "gridcell" | "group" | "heading" | "img" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "meter" | "navigation" | "none" | "note" | "option" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem" | undefined;
export declare class FazBsNav extends FazBsElement {
    fill: Accessor<boolean>;
    setFill: Setter<boolean>;
    justify: Accessor<string>;
    setJustify: Setter<string>;
    pills: Accessor<boolean>;
    setPills: Setter<boolean>;
    vertical: Accessor<boolean>;
    setVertical: Setter<boolean>;
    private _tabClasses;
    private outerContainer;
    private tabList;
    private tabContainer;
    current: FazBsNavItem | undefined;
    private timeout;
    constructor();
    get activeNavItem(): null;
    get contentChild(): ChildNode;
    get tabContentChild(): ChildNode;
    get navListRole(): AriaAttributesRole;
    get classNames(): string;
    get insideNavbarCollapse(): boolean;
    get insideNavbar(): boolean;
    get hasTabs(): boolean;
    get navItemChildren(): FazBsNavItem[];
    get navItemChildrenActive(): import("faz/src").FazElement[];
    get onEdge(): boolean;
    get outerContainerId(): string;
    get outerContainerClassNames(): string;
    get tabClassNames(): string;
    get tabChildren(): FazBsNavTab[];
    addChild<T extends Node>(node: T): T;
    beOverMe(fazNav: FazBsNav, _: Event): void;
    leaveMe(fazNav: FazBsNav, _: Event): void;
    renderTabList(): JSX.Element;
    renderTabs(): JSX.Element;
    show(): void;
    placeBackChildren(children: Node[]): void;
}
export { FazBsNavItem } from "./nav-item";
export { FazBsNavItemContent } from "./nav-item-content";
export { FazBsNavTab } from "./nav-tab";
//# sourceMappingURL=nav.d.ts.map