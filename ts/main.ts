interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface Entry {
  // creating an interface so we can attach to our newData object that will hold our new entries
  entryId: number;
  title: string;
  photoUrl: string;
  notes: string;
}

const $noEntry = document.querySelector('#no-entries'); // query selecting variables so we can call to the DOM
const $photoURL = document.querySelector('#photo-url') as HTMLFormElement;
const $image = document.querySelector('img');
const $form = document.querySelector('#form') as HTMLFormElement;
const $notes = document.querySelector('#notes') as HTMLFormElement;
const $unorderedList = document.querySelector('ul');
const $entriesTag = document.querySelector('.entriesTag');
const $newButton = document.querySelector('.new-button');

if (!$noEntry) throw new Error('The $noEntry query failed');
if (!$photoURL) throw new Error('The $photoURL query failed');
if (!$image) throw new Error('The $image query failed');
if (!$form) throw new Error('The $form query failed');
if (!$notes) throw new Error('The $notes query failed');
if (!$unorderedList) throw new Error('The $unorderedList query failed');
if (!$entriesTag) throw new Error('The $anchorTag query failed');
if (!$newButton) throw new Error('The $newButton query failed');

$photoURL?.addEventListener('input', (event: Event) => {
  // adding an event listener on our
  const $eventTarget = event.target as HTMLInputElement;
  $image.src = $eventTarget.value;
  console.log('input event listener line 36');
});

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const eventTarget = event.target as HTMLFormElement;
  const $formElements = eventTarget.elements as FormElements;
  const newData: Entry = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  console.log('submit event listener line 42');

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(newData);
    $unorderedList?.prepend(renderEntry(newData));
  } else {
    newData.entryId = data.editing.entryId; // update the newData entryID  before preceding
    const newEntries: Entry[] = [];
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === newData.entryId) {
        newEntries.push(newData);
      } else {
        newEntries.push(data.entries[i]);
      }
    }
    data.entries = newEntries;

    const $listedItem = document.querySelectorAll('li');
    if (!$listedItem) throw new Error('The $listedItem query failed');

    for (const li of $listedItem) {
      // creating a variable for every li inside my listed item
      if (Number(li.getAttribute('data-entry-id')) === data.editing.entryId) {
        // using the number method to convert the attribute of 'data-entry-id' to a number so we can compare it to our data.editing.entryId
        li.replaceWith(renderEntry(newData)); // replace our old li with updated/ edited one
      }

      const $heading2 = document.querySelector('.new-entry-header');

      if (!$heading2) throw new Error('The $heading2 query failed');

      $heading2.textContent = 'New Entry';
    }

    data.editing = null;
  }

  $image.src = './images/placeholder-image-square.jpg';

  $form.reset();

  viewSwap('entries');

  toggleNoEntries();
});

function renderEntry(entry: Entry): HTMLLIElement {
  const li = document.createElement('li');
  li.setAttribute('data-entry-id', entry.entryId.toString()); // we need to know what entry we click on when clicking on pencil icon,

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

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContent listener line 139');
  viewSwap(data.view);

  toggleNoEntries();

  for (let i = 0; i < data.entries.length; i++) {
    $unorderedList?.append(renderEntry(data.entries[i])); // Need more clarification for this step
  }
});

function toggleNoEntries(): void {
  if (data.entries.length === 0) {
    $noEntry?.classList.remove('no-entries');
  } else {
    $noEntry?.classList.add('no-entries');
  }
}

console.log(toggleNoEntries);

function viewSwap(view: any): void {
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

$entriesTag.addEventListener('click', function () {
  viewSwap('entries');
});

$newButton.addEventListener('click', function () {
  viewSwap('entry-form');
});

// target ul with class of .entry-list
const $entryList = document.querySelector('.entry-list');
if (!$entryList) throw new Error('$entryList is null');
// Add an event listener to $entryList for click events.
$entryList.addEventListener('click', (event: Event) => {
  // Cast the event target to an HTMLElement for further operations.
  const $eventTarget = event.target as HTMLElement;

  // If the event target is not an icon (denoted by 'I'), exit the function early.
  if ($eventTarget.tagName !== 'I') {
    return;
  }

  // Find the closest parent list item ('li') element that has a 'data-entry-id' attribute.
  const $closestLi = $eventTarget.closest('[data-entry-id]') as HTMLLIElement;
  // If there's no such list item, throw an error.
  if (!$closestLi) {
    throw new Error('$closestLi is null');
  }

  // Convert the 'data-entry-id' attribute value to a number to get the entry ID.
  const entryId = Number($closestLi.dataset.entryId);

  // Iterate over the entries in the data object to find the one that matches the entry ID.
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryId) {
      console.log('test');
      // If a match is found, set the global editing object to the current entry.
      data.editing = data.entries[i];
    }
  }

  viewSwap('entry-form');
  const $newEntryHeader = document.querySelector(
    '.new-entry-header'
  ) as HTMLHeadingElement;

  if (!$newEntryHeader) throw new Error('The $newEntryHeader query failed');

  const $image = document.querySelector('img');
  if (!$image) throw new Error('The $formImage query failed');

  const $title = document.querySelector('#title-box') as HTMLFormElement;
  if (!$title) throw new Error('#title-box');

  // If there is an entry being edited (data.editing is not null),
  if (data.editing) {
    // Check if required elements are not null, otherwise throw an error.
    if (
      !$image ||
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
    $image.setAttribute('src', data.editing.photoUrl);
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
