import { enableProdMode } from '@angular/core'
import { hmrBootstrap } from './hmr'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app.module'
import { NgModuleRef } from '@angular/core/src/linker/ng_module_factory'

async function bootstrap(): Promise<NgModuleRef<AppModule>> {
  const bootModule = platformBrowserDynamic().bootstrapModule(AppModule)
  bootModule.catch(console.log)

  return bootModule
}

function init(): void {
  if (process.env.NODE_ENV === 'production') {
    enableProdMode()
    bootstrap()
      .then(() => console.log('App deployed!'))
      .catch(console.log)
  }
  else {
    hmrBootstrap(module, bootstrap)
      .then(e => console.log('App deployed with HMR!'))
      .catch(console.log)
  }
}

init()
