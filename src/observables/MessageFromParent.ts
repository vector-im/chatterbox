/*
Copyright 2025 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { EventEmitter } from "hydrogen-view-sdk";

export class MessageFromParent extends EventEmitter {
    constructor() {
        super();
        window.addEventListener("message", (event) => {
            const { action } = event.data;
            this.emit(action, event.data);
        });
    }
}
