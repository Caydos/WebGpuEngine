import { Utils } from "../../../utils/utils";

export class Script {
     private worker: Worker;
     private name: string;

     private log(...args: any[]): void {
          Utils.Logs.write("[Script:", this.name, "] - ", ...args);
     }
     constructor(path: string) {
          this.worker = new Worker(path);
          this.name = Utils.Files.findNameFromPath(path);
          this.log("Script created");
     }

     public getName(): string {
          return this.name;
     }
     public setName(name: string): void {
          this.name = name;
     }

     /**
      * Will later be implemented in the constructor
      */
     public async tick() {
          this.log("nuh huh");
     }
}
