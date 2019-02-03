import { render } from 'inferno';

export const renderIntoDocument = Component => {
  document.body = document.body.cloneNode();
  const node = document.createElement('div');
  document.body.appendChild(node);
  return render(Component, node);
};
