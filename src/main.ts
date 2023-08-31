import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Store the original alert function
const originalAlert = window.alert;

// Override the alert function with a no-op function
window.alert = function() {};

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Restore the original alert function after bootstrapping the module
window.alert = originalAlert;