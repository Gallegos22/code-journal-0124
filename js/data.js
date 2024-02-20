'use strict';
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
console.log(data);
window.addEventListener('beforeunload', () => {
  console.log('Event Fired');
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
});
const previousDataJSON = localStorage.getItem('javascript-local-storage');
if (previousDataJSON != null) {
  data = JSON.parse(previousDataJSON);
}
