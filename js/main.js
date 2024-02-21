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
  $form.reset();
});
