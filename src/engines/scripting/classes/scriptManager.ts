import { Script } from "./script";

export class ScriptManager {
     private scripts: Script[];

     constructor() {
          this.scripts = [];
     }

     /**
      * !Temporary public, waiting for the server API that will use start/stop/ensure cmds
      * @param path
      */
     public addScript(path: string): void {
          const newScript: Script = new Script(path);
          this.scripts.push(newScript);
     }
     /**
      * !Temporary public, waiting for the server API that will use start/stop/ensure cmds
      * @param name
      */
     public removeScript(name: string): void {}

     // public start(resourceName: string): void {
     //      let alreadyRunning: boolean = false;

     //      for (const script of this.scripts) {
     //           if (script.getName() === resourceName) {
     //                alreadyRunning = true;
     //                break;
     //           }
     //      }
     //      if (alreadyRunning) {
     //           console.log(
     //                `Script with name ${resourceName} is already running.`
     //           );
     //           return;
     //      }
     //      // this.addScript("");
     // }

     public tickAll(): void {
          this.scripts.forEach((script) => {
               script.tick();
          });
     }
}
