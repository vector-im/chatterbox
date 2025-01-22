/*
Copyright 2025 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { TemplateView } from "hydrogen-view-sdk";
import { RootViewModel } from "../../viewmodels/RootViewModel";
import { AccountSetupView } from "./AccountSetupView";
import { ChatterboxView } from "./ChatterboxView";

export class RootView extends TemplateView<RootViewModel> {
    constructor(value) {
        super(value);
    }

    render(t, vm: RootViewModel) {
        return t.mapView(vm => vm.activeSection, section => {
            (window as any).sendViewChangeToParent(section);
            switch(section) {
                case "account-setup":
                    return new AccountSetupView(vm.accountSetupViewModel);
                case "timeline":
                    return new ChatterboxView(vm.chatterboxViewModel);
            }
            return null;
        })
    }
}
