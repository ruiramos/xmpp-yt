// Make sure that Object.assign exists in the environment.
// We cannot type object-assign with flow right now. Thus we keep this
// out of flow's reach.

if (!Object.assign) {
  Object.assign = require('object-assign');
}