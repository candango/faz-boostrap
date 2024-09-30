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

import { FazBsElementItem } from "../../bs-item";
import { Accessor, createSignal, JSX, Setter } from "solid-js";
import { render } from "solid-js/web";


export class FazBsPagination extends FazBsElementItem {

    public count: Accessor<number>;
    public setCount: Setter<number>;
    public page: Accessor<number>;
    public setPage: Setter<number>;
    public perBlock: Accessor<number>;
    public setPerBlock: Setter<number>;
    public perPage: Accessor<number>;
    public setPerPage: Setter<number>;
    private labels = {
        first : "First",
        firstTooltip : "Go to the first page",
        last : "Last",
        lastTooltip : "Go to the last page",
        previous : "Previous",
        previousBlock : "Previous {perBlock}",
        previousTooltip : "Go to the previous page",
        previousBlockTooltip : "Go to the previous {perBlock} pages",
        next : "Next",
        nextBlock : "Next {perBlock}",
        nextBlockTooltip : "Go to the next {perBlock} pages",
        nextTooltip : "Go to the next page",
    };

    constructor() {
        super();

        [this.count, this.setCount] = createSignal<number>(0);
        [this.page, this.setPage] = createSignal<number>(1);
        [this.perBlock, this.setPerBlock] = createSignal<number>(10);
        [this.perPage, this.setPerPage] = createSignal<number>(10);

        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "count":
                    this.setCount(parseInt(attribute.value));
                    break;
                case "page":
                    this.setCount(parseInt(attribute.value));
                    break;
                case "perblock":
                    this.setCount(parseInt(attribute.value));
                    break;
                case "perpage":
                    this.setCount(parseInt(attribute.value));
                    break;
            }
        }
    }

    get classNames(): string {
        let classes = ["pagination"];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        if (this.kind()) {
            classes.push(`alert-${this.kind()}`);
        }
        return classes.join(" ");
    }

    buttonClassNames(page: number): string {
        let classes = ["page-item"];
        if (this.isCurrentPage(page)) {
            classes.push("active");
        }
        if (this.disabled() && !this.isCurrentPage(page)) {
            classes.push("disabled");
        }
        return classes.join(" ");
    }

    get firstPreviousButtonClass() {
        let classes = ["page-item"]
        if (this.isFirstPage || this.disabled()) {
            classes.push("disabled")
        }
        return classes.join(" ")
    }

    get previousBlockButtonClass() {
        let classes = ["page-item"]
        if (this.isFirstBlock || this.disabled()) {
            classes.push("disabled")
        }
        return classes.join(" ")
    }

    get lastNextButtonClass() {
        let classes = ["page-item"]
        if (this.isLastPage || this.disabled()) {
            classes.push("disabled")
        }
        return classes.join(" ")
    }

    get nextBlockButtonClass() {
        let classes = ["page-item"]
        if (this.isLastBlock || this.disabled()) {
            classes.push("disabled")
        }
        return classes.join(" ")
    }

    get blocks(): number {
        const blocksFloor = Math.floor(this.pages / this.perBlock());
        const addReminder = this.pages % this.perBlock() > 0 ? 1 : 0;
        return blocksFloor + addReminder;
    }

    get pages(): number {
        if (this.count() === 0) {
            return 1;
        }
        const pagesFloor = Math.floor(this.count() / this.perPage());
        const remainder = this.count() % this.perPage();
        const addRemainder = remainder > 0 ? 1 : 0;
        return pagesFloor + addRemainder;
    }

    get protectedPage(): number {
        if (this.page() < 1) {
            this.setPage(1);
        }
        if (this.pages < this.page()) {
            this.setPage(this.pages);
        }
        return this.page();
    }

    get currentBlock(): number {
        if (this.protectedPage <= this.perBlock()) {
            return 1;
        }
        const currentBlockFloor = Math.floor(this.protectedPage / this.perBlock());
        const remainder = this.protectedPage % this.perBlock();
        const addRemainder = remainder > 0 ? 1 : 0;
        return currentBlockFloor + addRemainder;
    }

    get currentFirstPage(): number {
        return (this.currentBlock * this.perBlock()) - this.perBlock() + 1;
    }

    get currentLastPage() {
        if (this.isLastBlock) {
            return this.currentFirstPage + this.pagesInLastBlock - 1;
        }
        return this.currentBlock * this.perBlock();
    }

    get pagesInLastBlock(): number {
        let lastBlockRemainder = this.pages % this.perBlock();
        return lastBlockRemainder > 0 ? lastBlockRemainder : this.perBlock();
    }

    get currentBlockPages(): number[] {
        let pages = this.isLastBlock ? this.pagesInLastBlock : this.perBlock();
        return Array(pages).fill(undefined).map((_, i) => i + this.currentFirstPage);
    }

    isCurrentPage(page: number): boolean {
        return page === this.protectedPage;
    }

    get isFirstPage() {
        return this.protectedPage === 1
    }

    get isFirstBlock() {
        return this.currentBlock === 1;
    }

    get isLastPage() {
        console.log(this.protectedPage, this.pages)
        return this.protectedPage >= this.pages;
    }

    get isLastBlock() {
        return this.currentBlock >= this.blocks;
    }

    get hasMultiplePages() {
        return this.pages > 1;
    }

    get hasMultipleBlocks() {
        return this.blocks > 1;
    }

    goToPage(data: [FazBsPagination, number], _: Event) {
        const[pagination, page] = data;
        pagination.setPage(page);
    }

    goToFirstPage(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, 1], event);
    }

    goToLastPage(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, pagination.pages], event);
    }

    goToPreviousPage(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, pagination.page() - 1], event);
    }

    goToPreviousBlock(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, pagination.currentFirstPage - 1], event);
    }

    goToNextPage(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, pagination.page() + 1], event);
    }

    goToNextBlock(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, pagination.currentLastPage + 1], event);
    }

    paginatedLink(page: number): string {
        const link = this.link();
        if (link !== undefined) {
            return link.replace("{page}", page.toString())
        } 
        this.linkIsVoid
        return "#!"
    }

    renderPageNumber(page: number): JSX.Element {
        if (this.isCurrentPage(page)) {
            return <span class="page-link">{page}</span>;
        }
        return <a onclick={[this.goToPage, [this, page]]} class="page-link" href="#">{page}</a>;
    }

    renderPage(page: number): JSX.Element {
        return <li class={this.buttonClassNames(page)}>{this.renderPageNumber(page)}</li>;
    }

    renderPages(): JSX.Element[] {
        return this.currentBlockPages.map((page) => this.renderPage(page));
    }

    renderFirstPage(): JSX.Element {
        if (this.hasMultiplePages) {
            return <li class={this.firstPreviousButtonClass}>
            {this.isFirstPage ?
                <span class="page-link">{this.labels.first}</span> :
                <a class="page-link"
            onclick={[this.goToFirstPage, this]}
            href={this.paginatedLink(1)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={this.labels.firstTooltip}
            >{this.labels.first}</a>}
            </li>;
        }
    }

    renderLastPage() {
        if (this.hasMultipleBlocks) {
            return <li class={this.lastNextButtonClass}>
            {this.isLastPage ?
                <span class="page-link">{this.labels.last}</span> :
                <a class="page-link"
            onclick={[this.goToLastPage, this]}
            href={this.paginatedLink(this.pages)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={this.labels.lastTooltip}
            >{this.labels.last}</a>}
            </li>;
        }
    }

    renderPreviousPage() {
        if (this.hasMultiplePages) {
            let page = this.page() - 1;
            return <li class={this.firstPreviousButtonClass}>
            {this.isFirstPage ?
                <span class="page-link">{this.labels.previous}</span> :
                <a class="page-link"
            onclick={[this.goToPreviousPage, this]}
            href={this.paginatedLink(page)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={this.labels.previousTooltip}
            >{this.labels.previous}</a>}
            </li>;
        }
    }

    renderPreviousBlock() {
        let page = this.currentFirstPage - 1
        let label = this.labels.previousBlock.replace("{perBlock}",
            this.perBlock().toString())
        let tooltipLabel = this.labels.previousBlockTooltip.replace(
            "{perBlock}", this.perBlock().toString())
        return <li class={this.previousBlockButtonClass}>
            {this.isFirstBlock ?
                "" :
                <a class="page-link"
                   onclick={[this.goToPreviousBlock, this]}
                   href={this.paginatedLink(page)}
                   data-bs-toggle="tooltip"
                   data-bs-placement="top"
                   title={tooltipLabel}>{label}</a>}
        </li>
    }

    renderNextPage() {
        let page = this.page() + 1
        return <li class={this.lastNextButtonClass}>
            {this.isLastPage ?
                <span class="page-link">{this.labels.next}</span> :
                <a class="page-link"
                   onclick={[this.goToNextPage, this]}
                   href={this.paginatedLink(page)}
                   data-bs-toggle="tooltip"
                   data-bs-placement="top"
                   title={this.labels.nextTooltip}
                >{this.labels.next}</a>}
        </li>
    }

    renderNextBlock() {
        let page = this.currentLastPage + 1
        let label = this.labels.nextBlock.replace("{perBlock}", this.perBlock().toString());
        let tooltipLabel = this.labels.nextBlockTooltip.replace("{perBlock}", this.perBlock().toString());
        return <li class={this.nextBlockButtonClass}>
            {this.isLastBlock ?
                "" :
                <a class="page-link"
                   onclick={[this.goToNextBlock, this]}
                   href={this.paginatedLink(page)}
                   data-bs-toggle="tooltip"
                   data-bs-placement="top"
                   title={tooltipLabel}>{label}</a>}
        </li>
    }

    show(): void {
        render(() => <ul id={`faz-bs-pagination-${this.id}`} class={this.classNames}>
            {this.renderFirstPage()}
            {this.renderPreviousBlock()}
            {this.renderPreviousPage()}
            {this.renderPages()}
            {this.hasMultiplePages ? this.renderNextPage() : ""}
            {this.hasMultipleBlocks ? this.renderNextBlock() : ""}
            {this.hasMultiplePages ? this.renderLastPage() : ""}
        </ul>, this);
    }
}

customElements.define("faz-bs-pagination", FazBsPagination);
