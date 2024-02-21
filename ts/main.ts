interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface Entry {
  entryId: number;
  title: string;
  photoUrl: string;
  notes: string;
}

const $photoURL = document.querySelector('#photo-url');

if (!$photoURL) throw new Error('The $photoURL query failed');

const $image = document.querySelector('img');

if (!$image) throw new Error('The $image query failed');

$photoURL?.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLInputElement;
  $image.src = $eventTarget.value;
});

const $form = document.querySelector('#form') as HTMLFormElement;

if (!$form) throw new Error('The $form query failed');

const $title = document.querySelector('#title-box') as HTMLFormElement;

if (!$title) throw new Error('#title-box');

const $notes = document.querySelector('#notes') as HTMLFormElement;

if (!$notes) throw new Error('The $notes query failed');

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
  data.nextEntryId++;
  data.entries.unshift(newData);

  $image.src = './images/placeholder-image-square.jpg';

  $form.reset();
});

function renderEntry(entry: Entry): HTMLLIElement {
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
  for (let i = 0; i < data.entries.length; i++) {
    $unorderedList?.append(renderEntry(data.entries[i])); // Need more clarification for this step
  }
});

const $listedItem = document.querySelector('li');

function toggleNoEntries(): void {
  if (!$listedItem) throw new Error('The $listedItem query failed');

  if (data.entries.length === 0) {
    $listedItem.className = ' hidden';
  } else {
    $listedItem.className = ' ';
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
