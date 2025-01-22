/*
Copyright 2025 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { TemplateView } from "hydrogen-view-sdk";

export class LoadingView extends TemplateView {
    render(t) {
        return t.div({ className: "ChatterboxLoadingView" }, [
            t.div({ className: "chatterbox-spinner" }, [
                t.div({ className: "loader" }),
            ]),
            t.span({className: "LoadingText"}, "Loading")
        ]);
    }
}
