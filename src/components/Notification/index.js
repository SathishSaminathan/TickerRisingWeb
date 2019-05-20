import { notification } from "antd";

var position = "topRight";

export function customNotification(type, content, position) {
  notification[type]({
    placement: position,
    message: content,
    duration:2,
    // description: content
  });
}
