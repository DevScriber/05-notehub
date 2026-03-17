import { useState } from "react"
import css from "./App.module.css"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createNote, deleteNote, fetchNotes } from "../../services/noteService"
import { useDebouncedCallback } from "use-debounce"
import SearchBox from "../SearchBox/SearchBox"
import Pagination from "../Pagination/Pagination"
import NoteList from "../NoteList/NoteList"
import Modal from "../Modal/Modal"
import NoteForm from "../NoteForm/NoteForm"
import { Toaster } from 'react-hot-toast';
import { Loader } from "../../utils/Loader/Loader"


export default function App() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  })
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false)
    }
  })


  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1)

  }, 500)

  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ['notes', page, search],
      queryFn: () => fetchNotes({ page, search })
    }
  )
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {data && <Pagination currentPage={page} setCurrentPage={setPage} totalPages={data.totalPages} />}
        <button onClick={() => setIsModalOpen(true)} className={css.button}>Create note +</button>
      </header>
      <main>
        {isLoading && <Loader />}
        {isError && <p>Error occured</p>}
        {data && <NoteList notes={data.notes} onDelete={(id) => { deleteMutation.mutate(id) }} />}
      </main>

      {isModalOpen &&
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onAdd={(values) => createMutation.mutate(values)} onCancel={() => setIsModalOpen(false)} isLoading={createMutation.isPending} />
        </Modal>}
      <Toaster />
    </div>
  )
}
