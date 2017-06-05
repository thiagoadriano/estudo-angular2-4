import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

const Platform = platformBrowserDynamic();
Platform.bootstrapModule( AppModule );