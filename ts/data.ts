/* exported data */
interface Data {
  view: 'entries' | 'entry-form';
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
}

const data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

console.log(data);

window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
});
