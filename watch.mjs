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

import { context } from "esbuild";
import { assets } from "./assets.mjs";
import { entryPoints } from "./entryPoints.mjs";
import { copy } from "esbuild-plugin-copy";
import { solidPlugin } from "esbuild-plugin-solid";

entryPoints.push({ out: "alert-solid.bundle", in: "showcase/src/alert.ts" });
entryPoints.push({ out: "badge-solid.bundle", in: "showcase/src/badge.ts" });
entryPoints.push({ out: "breadcrumb-solid.bundle", in: "showcase/src/breadcrumb.ts" });
entryPoints.push({ out: "form.bundle", in: "showcase/src/form.tsx" });
entryPoints.push({ out: "input.bundle", in: "showcase/src/input.ts" });
entryPoints.push({ out: "input-filterbox-solid.bundle", in: "showcase/src/input-filterbox.ts" });
entryPoints.push({ out: "grid-solid.bundle", in: "showcase/src/grid.ts" });
entryPoints.push({ out: "nav-solid.bundle", in: "showcase/src/nav.ts" });
entryPoints.push({ out: "navbar-solid.bundle", in: "showcase/src/navbar.tsx" });
entryPoints.push({ out: "pagination-solid.bundle", in: "showcase/src/pagination.ts" });
entryPoints.push({ out: "theme.bundle", in: "src/bs-theme.ts" });

entryPoints.push({ out: "global.bundle", in: "showcase/src/global.ts" });
entryPoints.push({ out: "css/showcase", in: "stylesheets/showcase.css"});

let ctx = await context({
    entryPoints: entryPoints,
    bundle: true,
    minify: true,
    write: true,
    treeShaking: true,
    sourcemap: true,
    logLevel: "info",
    outdir: "showcase/dist",
    legalComments: "none",
    allowOverwrite: false,
    plugins:[
        copy(assets),
        solidPlugin()
    ],
    loader: { '.png': 'binary' },
});

await ctx.watch();

await ctx.serve({
    port: 8081,
    servedir: "showcase",
    onRequest: (args) => {
        let logMessage = "";
        for (let key in args) {
            logMessage += key + ": " + args[key] + " ";
        }
        console.log(logMessage);
    }
})
