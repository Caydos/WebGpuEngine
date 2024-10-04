


self.onmessage = function(event) {
  const action = event.data.type;
  if (action === "start") {
    console.log("Script started");
  }
  if (action === "tick") {
    self.postMessage({type: "tickCompleted"})
  }
};
