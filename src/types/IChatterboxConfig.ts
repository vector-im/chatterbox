/*
Copyright 2025 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

export interface IChatterboxConfig {
	homeserver: string;
    // Internal room-id of the room to which chatterbox should join
	auto_join_room: string;
    // String that is to be prepended to the generated random usernames
    username_prefix: string;
    // If specified, chatterbox will create a dm with this user
    // This option takes precedence over 'auto_join_room'
    invite_user: string;
    // If set to true, chatterbox will not let the user send any messages until the operator has joined
    // Only applicable when invite_user is configured
    // The CB user is given a powerlevel that is low enough to prevent them from sending messages
    // The invited user must bump the powerlevel for the CB user to 80 after they join
    // The composer will be disabled until this happens!
    disable_composer_until_operator_join: boolean;
    // If set to true, the room created for DM is encrypted
    encrypt_room: boolean;
    // Configurations for header on chatterbox (containing title, avatar, minimize button)
    header: IHeader;
    // Configurations for footer on chatterbox (containing what links to use)
    footer: IFooter;
    // Token needed for token-authenticated registration
    token: string;
    // URL of the image that should be used as the users avatar
    avatar: string;
    // Configure this to enable Sentry (sentry.io) tracing.
    sentry?: {
        // The DSN URL where Sentry reports will be sent.
        dsn: string;
        // The environment to report to Sentry. E.g. "staging", "production"
        environment: string;
    }
}

interface IHeader {
    // An optional static title. If this is not given, no room name is shown in the header
    title?: string;
    // An optional link to static avatar. If this is not given, the room avatar is used instead
    avatar?: string;
}

interface IFooter {
    // Specifies the link which must be opened when chatterbox logo in the footer is clicked.
    chatterbox_link: string;
    // Specifies the link which must be opened when matrix branding in the footer is clicked.
    matrix_link: string;
}
