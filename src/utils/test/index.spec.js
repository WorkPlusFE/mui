import { createBEM } from '../create/bem';

test('createBEM', () => {
  expect(createBEM('wp-button')()).toEqual('wp-button');
  expect(createBEM('wp-button')('disabled')).toEqual('wp-button__disabled');
  expect(createBEM('wp-button')('text', 'primary')).toEqual(['wp-button__text', 'wp-button__text--primary']);
  expect(createBEM('wp-button')({ disabled: true })).toEqual(['wp-button', { 'wp-button--disabled': true }]);
  expect(createBEM('wp-button')({ disabled: true, border: true })).toEqual(['wp-button', { 'wp-button--disabled': true, 'wp-button--border': true }]);
  expect(createBEM('wp-button')('text', { disabled: true })).toEqual(['wp-button__text', { 'wp-button__text--disabled': true }]);
  expect(createBEM('wp-button')(['disabled', 'primary'])).toEqual(['wp-button', ['wp-button--disabled', 'wp-button--primary']]);
});
