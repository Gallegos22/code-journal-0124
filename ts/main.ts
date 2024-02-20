interface Entry {
  entryId: number;
  title: string;
  imageUrl: string;
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

  const $form = document.querySelector('#form') as HTMLFormElement;

  const newData: Entry = {
    title: $form.$title.value,
    imageUrl: $form.$image.src,
    notes: $form.$notes.value,
    entryId: $form.data.nextEntryId,
  };

  data.nextEntryId++;
  data.entries.unshift(newData);

  const image = document.getElementById('placeholder-img') as HTMLFormElement;
  image.src = '/images/placeholder-image-square.jpg';

  if (!image) throw new Error('The image query failed');

  const form = document.querySelector('#myForm') as HTMLFormElement;

  if (!form) throw new Error('The form query failed');
  form.reset();
});
