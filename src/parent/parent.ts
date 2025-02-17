/*
Copyright 2025 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { resizeIframe, toggleIframe, removeIframe } from "./iframe";
import { loadStartButton } from "./load";
import "./parent-style.css";

(window as any).isIframeLoaded = false;
(window as any).__chatterbox = () => (document.querySelector(".chatterbox-iframe") as HTMLIFrameElement)?.contentWindow;

function setUnreadCount(count) {
    const notification = document.querySelector(".notification-badge") as HTMLSpanElement;
    if (count === 0) {
        notification.classList.add("hidden");
    }
    else {
        notification.innerText = count;
        notification.classList.remove("hidden");
    }
}

window.addEventListener("message", event => {
    const { action } = event.data;
    switch (action) {
        case "resize-iframe":
            if (event.data.view === "timeline") {
                // Chatterbox has made it to the timeline!
                // Store this is info in localStorage so that we know to load chatterbox in background
                // in subsequent visits.
                window.localStorage.setItem("chatterbox-should-load-in-background", "true");
            }
            resizeIframe(event.data);
            break;
        case "minimize":
            toggleIframe();
            break;
        case "unread-message":
            setUnreadCount(event.data.count);
            break;
        case "error":
            removeIframe();
            break;
    }
});

loadStartButton();
