import * as R from 'ramda';
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
  R.when<KeyboardEvent, void>(
    R.propSatisfies(R.includes(R.__, codes), 'code'),
    callback,
  );

/**
 * Create a handler for enter and space keypresses
 */
export const okKeyPressHandler = R.partial(onKeys, [['Enter', 'Space']]);

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
  elements: HTMLElement[],
  focusFirstElement?: boolean,
) => {
  const firstElement = elements[0];
  const lastElement = R.last(elements);

  if (!firstElement) {
    return R.always(undefined);
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
