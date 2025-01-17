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
import { Accessor, JSX, Setter } from "solid-js";
export declare class FazBsNavItem extends FazBsElement {
    linkClasses: Accessor<string>;
    setLinkClasses: Setter<string>;
    private navItemLi;
    private navItemLink;
    private navItemUl;
    previousChild: FazBsNavItem | null;
    constructor();
    get contentChild(): ChildNode;
    get isRoot(): boolean;
    get isDropdown(): boolean;
    get classNames(): string;
    resolveLink(): string | undefined;
    get linkClassNames(): string;
    get dropdownClassNames(): string;
    get roleType(): "button" | "tab" | undefined;
    get root(): FazBsNav | undefined;
    get navItemChildren(): FazBsNavItem[];
    get ariaExpandedValue(): Accessor<boolean> | undefined;
    get dataBsToggleValue(): "dropdown" | undefined;
    addChild<T extends Node>(node: T): T;
    activate(): void;
    deactivate(): void;
    disable(): void;
    onClick(item: FazBsNavItem, event: Event): void;
    renderDropdown(): JSX.Element;
    renderItem(): JSX.Element;
    show(): void;
}
//# sourceMappingURL=nav-item.d.ts.map