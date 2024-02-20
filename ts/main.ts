const $photoURL = document.querySelector('#photo-url');
console.log($photoURL);

if (!$photoURL) throw new Error('The $photoURL query failed');

const $image = document.querySelector('img');
console.log($image);

if (!$image) throw new Error('The $image query failed');

$photoURL?.addEventListener('input', (event: Event) => {
  console.log('event.target:', event.target);

  const $eventTarget = event.target as HTMLInputElement;
  $image.src = $eventTarget.value;
});
