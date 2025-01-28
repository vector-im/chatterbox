/*
Copyright 2025 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { TemplateView, TimelineView, AvatarView, viewClassForTile } from "hydrogen-view-sdk";
import { MessageComposer } from "hydrogen-view-sdk";
import { ChatterboxViewModel } from "../../viewmodels/ChatterboxViewModel";
import { FooterView } from "./FooterView";
import { LoadingView } from "./LoadingView";

export class ChatterboxView extends TemplateView<ChatterboxViewModel> {
    constructor(value) {
        super(value);
    }

    render(t, vm) {
        return t.div({ className: "ChatterboxView", },
            [
            t.mapView(
                (vm) => (vm.roomViewModel ? vm : null),
                (vm) => (vm ? new RoomHeaderView(vm) : null)
            ),
            t.mapView(
                (vm) => vm.timelineViewModel,
                (vm) => (vm ? new TimelineView(vm, viewClassForTile) : new LoadingView())
            ),
            t.mapView(
                (vm) => vm.messageComposerViewModel,
                (vm) => (vm?.kind === "composer" ? new MessageComposer(vm) : new WaitingForOperatorJoinView())
            ),
            t.view(new FooterView(vm.footerViewModel)),
        ]);
    }
}

class RoomHeaderView extends TemplateView<ChatterboxViewModel> {
    constructor(value) {
        super(value);
    }

    render(t, vm: ChatterboxViewModel) {
        const avatar = vm.customAvatarURL ? t.img({ className:"avatar", src: vm.customAvatarURL }) : t.view(new AvatarView(vm.roomViewModel, 30));
        return t.div({ className: "RoomHeaderView" }, [
            avatar,
            t.div({ className: "RoomHeaderView_name" }, vm => vm.roomName),
            t.div({ className: "RoomHeaderView_menu" }, [
                t.button({
                    className: "RoomHeaderView_menu_minimize", onClick: () => {
                        vm.minimize();
                    }
                })
            ]),
        ]);
    }
}

class WaitingForOperatorJoinView extends TemplateView {
    render(t) {
        return t.div({ className: "WaitingForOperatorJoinView" }, [
            t.div({ className: "FakeComposerContainer" }, [
                t.span("Waiting for operator to join "),
                t.div({ className: "loader" })]
            )]
        );
    }
}
