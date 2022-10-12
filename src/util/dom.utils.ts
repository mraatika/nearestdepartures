import { always, includes, partial, propSatisfies, when } from 'ramda';
import logger from './logger';

export const stopPropagation = (e: Event) => {
  e.stopPropagation();
  return e;
};

export const requestFocus = (domNode: HTMLElement) => {
  try {
    domNode.focus();
  } catch (e) {
    logger.error(e);
  }
};

export const onKeys = (codes: string[], callback: VoidFunction) =>
  when<KeyboardEvent, void>(
    propSatisfies((x) => includes(x, codes), 'code'),
    callback,
  );

/**
 * Create a handler for enter and space keypresses
 */
export const okKeyPressHandler = partial(onKeys, [['Enter', 'Space']]);

const handleTab =
  (focusOn: HTMLElement, shiftKey: boolean) => (e: KeyboardEvent) => {
    if (e.code === 'Tab' && e.shiftKey === shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      requestFocus(focusOn);
    }
  };

/**
 * Init a focus trap to keep focus in a loop
 */
export const initFocusTrap = (
  firstElement: HTMLElement,
  lastElement: HTMLElement,
  focusFirstElement: boolean,
) => {
  if (!firstElement) {
    return always(undefined);
  }

  const lastOrFirstElement = lastElement || firstElement;
  const startHandler = handleTab(lastOrFirstElement, true);
  const endHandler = handleTab(firstElement, false);
  const currentActiveElement = document.activeElement;

  firstElement.addEventListener('keydown', startHandler);
  lastOrFirstElement.addEventListener('keydown', endHandler);

  focusFirstElement && setTimeout(() => requestFocus(firstElement), 100);

  return () => {
    firstElement.removeEventListener('keydown', startHandler);
    lastOrFirstElement.removeEventListener('keydown', endHandler);
    requestFocus(currentActiveElement as HTMLElement);
  };
};
