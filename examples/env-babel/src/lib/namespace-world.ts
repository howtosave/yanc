/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="./universe" />
// ts module

namespace MyNamespace {
  export class StaticWorld implements Universe.IWorld {
    name = "static world";

    get message(): string {
      return `${this.name}:${JSON.stringify(this.spacetime())}`;
    }

    time(): Universe.TimeLike {
      return 0xff;
    }

    space(): Universe.SpaceLike {
      return 0xff;
    }

    spacetime(): Universe.Spacetime {
      return {
        space: this.space(),
        time: this.time(),
      };
    }
  }
}

const world = new MyNamespace.StaticWorld();

export default (): string => world.message;
