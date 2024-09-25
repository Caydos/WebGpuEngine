/**
 * Loads the vertex shader
 * @param path -> path from the .html file
 * @returns
 */
export async function vertex(path: string): Promise<string> {
     const response = await fetch(path);
     if (!response.ok) {
          throw new Error(`Failed to load vertex shader: ${path}`);
     }
     return await response.text();
}

/**
 * Loads the fragment shader
 * @param path -> path from the .html file
 * @returns
 */
export async function fragment(path: string): Promise<string> {
     const response = await fetch(path);
     if (!response.ok) {
          throw new Error(`Failed to load fragment shader: ${path}`);
     }
     return await response.text();
}
