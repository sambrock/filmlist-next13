export type ActionType = 'INITIALIZE' | 'SET_TITLE';

interface BaseAction<T extends ActionType> {
  type: T;
  payload?: unknown;
}

export interface SetTitleAction extends BaseAction<'SET_TITLE'> {
  payload: string | null;
}

export type Action = SetTitleAction;

export type ActionPayload<T extends ActionType> = Extract<Action, { type: T }>['payload'];
