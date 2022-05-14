import { App } from "vue"

export interface ExampleModule {
  sayHello: () => void
}

export default {
  install: (app: App): void => {
    const exampleModule: ExampleModule = {
      sayHello: () => {
        // console.log("example");
      },
    }

    app.config.globalProperties.$example = exampleModule
  },
}

// 這邊是 ts, 用來 Bind to `this` keyword
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $example: ExampleModule
  }
}
