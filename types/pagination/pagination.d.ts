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
import { Accessor, JSX, Setter } from "solid-js";
export declare class FazBsPagination extends FazBsElementItem {
    count: Accessor<number>;
    setCount: Setter<number>;
    page: Accessor<number>;
    setPage: Setter<number>;
    perBlock: Accessor<number>;
    setPerBlock: Setter<number>;
    perPage: Accessor<number>;
    setPerPage: Setter<number>;
    private labels;
    constructor();
    get classNames(): string;
    buttonClassNames(page: number): string;
    get firstPreviousButtonClass(): string;
    get previousBlockButtonClass(): string;
    get lastNextButtonClass(): string;
    get nextBlockButtonClass(): string;
    get blocks(): number;
    get pages(): number;
    get protectedPage(): number;
    get currentBlock(): number;
    get currentFirstPage(): number;
    get currentLastPage(): number;
    get pagesInLastBlock(): number;
    get currentBlockPages(): number[];
    isCurrentPage(page: number): boolean;
    get isFirstPage(): boolean;
    get isFirstBlock(): boolean;
    get isLastPage(): boolean;
    get isLastBlock(): boolean;
    get hasMultiplePages(): boolean;
    get hasMultipleBlocks(): boolean;
    get recordsInLastPage(): number;
    get currentFirstRecord(): number;
    get currentLastRecord(): number;
    goToPage(data: [FazBsPagination, number], _: Event): void;
    goToFirstPage(pagination: FazBsPagination, event: Event): void;
    goToLastPage(pagination: FazBsPagination, event: Event): void;
    goToPreviousPage(pagination: FazBsPagination, event: Event): void;
    goToPreviousBlock(pagination: FazBsPagination, event: Event): void;
    goToNextPage(pagination: FazBsPagination, event: Event): void;
    goToNextBlock(pagination: FazBsPagination, event: Event): void;
    paginatedLink(page: number): string;
    renderPageNumber(page: number): JSX.Element;
    renderPage(page: number): JSX.Element;
    renderPages(): JSX.Element[];
    renderFirstPage(): JSX.Element;
    renderLastPage(): JSX.Element;
    renderPreviousPage(): JSX.Element;
    renderPreviousBlock(): JSX.Element;
    renderDebug(): JSX.Element;
    renderNextPage(): JSX.Element;
    renderNextBlock(): JSX.Element;
    show(): void;
}
//# sourceMappingURL=pagination.d.ts.map