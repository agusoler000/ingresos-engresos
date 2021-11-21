import { createAction } from '@ngrx/store';

export const isLoading = createAction('[Ui Component] is Loading');
export const stopLoading = createAction('[Ui Component] stop Loading');