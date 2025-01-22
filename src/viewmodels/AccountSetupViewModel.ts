/*
Copyright 2025 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { ViewModel, Client, LoadStatus } from "hydrogen-view-sdk";
import { IChatterboxConfig } from "../types/IChatterboxConfig";
import { generatePassword, generateUsername } from "../random";
import "hydrogen-view-sdk/style.css";


export class AccountSetupViewModel extends ViewModel {
    private _config: IChatterboxConfig;
    private _client: typeof Client;
    private _startStage?: any;
    private _registration: any;
    private _privacyPolicyLink: string;
    private _showButtonSpinner: boolean = false;

    constructor(options) {
        super(options);
        this._client = options.client;
        this._config = options.config;
        this._startRegistration();
    }

    private async _startRegistration(): Promise<void> {
        const password = generatePassword(10);
        const maxAttempts = 10;
        for (let i = 0; i < maxAttempts; ++i) {
            try {
                const username = `${this._config.username_prefix}-${generateUsername(10)}`;
                const flowSelector = (flows) => {
                    const allowedStages = [
                        "m.login.registration_token",
                        "org.matrix.msc3231.login.registration_token",
                        "m.login.terms",
                        "m.login.dummy"
                    ];
                    for (const flow of flows) {
                        // Find the first flow that does not contain any unsupported stages but contains Token registration stage.
                        const containsUnsupportedStage = flow.stages.some(stage => !allowedStages.includes(stage));
                        const containsTokenStage = flow.stages.includes("m.login.registration_token") ||
                            flow.stages.includes("org.matrix.msc3231.login.registration_token");
                        if (!containsUnsupportedStage && containsTokenStage) {
                            return flow;
                        }
                    }
                }
                this._registration = await this._client.startRegistration(this._homeserver, username, password, "Chatterbox", flowSelector);
                this._startStage = await this._registration.start();
                let stage = this._startStage;
                while (stage && stage.type !== "m.login.terms") {
                    stage = stage.nextStage;
                }
                if (!stage) {
                    // If terms login stage is not found, go straight to completeRegistration()
                    this.completeRegistration();
                    return;
                }
                this._privacyPolicyLink = stage.privacyPolicy.en?.url;
                this.emitChange("privacyPolicyLink");
                break;
            }
            catch (e) {
                if (e.errcode !== "M_USER_IN_USE") {
                    throw e;
                }
            }
        }
    }

    async completeRegistration() {
        this._showButtonSpinner = true;
        this.emitChange("showButtonSpinner");
        let stage = this._startStage;
        while (stage) {
            if (
                stage.type === "m.login.registration_token" ||
                stage.type === "org.matrix.msc3231.login.registration_token"
            ) {
                stage.setToken(this._config.token);
            }
            stage = await this._registration.submitStage(stage);
        }
        const promise = this.setupSession();
        this.navigation.push("timeline", promise);
    }

    async setupSession(): Promise<void> {
        this._client.startWithAuthData(this._registration.authData);
        await this._client.loadStatus.waitFor((status: string) => {
            return status === LoadStatus.Ready ||
                status === LoadStatus.Error ||
                status === LoadStatus.LoginFailed;
        }).promise;

        if (this._client.loginFailure) {
            throw new Error("login failed: " + this._client.loginFailure);
        } else if (this._client.loadError) {
            throw new Error("load failed: " + this._client.loadError.message);
        }
    }

    minimize(): void {
        (window as any).sendMinimizeToParent();
        this.navigation.push("minimize");
    }

    private get _homeserver(): string {
        return this._config.homeserver;
    }

    get privacyPolicyLink() {
        return this._privacyPolicyLink;
    }

    get footerViewModel() {
        return this.options.footerVM;
    }

    get showButtonSpinner(): boolean {
        return this._showButtonSpinner;
    }
}
