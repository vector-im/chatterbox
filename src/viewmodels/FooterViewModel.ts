/*
Copyright 2025 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { ViewModel } from "hydrogen-view-sdk";
import { IChatterboxConfig } from "../types/IChatterboxConfig";

export class FooterViewModel extends ViewModel {
    private _config: IChatterboxConfig;

    constructor(options) {
        super(options);
        this._config = options.config;
    }

    get chatterboxLink(): string {
        return this._config.footer?.chatterbox_link ?? null;
    }

    get matrixLink(): string {
        return this._config.footer?.matrix_link ?? null;
    }
}
