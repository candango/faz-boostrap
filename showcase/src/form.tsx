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

import "../../src/breadcrumb/breadcrumb";
import { FazFormElement } from "faz/src";
import { JSX } from "solid-js";
import { render } from "solid-js/web";
import { FakeServer, fakeServer, FakeXMLHttpRequest } from "nise";

import axios from "axios";

export class FormExample extends FazFormElement {

    private form: JSX.Element;
    private email: JSX.Element;
    private description: JSX.Element;
    private server: FakeServer = fakeServer.create();

    constructor(){
        super();
        this.server.autoRespond = true;
        const _this = this;
        this.server.respondWith("POST", "/sometest", function(xhr: FakeXMLHttpRequest) {
            _this.clearErrors();
            const data = JSON.parse(xhr.requestBody) as unknown as { [key: string]: any };
            if (data.email === "") {
                _this.pushError("email", "Missing email");
            }
            if (data.description === "") {
                _this.pushError("description", "Missing description");
            }
            if (_this.hasErrors()){
                xhr.respond(
                    400,
                    { "Content-Type": "application/json" },
                    JSON.stringify({ "errors": _this.errors()}),
                );
                return;
            }
            xhr.respond(
                200,
                { "Content-Type": "application/json" },
                '{"id":1}',
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
        const email = this.email as HTMLElement;
        const description = this.description as HTMLElement;
        email.classList.remove("is-invalid");
        description.classList.remove("is-invalid");
        axios({
            method: this.method(),
            url: "/sometest",
            data: data
        }).then(response => {
            console.log(response);
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
            console.log(this.hasErrorsFor("email"));
        });
    }

    renderTabs() {
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
            <button class="btn btn-primary" type="submit">Button</button>
            </form>;
    }

    show() {
        this.renderTabs();
        render(() => <div>{this.form}</div>, this);
        return;
    }
}

customElements.define("faz-form-example", FormExample);
