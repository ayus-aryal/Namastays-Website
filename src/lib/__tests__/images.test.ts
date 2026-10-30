import { test } from 'node:test';
import assert from 'node:assert/strict';
import { optimizeImage } from '../images';

test('adds Cloudinary transformations to a plain upload URL', () => {
  assert.equal(
    optimizeImage('https://res.cloudinary.com/du8h4deld/image/upload/v1789107320/butwal_r8qhi5.jpg', 640),
    'https://res.cloudinary.com/du8h4deld/image/upload/f_auto,q_auto,w_640/v1789107320/butwal_r8qhi5.jpg'
  );
});

test('leaves already-transformed and non-Cloudinary URLs alone', () => {
  const transformed = 'https://res.cloudinary.com/x/image/upload/w_100/v1/a.jpg';
  assert.equal(optimizeImage(transformed), transformed);
  assert.equal(optimizeImage('https://example.com/a.jpg'), 'https://example.com/a.jpg');
});

test('handles missing values', () => {
  assert.equal(optimizeImage(null), null);
  assert.equal(optimizeImage(undefined), null);
  assert.equal(optimizeImage(''), null);
});
