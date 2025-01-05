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

import { FazBsAlert } from "../../src/alert/alert";
import { FazBsInputFilterbox, FilterableItem } from "../../src/input/filterbox";
import { FazFormElement } from "faz/src";
import { JSX } from "solid-js";
import { render } from "solid-js/web";
import { FakeServer, fakeServer, FakeXMLHttpRequest } from "nise";

import axios from "axios";

export class FormExample extends FazFormElement {

    private alert: JSX.Element | undefined;
    private filterbox: JSX.Element | undefined;
    private form: JSX.Element;
    private email: JSX.Element;
    private description: JSX.Element;
    private server: FakeServer = fakeServer.create();

    constructor(){
        super();
        this.server.autoRespond = true;
        this.server.respondWith("GET", "/items", (xhr: FakeXMLHttpRequest) => {
            this.clearErrors();
            const data = JSON.parse(xhr.requestBody) as unknown as { [key: string]: any };
            if (data.email === "") {
                this.pushError("email", "Missing email");
            }
            if (data.description === "") {
                this.pushError("description", "Missing description");
            }
            if (this.hasErrors()){
                xhr.respond(
                    400,
                    { "Content-Type": "application/json" },
                    JSON.stringify({ "errors": this.errors()})
                );
                return;
            }
            xhr.respond(
                200,
                { "Content-Type": "application/json" },
                JSON.stringify({ "message": "Data saved."})
            );
        });
        this.server.respondWith("POST", "/save", (xhr: FakeXMLHttpRequest) => {
            this.clearErrors();
            const data = JSON.parse(xhr.requestBody) as unknown as { [key: string]: any };
            if (data.email === "") {
                this.pushError("email", "Missing email");
            }
            if (data.description === "") {
                this.pushError("description", "Missing description");
            }
            if (this.hasErrors()){
                xhr.respond(
                    400,
                    { "Content-Type": "application/json" },
                    JSON.stringify({ "errors": this.errors()})
                );
                return;
            }
            xhr.respond(
                200,
                { "Content-Type": "application/json" },
                JSON.stringify({ "message": "Data saved."})
            );
        });
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    get contentChild() {
        return this.form as ChildNode;
    }

    handleSubmit(e: Event): void {
        e.preventDefault();
        const data: { [key: string]: any } = {};
        const nodeList = (this.form as HTMLFormElement).querySelectorAll("input, textarea, select");
        nodeList.forEach((node) => {
            let element = node as HTMLInputElement|HTMLTextAreaElement;
            data[element.name] = element.value;
        });
        const alert = this.alert as FazBsAlert;
        // const filterbox = this.filterbox as FazBsInputFilterbox;
        const email = this.email as HTMLElement;
        const description = this.description as HTMLElement;
        email.classList.remove("is-invalid");
        description.classList.remove("is-invalid");
        alert.setExtraClasses("invisible");
        axios({
            method: this.method(),
            url: "/save",
            data: data
        }).then(response => {
            alert.setExtraClasses("text-center");
            alert.setContent(response.data.message);
        }).catch(error => {
            this.setErrors(error.response.data.errors);
            if (this.hasErrorsFor("email")) {
                email.classList.add("is-invalid");
                if (email.nextElementSibling) {
                    email.nextElementSibling.innerHTML = this.getErrorsFor("email").join("<br>");
                }
            }
            if (this.hasErrorsFor("description")) {
                description.classList.add("is-invalid");
                if (description.nextElementSibling) {
                    description.nextElementSibling.innerHTML = this.getErrorsFor("description").join("<br>");
                }
            }
        });
    }

    filterItems(query: string): FilterableItem[] {
        return [
            {
                name: "Item 1",
                value: 1
            }, {
                name: "Item 2",
                value: 2
            }, {
                name: "Item Category 1",
                value: 3,
                category: "Cat 1"
            }, {
                name: "Item Category 2",
                value: 4,
                category: "Cat 1"
            }
            , {
                name: "Item Category 3",
                value: 5,
                category: "Cat 2"
            }
        ];
    }

    renderTabs() {
        this.alert = <faz-bs-alert extraClasses="invisible"></faz-bs-alert>;
        this.filterbox = <faz-bs-input-filterbox></faz-bs-input-filterbox>;
        (this.filterbox as FazBsInputFilterbox).filterCallback = this.filterItems;
        this.email = <input type="email" name="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>;
        this.description = <textarea class="form-control" name="description" id="exampleFormControlTextarea1" rows="3"></textarea>;
        this.form = <form
            action={this.action()}
            method={this.method() as JSX.HTMLFormMethod}
            onSubmit={this.handleSubmit}>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                {this.email}
                <div class="invalid-feedback"></div>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                {this.description}
                <div class="invalid-feedback"></div>
            </div>
            <div class="mb-3">
                {this.filterbox}
                <div class="invalid-feedback"></div>
            </div>
            <div class="mb-3 row">
                <div class="col-2"><button class="btn btn-primary" type="submit">Button</button></div>
                <div class="col-9">{this.alert}</div>
            </div>
        </form>;
    }

    show() {
        this.renderTabs();
        render(() => <div>{this.form}</div>, this);
        return;
    }
}

customElements.define("form-example", FormExample);
