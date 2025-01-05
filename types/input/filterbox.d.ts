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
import { Accessor, Setter } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
export declare class FilterableItem {
    name: string;
    value: any;
    category?: string | undefined;
}
export type FilterCallback = (query: string) => FilterableItem[];
export type InitCallback = (filterbox: FazBsInputFilterbox) => void;
export declare class FazBsInputFilterbox extends FazBsElement {
    autocomplete: Accessor<string>;
    setAutocomplete: Setter<string>;
    items: Accessor<FilterableItem[]>;
    setItems: Setter<FilterableItem[]>;
    label: Accessor<string>;
    setLabel: Setter<string>;
    value: Accessor<string>;
    setValue: Setter<string>;
    selectedName: Accessor<string>;
    setSelectedName: Setter<string>;
    displayFilter: Accessor<boolean>;
    setDisplayFilter: Setter<boolean>;
    filtering: Accessor<boolean>;
    setFiltering: Setter<boolean>;
    filterCallback: FilterCallback | string | undefined;
    initCallback: InitCallback | string | undefined;
    private container;
    private inputName;
    private inputValue;
    private prefixId;
    private buffer;
    private filterDelay;
    private filterTimeoutId;
    private beOverTimeoutId;
    private overListGroup;
    private inputHasFocus;
    constructor();
    private get containerId();
    private get inputId();
    private get inputValueId();
    private get listContainer();
    get classNames(): string;
    defaultFilterCallback(query: string): FilterableItem[];
    getCategories(filteredItems: FilterableItem[]): string[];
    get filteredItems(): FilterableItem[];
    filterUncategorizedItems(filteredItems: FilterableItem[]): FilterableItem[];
    filteredItemsByCategory(category: string, filteredItems: FilterableItem[]): FilterableItem[];
    doFilter(_: Event): void;
    showFilter(): void;
    clearFilter(): void;
    clearFilterTimeout(): void;
    verifySelectedValue(): void;
    hasFilterableItems(): boolean;
    beOverListGroup(): void;
    leaveListGroup(): void;
    activateOption(e: Event): void;
    deactivateOption(e: Event): void;
    selectOption(e: Event): void;
    filterCategorizedResultItems(category: string, filteredItems: FilterableItem[]): JSX.Element[];
    get results(): JSX.Element;
    renderUncategorizedResults(filteredItems: FilterableItem[]): JSX.Element[];
    renderCategorizedResults(filteredItems: FilterableItem[]): JSX.Element[];
    renderFilterContainer(): JSX.Element;
    renderFilteringMessage(): JSX.Element;
    renderInputName(): JSX.Element;
    renderInputValue(): JSX.Element;
    show(): void;
    afterShow(): void;
}
//# sourceMappingURL=filterbox.d.ts.map