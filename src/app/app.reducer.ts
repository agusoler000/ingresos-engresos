import { ActionReducerMap } from '@ngrx/store';
import * as ui  from './shared/ui.reducer';
import * as auth from './auth/auth.reducer'
import * as ingresoegreso from './ingreso-egreso/ingres-egreso.reducer';


export interface AppState {
   ui: ui.State
   user: auth.State,
   //ingresosegresos: ingresoegreso.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
  // ingresosegresos: ingresoegreso.ingresoEgresoReducer
}