import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppContainer } from './Containers/App/app.component'
import { SampleComponent } from './Components/Sample/sample.component'

@NgModule({
  declarations: [
    AppContainer,
    SampleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppContainer]
})
export class AppModule {}
