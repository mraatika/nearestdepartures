import { render } from 'inferno';

export const renderIntoDocument = Component => {
  const node = document.createElement('div');
  document.body.appendChild(node);
  return render(Component, node);
};
