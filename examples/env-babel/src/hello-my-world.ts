import hello from "~/lib/hello";
import my from "~/src/lib/my";
import world from "~/lib/world";
import nsworld from "~/lib/namespace-world";

const sym = Symbol();

console.log(">>>", hello(), my(), world(), nsworld(), sym.toString());
// export libs
export { hello, my, world };
