'use strict';
const $photoURL = document.querySelector('#photo-url');
if (!$photoURL) throw new Error('The $photoURL query failed');
const $image = document.querySelector('img');
if (!$image) throw new Error('The $image query failed');
$photoURL?.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  $image.src = $eventTarget.value;
});
const $form = document.querySelector('#form');
if (!$form) throw new Error('The $form query failed');
const $title = document.querySelector('#title-box');
if (!$title) throw new Error('#title-box');
const $notes = document.querySelector('#notes');
if (!$notes) throw new Error('The $notes query failed');
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const eventTarget = event.target;
  const $formElements = eventTarget.elements;
  const newData = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(newData);
  $image.src = './images/placeholder-image-square.jpg';
  renderEntry(newData);
  $unorderedList?.prepend(renderEntry(newData));
  viewSwap('entries');
  toggleNoEntries();
  $form.reset();
});
function renderEntry(entry) {
  const li = document.createElement('li');
  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  const colOneHalf = document.createElement('div');
  colOneHalf.setAttribute('class', 'column-half');
  row.append(colOneHalf);
  const imageContainer = document.createElement('img');
  imageContainer.setAttribute('src', entry.photoUrl);
  colOneHalf.append(imageContainer);
  const colOneHalf2 = document.createElement('div');
  colOneHalf2.setAttribute('class', 'column-half');
  row.append(colOneHalf2);
  const heading3 = document.createElement('h3');
  heading3.textContent = entry.title;
  colOneHalf2.append(heading3);
  const paragraph = document.createElement('p');
  paragraph.textContent = entry.notes;
  colOneHalf2.append(paragraph);
  li.append(row);
  return li;
}
console.log(renderEntry);
const $unorderedList = document.querySelector('ul');
if (!$unorderedList) throw new Error('The $unorderedList query failed');
document.addEventListener('DOMContentLoaded', () => {
  viewSwap(data.view);
  // toggleNoEntries()
  for (let i = 0; i < data.entries.length; i++) {
    $unorderedList?.append(renderEntry(data.entries[i])); // Need more clarification for this step
  }
});
function toggleNoEntries() {
  const $noEntry = document.querySelector('.no-entries');
  if (!$noEntry) throw new Error('The $noEntry query failed');
  if (data.entries.length === 0) {
    $noEntry?.classList.remove('no-entries');
  } else {
    $noEntry?.classList.add('no-entries');
  }
}
console.log(toggleNoEntries);
function viewSwap(view) {
  const $entryForm = document.querySelector('.entry-form');
  if (!$entryForm) throw new Error('The $entryForm query failed');
  const $entries = document.querySelector('.entries');
  if (!$entries) throw new Error('The $entries query failed');
  if (view === 'entries') {
    $entryForm.classList.add('hidden');
    $entries.classList.remove('hidden');
  } else if (view === 'entry-form') {
    $entries.classList.add('hidden');
    $entryForm.classList.remove('hidden');
  }
  data.view = view;
}
console.log(viewSwap);
const $entriesTag = document.querySelector('.entriesTag');
if (!$entriesTag) throw new Error('The $anchorTag query failed');
$entriesTag.addEventListener('click', function () {
  viewSwap('entries');
});
const $newButton = document.querySelector('.new-button');
if (!$newButton) throw new Error('The $newButton query failed');
$newButton.addEventListener('click', function () {
  viewSwap('entry-form');
});
