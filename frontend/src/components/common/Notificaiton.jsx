import React, { useContext, createContext } from "react";
import { Button, ConfigProvider, notification } from "antd";
import { createStyles } from "antd-style";
import { validateProps } from "@mui/x-data-grid/internals";
const COLOR_BG = "linear-gradient(135deg,#6253e1, #04befe)";
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: ${COLOR_BG};
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const NotificationContext = createContext(null); //creating context for Notification -> with wrap of NofitcationContext.Provider
export default function Notificaiton({ children }) {
  const { styles } = useStyle();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({ title, description, type = "success" }) => {
    api[type]({
      title,
      description,
      showProgress: true,
      duration: 3,
    });
  };

  return (
    <NotificationContext.Provider value={openNotification}>
      <ConfigProvider
        button={{
          className: styles.linearGradientButton,
        }}
        theme={{
          components: {
            Notification: {
              progressBg: COLOR_BG,
            },
          },
        }}
      >
        {contextHolder}
        {children}
      </ConfigProvider>{" "}
    </NotificationContext.Provider>
  );
}

export function useAppNotification() {
  return useContext(NotificationContext);
}
