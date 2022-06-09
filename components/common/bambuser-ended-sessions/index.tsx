import React from "react";
import Script from "next/script";
import styles from "./styles.module.scss";
interface PopupProps {
  channelId?: string;
}

const BambuserEndedSessions = ({
  channelId = "hsgKWVv73pXD36WR46zj" || "fO8VqKKcPDJEPalZGrir",
}: PopupProps): JSX.Element => {
  return (
    <>
     
     {/* <div
        data-bambuser-liveshopping-widget="channel"
        data-channel-id={channelId}
        data-channel-locale=""
      ></div>

      <Script id={"123"}>
        {`  (function(d, t, i) {
            if (d.getElementById(i)) return;
            var s, ss = d.getElementsByTagName(t)[0];
            s = d.createElement(t); s.id = i;
            s.src = 'https://lcx-widgets.bambuser.com/embed.js';
            ss.parentNode.insertBefore(s, ss);
          })(document, 'script', "bambuser-liveshopping-widget");
        `}
      </Script> */}

    </>
  );
};

export default BambuserEndedSessions;
