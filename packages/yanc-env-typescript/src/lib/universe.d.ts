//
// universe.d.ts
//

declare namespace Universe {
  export type TimeLike = Date | number;
  export type SpaceLike = number;
  export type Spacetime = {
    "space": SpaceLike;
    "time": TimeLike;
  };

  export interface IWorld {
    name: string;

    spacetime(): Spacetime;
    space(): SpaceLike;
    time(): TimeLike;
  }
}
