import axios from "axios";
import type Note from "../types/note";
import type { Tags } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNoteProps {
  page: number;
  perPage?: number;
  search: string;
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: Tags;
}

const url = "https://notehub-public.goit.study/api/notes";
const APIKey = import.meta.env.VITE_NOTEHUB_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${APIKey}`,
  },
};

export async function fetchNotes({
  page,
  perPage = 12,
  search,
}: FetchNoteProps) {
  try {
    const response = await axios.get<FetchNotesResponse>(url, {
      ...options,
      params: {
        page,
        perPage,
        search,
      },
    });

    return response.data;
  } catch (error) {
    console.log("TCL : fetchNotes : error:", error);
  }
}

export async function createNote(newNote: CreateNoteParams) {
  try {
    const response = await axios.post<Note>(url, newNote, options);

    return response.data;
  } catch (error) {
    console.log("TCL : createNote : error:", error);
  }
}

export async function deleteNote(NoteId: string) {
  try {
    const response = await axios.delete<Note>(`${url}/${NoteId}`, options);

    return response.data;
  } catch (error) {
    console.log("TCL : deleteNote : error:", error);
  }
}
