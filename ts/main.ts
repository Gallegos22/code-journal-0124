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
console.log('$form:', $form);

if (!$form) throw new Error('The $form query failed');

const $title = document.querySelector('#title-box') as HTMLFormElement;

if (!$title) throw new Error('#title-box');

const $notes = document.querySelector('#notes') as HTMLFormElement;

if (!$notes) throw new Error('The $notes query failed');

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  console.dir('$form.elements:', $form);
  const eventTarget = event.target as HTMLFormElement;
  const $formElements = eventTarget.elements as FormElements;
  console.log('forElements:', $formElements);
  const newData: Entry = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  console.log('new data', newData);
  data.nextEntryId++;
  data.entries.unshift(newData);

  $image.src = './images/placeholder-image-square.jpg';

  $form.reset();
});
