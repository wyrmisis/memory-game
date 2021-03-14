declare module "*.css" {
    const mapping: Record<string, string>;
    export default mapping;
}

declare module 'seed-shuffle' {
  type Shuffle<T> = (array: T[], seed: number) => T[];
  export const shuffle: Shuffle;
}
