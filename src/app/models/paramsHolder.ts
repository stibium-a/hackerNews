/* Array storing objects with article`s data */
export let commonArray:any[] = [];

/* Object for error HTTP responce */
export const pseudoResponce = {
  id: 0,
  title: 'Error',
  by: 'Unknown author',
  score: 0,
  time: Date.now() / 1000,
  url: 'unknown',
  text: 'Text is not available because bad request'
}
