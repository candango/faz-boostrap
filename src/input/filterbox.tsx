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
import { Accessor, createSignal, Setter } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

export class FilterableItem {
    public name: string = "";
    public value: string = "";
    public category?: string | undefined = undefined;
}

export type FilterCallback = () => FilterableItem[];

export type InitCallback = (filterbox: FazBsInputFilterbox) => void;

export class FazBsInputFilterbox extends FazBsElementItem {

    public autocomplete: Accessor<string>;
    public setAutocomplete: Setter<string>;
    public items: Accessor<FilterableItem[]>;
    public setItems: Setter<FilterableItem[]>;
    public label: Accessor<string>;
    public setLabel: Setter<string>;
    public value: Accessor<string>;
    public setValue: Setter<string>;
    public selectedName: Accessor<string>;
    public setSelectedName: Setter<string>;

    public displayFilter: Accessor<boolean>;
    public setDisplayFilter: Setter<boolean>;
    public filtering: Accessor<boolean>;
    public setFiltering: Setter<boolean>;


    public filterCallback: Accessor<FilterCallback | string | undefined>;
    public setFilterCallback: Setter<FilterCallback | string | undefined>;

    public initCallback: InitCallback | string | undefined = undefined;

    private container: JSX.Element;
    private input: JSX.Element;

    private prefixId: string = "faz-bs-input-filterbox";
    private buffer: string = "";
    private filterDelay: number = 300;
    private filterTimeoutId: NodeJS.Timeout | undefined = undefined;
    private beOverTimeoutId: NodeJS.Timeout | undefined = undefined;
    private overListGroup: boolean = false;
    private inputHasFocus: boolean = false;

    constructor() {
        super();

        [this.autocomplete, this.setAutocomplete] = createSignal<string>("off");
        [this.items, this.setItems] = createSignal<FilterableItem[]>([]);
        [this.label, this.setLabel] = createSignal<string>("Search for..");
        [this.value, this.setValue] = createSignal<string>("");
        [this.selectedName, this.setSelectedName] = createSignal<string>("");
 
        [this.displayFilter, this.setDisplayFilter] = createSignal<boolean>(false);
        [this.filtering, this.setFiltering] = createSignal<boolean>(false);

        [this.filterCallback, this.setFilterCallback] = createSignal<FilterCallback | string | undefined>(undefined);

        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "autocomplete":
                    this.setAutocomplete(attribute.value.toLowerCase())
                    break
                case "filtercallback":
                    this.setFilterCallback(attribute.value);
                    break
                case "innitcallback":
                    this.initCallback = attribute.value;
                    break
                case "value":
                    this.setValue(attribute.value);
                    break;
                case "label":
                    this.setLabel(attribute.value);
                    break;
            }
        }

        this.doFilter = this.doFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.verifySelectedValue = this.verifySelectedValue.bind(this);
        
        this.selectOption = this.selectOption.bind(this);
        this.activateOption = this.activateOption.bind(this);
        this.deactivateOption = this.deactivateOption.bind(this);

        this.beOverListGroup = this.beOverListGroup.bind(this);
        this.leaveListGroup = this.leaveListGroup.bind(this);
    }

    private get containerId(): string {
        return `${this.prefixId}-container-${this.id}`;
    }

    private get inputId(): string {
        return `${this.prefixId}-${this.id}`;
    }

    private get listContainer() {
        return `${this.prefixId}-list-container-${this.id}`;
    }

    get classNames() {
        let classes = ["badge"];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        if (this.kind()) {
            classes.push(`text-bg-${this.kind()}`);
        }
        return classes.join(" ");
    }

    defaultFilterCallback(): FilterableItem[] {
        return this.items().filter(
            item => item.name.toLowerCase().indexOf(
                this.buffer.toLowerCase()
            ) !== -1
        );
    }

    get categories() {
        return this.filteredItems.reduce<string[]>((categories, item)=> {
            if(item.hasOwnProperty("category") &&
                categories.indexOf(item.category as string) === -1) {
                categories.push(item.category as string);
            }
            return categories;
        }, []);
    }

    get filteredItems(): FilterableItem[] {
        if(this.filterCallback() !== undefined) {
            (this.filterCallback() as FilterCallback)();
        }
        return this.defaultFilterCallback();
    }

    get filteredItemsUncategorized() {
        return this.filteredItems.filter((item) => {
            return !item.hasOwnProperty("category");
        });
    }

    filteredItemsByCategory(category: string): FilterableItem[] {
        return this.filteredItems.filter((item) => {
            return item.hasOwnProperty("category") && item.category === category;
        });
    }

    doFilter(_: Event): void {
        const input = (this.input as HTMLInputElement);
        this.verifySelectedValue()
        this.setFiltering(true);
        this.setDisplayFilter(false);
        this.overListGroup = true;
        this.inputHasFocus = true;
        this.buffer = input.value;
        this.clearFilterTimeout();
        if(this.buffer !== "") {
            this.filterTimeoutId = setTimeout(
                this.showFilter.bind(this), this.filterDelay
            );
            return;
        }
        this.setFiltering(false);
    }

    showFilter() {
        this.setFiltering(false);
        this.setDisplayFilter(true);
    }

    clearFilter() {
        console.log(this.overListGroup)
        this.inputHasFocus = false
        if (!this.overListGroup) {
            this.buffer = "";
            this.leaveListGroup()
        }
    }

    clearFilterTimeout() {
        if(this.filterTimeoutId) {
            clearTimeout(this.filterTimeoutId)
            this.filterTimeoutId = undefined
        }
    }

    verifySelectedValue() {
        const input = (this.input as HTMLInputElement);
        if(this.selectedName() !== "" && input.value !== this.selectedName()) {
            this.setValue(input.value);
        }
    }

    hasFilterableItems() {
        return this.items().length > 0;
    }

    beOverListGroup() {
        this.overListGroup = true;
        clearTimeout(this.beOverTimeoutId);
    }

    leaveListGroup() {
        this.overListGroup = false;
        this.beOverTimeoutId = setTimeout(() => {
            if(!this.overListGroup && !this.inputHasFocus) {
                this.setFiltering(false);
                this.setDisplayFilter(false);
            }
        }, 150);
    }

    activateOption(e: Event) {
        let option = e.target as HTMLElement;
        option.classList.add("list-group-item-secondary");
    }

    deactivateOption(e: Event) {
        let option = e.target as HTMLElement;
        option.classList.remove("list-group-item-secondary");
    }

    selectOption(e: Event) {
        let option = e.target as HTMLElement;
        this.setSelectedName(option.getAttribute("item-name") as string);
        this.setValue(option.getAttribute("item-name") as string);
        (this.input as HTMLInputElement).value = this.selectedName();
        this.overListGroup = false;
        this.clearFilter();
    }

    get filterContainer(): JSX.Element {
        return <div id={this.listContainer}
                    class="filterbox-list-container"
                    onMouseOver={this.beOverListGroup}
                    onMouseOut={this.leaveListGroup}
        >
            <div class="list-group">
                {this.uncategorizedResults}
                {this.categorizedResults}
            </div>
        </div>
    }
 
    categorizedResultItems(category: string): JSX.Element[] {
        return this.filteredItemsByCategory(category).map((item) => {
            return <a href="#"
                      class="list-group-item list-group-item-action"
                      id={item.value + "-" + item.name}
                      item-value={item.value} item-name={item.name}
                      onClick={this.selectOption}
                      onMouseOver={this.activateOption}
                      onMouseOut={this.deactivateOption}>{item.name}</a>
        })
    }

    get uncategorizedResults(): JSX.Element[] {
        return this.filteredItemsUncategorized.map((item) => {
            return <a href="#"
                      class="list-group-item list-group-item-action"
                      id={item.value + "-" + item.name}
                      item-value={item.value} item-name={item.name}
                      onClick={this.selectOption}
                      onMouseOver={this.activateOption}
                      onMouseOut={this.deactivateOption}>{item.name}</a>
        })
    }

    get categorizedResults(): JSX.Element[] {
        const className = [
            "list-group-item",
            "list-group-item-action",
            "list-group-item-dark"].join(" ");
        return this.categories.map((category) => {
            return <><a id={"category-" + category } href="#"
                   class={className}>
                    <h6 class="mb-1">{category}</h6></a>
                {this.categorizedResultItems(category)}</>
        });
    }

    renderInput(): JSX.Element {
        this.input = <input id={this.inputId} type="text" value={this.value()}
            class="form-control"
            onKeyUp={this.doFilter}
            onFocus={this.doFilter}
            onBlur={this.clearFilter}
            placeholder={this.label()}
            autocomplete={this.autocomplete()} />;
        return this.input;
    }

    show() {
        this.container = <div id={this.containerId}>
            {this.renderInput()}
        </div>;
        render(() => this.container, this);
    }

    afterShow() {
        super.afterShow();
        const _this = this;
        const filterCallback = this.filterCallback();
        if(typeof this.initCallback === "string") {
            this.initCallback = eval(this.initCallback);
        }
        // if(filterCallback) {
        //     if(typeof filterCallback === "string") {
        //         this.setFilterCallback(eval(filterCallback as string));
        //     }
        // }
        // console.log(this);
        // console.log(initCallback);
        (this.initCallback as InitCallback)(this);
        // (this.initCallback() as InitCallback)(_this);
    }
}

customElements.define("faz-bs-input-filterbox", FazBsInputFilterbox);
