import { Script } from "./script";

export class ScriptManager {
     private scripts: Script[];

     constructor() {
          this.scripts = [];
     }

     public addScript(path: string) {
          const newScript: Script = new Script(path);
          this.scripts.push(newScript);
     }
     public removeScript(name: string) {}

     public async tickAll() {}
}
