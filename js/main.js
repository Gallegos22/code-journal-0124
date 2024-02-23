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
  li.setAttribute('data-entry-id', entry.entryId.toString());
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
  const heading3Container = document.createElement('div');
  heading3Container.setAttribute('class', 'heading3');
  colOneHalf2.append(heading3Container);
  const heading3 = document.createElement('h3');
  heading3.textContent = entry.title;
  heading3Container.append(heading3);
  const fontIcon = document.createElement('i');
  fontIcon.setAttribute('class', 'fa-solid fa-pencil');
  heading3.append(fontIcon);
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
  toggleNoEntries();
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
// target ul with class of .entry-list
const $entryList = document.querySelector('.entry-list');
if (!$entryList) throw new Error('$entryList is null');
// Add an event listener to $entryList for click events.
$entryList.addEventListener('click', (event) => {
  // Cast the event target to an HTMLElement for further operations.
  const $eventTarget = event.target;
  // If the event target is not an icon (denoted by 'I'), exit the function early.
  if ($eventTarget.tagName !== 'I') {
    return;
  }
  // Find the closest parent list item ('li') element that has a 'data-entry-id' attribute.
  const $closestLi = $eventTarget.closest('[data-entry-id]');
  // If there's no such list item, throw an error.
  if (!$closestLi) {
    throw new Error('$closestLi is null');
  }
  // Convert the 'data-entry-id' attribute value to a number to get the entry ID.
  const entryId = Number($closestLi.dataset.entryId);
  // Iterate over the entries in the data object to find the one that matches the entry ID.
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryId) {
      // If a match is found, set the global editing object to the current entry.
      data.editing = data.entries[i];
    }
  }
  const $newEntryHeader = document.querySelector('.new-entry-header');
  if (!$newEntryHeader) throw new Error('The $newEntryHeader query failed');
  const $formImage = document.querySelector('.image');
  if (!$formImage) throw new Error('The $formImage query failed');
  // If there is an entry being edited (data.editing is not null),
  if (data.editing) {
    // Check if required elements are not null, otherwise throw an error.
    if (
      !$formImage ||
      // !$deleteBtn ||
      !$title ||
      !$notes ||
      !$newEntryHeader
    ) {
      throw new Error(
        '$formImage, $deleteBtn, $entryTitle, $notes, or $newEntryHeader is null'
      );
    }
    // Set the form image source to the editing entry's photo URL.
    $formImage.setAttribute('src', data.editing.photoUrl);
    // Set the entry title input value to the editing entry's title.
    $title.value = data.editing.title;
    // Set the photo URL input value to the editing entry's photo URL.
    $photoURL.value = data.editing.photoUrl;
    // Set the notes textarea value to the editing entry's notes.
    $notes.value = data.editing.notes;
    // Show the delete button by removing its 'hide' class.
    // $deleteBtn.classList.remove('hide');
    // Change the form header text to indicate that the user is editing an entry.
    $newEntryHeader.textContent = 'Edit Entry';
    // Switch the view to show the entry form, allowing the user to edit the entry.
    viewSwap('entry-form');
  }
});
