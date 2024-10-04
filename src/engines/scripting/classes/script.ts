import { Utils } from "../../../utils/utils";

export class Script {
     private worker: Worker;
     private name: string;
     /**
      * Prevents ticks from overlapping
      */
     private isTicking: boolean = false;

     private log(...args: any[]): void {
          Utils.Logs.write("[Script:", this.name, "] - ", ...args);
     }

     constructor(path: string) {
          this.worker = new Worker(path);
          this.name = Utils.Files.findNameFromPath(path);
          this.worker.postMessage({ type: "start" });
     }

     public getName(): string {
          return this.name;
     }

     public setName(name: string): void {
          this.name = name;
     }

     public async tick(): Promise<void>{
          if (this.isTicking) {
               // this.log("Tick is already running");
               return;
          }

          this.isTicking = true;

          new Promise<void>((resolve, reject) => {
               this.worker.postMessage({ type: "tick" });

               this.worker.onmessage = (event: MessageEvent) => {
                    if (event.data.type === "tickCompleted") {
                         this.isTicking = false;
                         resolve();
                    }
               };

               this.worker.onerror = (error) => {
                    this.log("Error in worker tick:", error);
                    this.isTicking = false;
                    reject(error);
               };
          });
     }
}
