import AWN from "awesome-notifications";

let notifier = new AWN({
  position: "top-right",
  labels: { alert: "Error" },
  durations: { global: 3000 },
});

export function convertTimestamp(timestamp) {
  const date = new Date(timestamp);
  const germanTimestamp = date.toLocaleString('de-DE');
  return germanTimestamp;
}

export const notifyAlert = (message) => {
  notifier.alert(message);
}

export const notifyInfo = (message) => {
  notifier.info(message);
}

export const notifySuccess = (message) => {
  notifier.success(message);
}