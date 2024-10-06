/**
 * Will later needed to be added in a file imported by default in each scripts
 * @param  {...any} args
 */
function log(...args) {
     self.postMessage({ type: "log", message: args.join(" ") });
}

self.onmessage = function (event) {
     const action = event.data.type;
     if (action === "initialized") {
          log("Script started");
     }

     if (action === "tick") {
          self.postMessage({ type: "tickCompleted" });
     }
};
