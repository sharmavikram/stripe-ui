import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StripeComponent } from './stripe/stripe.component';
const appRoutes: Routes = [
   {
        path: '',
        component: StripeComponent,
        data: {
          name: 'Stripe'
        },
    },
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});