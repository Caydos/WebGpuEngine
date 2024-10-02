import { Script } from "./script";

export class ScriptManager {
     private scripts: Script[];

     constructor() {
          this.scripts = [];
     }

     public addScript(path: string): void {
          const newScript: Script = new Script(path);
          this.scripts.push(newScript);
     }
     public removeScript(name: string): void {}

     public tickAll(): void {
          this.scripts.forEach((script) => {
               script.tick();
          });
     }
}
