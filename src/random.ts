/*
Copyright 2025 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

function generateRandomString(length: number, allowedCharacters: string): string {
    let result = "";
    const l = allowedCharacters.length;
    for (let i = 0; i < length; i++) {
        result += allowedCharacters.charAt(Math.floor(Math.random() * l));
    }
    return result;
}

export function generatePassword(length: number) {
    const characters = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    return generateRandomString(length, characters);
}

export function generateUsername(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_-.=/';
    return generateRandomString(length, characters);
}
