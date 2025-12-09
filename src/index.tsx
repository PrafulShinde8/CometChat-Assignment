import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  UIKitSettingsBuilder,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import * as CometChat from "@cometchat/chat-sdk-javascript";
import { setupLocalization } from "./CometChat/utils/utils";
import { CometChatProvider } from "./CometChat/context/CometChatContext";

export const COMETCHAT_CONSTANTS: { APP_ID: string; REGION: string; AUTH_KEY: string } = {
  APP_ID: "1672639ca4713fc98", // Replace with your App ID
  REGION: "in", // Replace with your App Region
  AUTH_KEY: "2ca67cd815ee09a2239cf79bb9d66aab0b85278c", // Replace with your Auth Key
};

const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

CometChatUIKit.init(uiKitSettings)?.then(() => {
  setupLocalization();

  const UID = "cometchat-uid-3"; // Replace with your actual user ID (e.g., "user1", "user2", etc.)

  CometChatUIKit.getLoggedinUser().then((user: CometChat.User | null) => {
    if (!user) {
      CometChatUIKit.login(UID)
        .then((loggedUser: CometChat.User) => {
          console.log("Login Successful:", loggedUser);
          ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
            <CometChatProvider>
              <App />
            </CometChatProvider>
          );
        })
        .catch((error) => console.error("Login Failed:", error));
    } else {
      console.log("User already logged in:", user);
      ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <CometChatProvider>
          <App />
        </CometChatProvider>
      );
    }
  });
});