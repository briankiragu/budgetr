import type { Component } from 'solid-js';

const HelloCard: Component = () => (
  <div class="p-3">
    <h1 class="text-4xl text-gray-900 font-bold">Hello</h1>
    <h3 class="text-sm text-gray-300">World</h3>
    <p class="text-gray-500">It's nice to meet you</p>
  </div>
);

export default HelloCard;
