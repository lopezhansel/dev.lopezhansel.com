// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import test from 'ava';
// import { ProjectItem } from './Project-List';

// console.log(React, ReactDOM, ProjectItem);

// test('renders without crashing', (t) => {
//   const div = document.createElement('div');
//   ReactDOM.render(<ProjectItem />, div);
//   t.pass();
// });

test('arrays are equal', t => {
  t.deepEqual([1, 2], [1, 2]);
});
