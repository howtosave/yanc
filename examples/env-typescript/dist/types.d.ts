declare module "lib/hello" {
    function _exports(): string;
    export = _exports;
}
declare module "lib/my" {
    function _default(): string;
    export default _default;
}
declare module "lib/world" {
    const _default: () => string;
    export default _default;
}
declare module "lib/namespace-world" {
    const _default_1: () => string;
    export default _default_1;
}
declare module "hello-my-world" {
    import hello from "lib/hello";
    import my from "lib/my";
    import world from "lib/world";
    export { hello, my, world };
}
declare module "index" {
    export {};
}
