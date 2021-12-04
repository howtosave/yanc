import hello from "./lib/hello";
import my from "./lib/my";
import world from "./lib/world";
import nsworld from "./lib/namespace-world";

console.log(">>>>>", hello(), my(), world(), nsworld());
// export libs
export { hello, my, world };
