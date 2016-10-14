import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CmpModule } from './app.module';

const platform = platformBrowserDynamic();

platform.bootstrapModule(CmpModule);
