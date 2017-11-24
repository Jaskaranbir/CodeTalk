import { ApplicationRef, NgModuleRef } from '@angular/core'
import { createNewHosts } from '@angularclass/hmr'

export async function hmrBootstrap(
  module: any,
  bootstrap: () => Promise<NgModuleRef<any>>
): Promise<void> {
  module.hot.accept()

  const ngModule: NgModuleRef<any> = await bootstrap()

  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef)
    const elements = appRef.components.map(c => c.location.nativeElement)
    const makeVisible = createNewHosts(elements)
    ngModule.destroy()
    makeVisible()
  })
}
