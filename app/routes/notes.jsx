import NewNote, { links as newNoteLinks } from '~/components/new-note'
import NoteList, { links as noteListLinks } from '~/components/note-list';
import { json, redirect } from '@remix-run/node';
import { getStoredNotes, storeNotes } from '~/data/notes'
import { useLoaderData, Link, useCatch } from '@remix-run/react';


export default function Notes() {
  const notes = useLoaderData()
  return (
    <main id="content">
      <NewNote />
      <NoteList notes={notes} />
    </main>
  )
}

export let loader = async () => {
  const storedNotes = await getStoredNotes()
  if (!storedNotes  ){
    return json({message:'Could not find any notes'}, {status:404})
  }
  return json(storedNotes);
};

export async function action({ request }) {
  const formData = await request.formData()
  const newNote = Object.fromEntries(formData)

  if (newNote.title.trim().length < 5) {
    return { message: 'Invalid title - must be at least 5 characters long.' }
  }

  const storedNotes = await getStoredNotes()
  newNote.id = new Date().toISOString()
  const updatedNotes = storedNotes.concat(newNote)
  await storeNotes(updatedNotes)
  return redirect('/notes')
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()]
}

export const ErrorBoundary = ({ error }) => {
  return (
    <main className='error'>
      <h1>An error ocurred on New Note</h1>
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
      <p>Back to <Link to="/">safety!</Link></p>
    </main>)
}


export function CatchBoundary(){
  const caughtResponse = useCatch()
  return (
    <main className='error'>
      <h1>An error ocurred on New Note</h1>
      <h3>{caughtResponse.statusText}</h3>
      <p>Back to <Link to="/">safety!</Link></p>
    </main>)
}

export function meta(){
  return {
    title:'All Notes',
    description: 'Manage your notes with ease'
  }
}