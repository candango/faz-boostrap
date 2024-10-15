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
import { render } from "solid-js/web";

export class FazBsNavbarToggler extends FazBsElementItem {

    get classNames() {
        let classes = ["navbar-toggler"];
        return classes.join(" ");
    }

    show() {
        render(() => <button class={this.classNames}
            id={`faz-bs-navbar-toggler-${this.id}`}
            data-bs-toggle="collapse"
            data-bs-target={`#faz-bs-navbar-collapse-${this.target()}`}>    
        </button> , this);
    }
}
