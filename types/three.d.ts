// Minimal module declaration for Three.js to satisfy TypeScript during builds.
declare module 'three' {
  const three: any;
  export = three;
  export default three;
}
