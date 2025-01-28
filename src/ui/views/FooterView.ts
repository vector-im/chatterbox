/*
Copyright 2025 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { TemplateView } from "hydrogen-view-sdk";
import chatterboxLogo from "../res/chat-bubbles.svg";
import { FooterViewModel } from "../../viewmodels/FooterViewModel";

export class FooterView extends TemplateView<FooterViewModel> {
    constructor(value) {
        super(value);
    }

    render(t, vm) {
        return t.div({ className: "FooterView" }, [
            t.div([
                t.img({ src: chatterboxLogo, className: "FooterView_logo" }),
                t.a(
                    {
                        className: "FooterView_chatterbox-branding",
                        href: vm.chatterboxLink,
                        target: "_top",
                        rel: "noopener"
                    },
                    "Chatterbox"
                ),
            ]),
            t.a(
                {
                    className: "FooterView_matrix-branding",
                    href: vm.matrixLink,
                    target: "_top",
                    rel: "noopener"
                },
                "Powered by Matrix"
            ),
        ]);
    }
}
